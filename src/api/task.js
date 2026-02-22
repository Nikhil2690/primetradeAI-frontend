import api from "./axios";

export const createTask = async(data) => {
    const response = await api.post("/tasks/create-task", data)

    return response.data
}

export const getTasks = async(data) => {
    const response = await api.get("/tasks/get-tasks", data)

    return response.data
}

export const updateTask = async(taskId, data) => {
    const response = await api.patch(`/tasks/update/${taskId}`, data)

    return response.data
}

export const deleteTask = async(id) => {
    const response = await api.delete(`/tasks/delete/${id}`)

    return response.data
}