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
    },
    /*async postBook(book) {
        try {
            apiClient.defaults.headers['authorization'] =
            JSON.parse(localStorage.getItem('usuario')).token 
            const aux = {...book};
            const datos = await apiClient.post('/libros/', aux);    
            return datos.data
        } catch(e) {
            // revisar 401 o 404
            console.log(e);
            throw "Error de conexion"
        }
    },
    // para testear
    async deleteBook(bookId) {
        try {
            apiClient.defaults.headers['authorization'] =
            JSON.parse(localStorage.getItem('usuario')).token 
            console.log('Id del libro: ' +  bookId);
            const datos = await apiClient.delete('/libros/' + bookId);    
            return datos.data
        } catch(e) {
            // revisar 401 o 404
            console.log(e);
            throw "Error de conexion"
        }
    }*/


}