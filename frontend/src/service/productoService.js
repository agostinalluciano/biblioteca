import axios from 'axios'
// break hasta 21:30

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    async getProductos() {
        try {
            apiClient.defaults.headers['authorization'] =
            JSON.parse(localStorage.getItem('usuario')).token 
            const datos = await apiClient.get('/productos')    
            return datos.data
        } catch(e) {
            // revisar 401 o 404
            console.log(e);
            throw "Error de conexion"
        }
    },
    async postProductos(producto) {
        try {
            apiClient.defaults.headers['authorization'] =
            JSON.parse(localStorage.getItem('usuario')).token 
            const aux = {...producto};
            const datos = await apiClient.post('/productos/', aux);    
            return datos.data
        } catch(e) {
            // revisar 401 o 404
            console.log(e);
            throw "Error de conexion"
        }
    },
    // para testear
    async deleteProductos(id) {
        try {
            apiClient.defaults.headers['authorization'] =
            JSON.parse(localStorage.getItem('usuario')).token 
            const datos = await apiClient.delete('/productos/' + id);    
            return datos.data
        } catch(e) {
            // revisar 401 o 404
            console.log(e);
            throw "Error de conexion"
        }
    }


}