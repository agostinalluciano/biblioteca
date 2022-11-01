<template>
  <main>
    <h2>Sistema</h2>

    id <input v-model="producto.id" type="text">
    nombre <input v-model="producto.nombre" type="text">
    <button @click="agregarProducto">Agregar</button>

    {{productos}}
    <button @click="traerProductos">Traer productos</button>
    {{mensajeError}}
  </main>
</template>

<script>
import productoService from '../service/productoService.js'

export default {
  data() {
    return {
      productos: [],
      producto : {},
      mensajeError: ''
    }
  },
  methods: {
    async traerProductos() {
      try {
        this.productos = await productoService.getProductos();
      } catch(e) {
        this.mensajeError = e;
      }
    },
    async agregarProducto() {
      try {
        const datos = await productoService.postProductos({...this.producto})
        console.log(datos);
        // this.productos.push({...this.producto})
      } catch(e) {
        this.mensajeError = e;
      }
    }    
  }
}

</script>

