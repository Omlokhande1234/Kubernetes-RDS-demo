import { useEffect, useState } from "react";
import "../style/StudentForm.css";

function StudentForm({
  student,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    email: "",
    department: "",
    semester: "",
    phone: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {student ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="buttons">

            <button
              type="submit"
              className="save-btn"
            >
              Save
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default StudentForm;