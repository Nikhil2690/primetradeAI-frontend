import api from "./axios";

export const registerUser = async(data) => {
    const response = await api.post("/users/register", data)

    return response.data
}

export const loginUser = async(data) => {
    const response = await api.post("/users/login", data)

    return response.data
}

export const logoutUser = async() => {
    const response = await api.post("/users/logout")

    return response.data
}

export const getUserDetails = async() => {
    const response = await api.get("/users/user-details")

    return response.data
}

export const updateUser = async(data) => {
    const response = await api.patch("/users/update", data)

    return response.data
}