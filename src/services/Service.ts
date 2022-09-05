import axios from "axios";

export const api = 
axios.create({baseURL: "https://shameup.herokuapp.com"})

export const login = async(url: any, dados: any, setDado: any) => {
    const response = await api.post(url, dados)
    setDado(response.data)
} 