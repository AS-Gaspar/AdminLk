import axios from 'axios'

const API_URL = 'http://localhost:3000/api/obras'

export const getObras = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

export const getObraById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}

export const createObra = async (obraData) => {
    const response = await axios.post(API_URL, obraData)
    return response.data
}

export const updateObra = async (id, obraData) => {
    const response = await axios.put(`${API_URL}/${id}`, obraData)
    return response.data
}

export const deleteObra = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
}