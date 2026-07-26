const Student = require("../models/studentModels.js");

// Create Student
exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();

        res.json(students);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Get Student By ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Update Student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        await student.update(req.body);

        res.json(student);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        await student.destroy();

        res.json({
            message: "Student deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};