import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    
    async getPrestamos() {
        try {
            apiClient.defaults.headers['authorization'] =
            JSON.parse(localStorage.getItem('usuario')).token 
            const datos = await apiClient.get('/prestamos')    
            return datos.data
        } catch(e) {
            // revisar 401 o 404
            console.log(e);
            throw "Error de conexion"
        }
    }

}