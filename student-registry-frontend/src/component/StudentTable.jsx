import "../style/StudentTable.css";

function StudentTable({ students, onEdit, onDelete }) {
    return (
        <table className="student-table">
            <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>

                {students.length === 0 ? (

                    <tr>
                        <td colSpan="7" className="empty">
                            No students found
                        </td>
                    </tr>

                ) : (

                    students.map((student) => (

                        <tr key={student.id}>

                            <td>{student.rollNumber}</td>

                            <td>{student.name}</td>

                            <td>{student.email}</td>

                            <td>{student.department}</td>

                            <td>{student.semester}</td>

                            <td>{student.phone}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(student)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(student.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>
    );
}

export default StudentTable;