import { useEffect, useState } from "react";

import Navbar from "../component/Navbar";
import StudentTable from "../component/StudentTable";
import StudentForm from "../component/StudentForm";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

import "../style/Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Open Add Student Form
  const handleAdd = () => {
    setSelectedStudent(null);
    setShowForm(true);
  };

  // Open Edit Form
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  // Save Student (Add or Edit)
  const handleSubmit = async (studentData) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, studentData);
      } else {
        await createStudent(studentData);
      }

      setShowForm(false);
      setSelectedStudent(null);

      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Delete Student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Close Form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Students</h1>

          <button onClick={handleAdd}>+ Add Student</button>
        </div>

        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <StudentForm
            student={selectedStudent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;