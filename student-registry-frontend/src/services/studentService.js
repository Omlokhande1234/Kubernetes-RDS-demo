import api from "../api/axios";

export const getStudents = async () => {
    return api.get("/students");
};

export const getStudent = async (id) => {
    return api.get(`/students/${id}`);
};

export const createStudent = async (student) => {
    return api.post("/students", student);
};

export const updateStudent = async (id, student) => {
    return api.put(`/students/${id}`, student);
};

export const deleteStudent = async (id) => {
    return api.delete(`/students/${id}`);
};