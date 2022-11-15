<template>
    <main>
        
      <h1 class="text-center fw-bolder text-primary" >Estadistica de libros</h1>
    
    <div class="col-md-5">
              <h4 class="text-center text-success">Listado de prestamos registrados</h4>
              <button @click="traerPrestamos()" class="btn btn-outline-primary btn-sm">Traer Lista</button> <br>
              <button @click="traerDevueltos()"  class="btn btn-outline-primary btn-sm"> Traer libros devueltos</button> <br>
              <button @click="traerNoDevueltos()" class="btn btn-outline-primary btn-sm"> Traer libros no devueltos</button> <br>
              <button @click="traerMasPedido()" class="btn btn-outline-primary btn-sm"> Traer libros mas pedidos</button> <br>
             

              <table class="table">
                
                  <thead>
                      <tr>
                          <th class="table-secondary fw-bolder">
                              ID_PRESTAMO
                          </th>
                          <th class="table-secondary fw-bolder">
                              ID_LIBRO
                          </th >
                          <th class="table-secondary fw-bolder">
                              ID_USER
                          </th>
                          <th class="table-secondary fw-bolder">
                              returned
                          </th>
                        </tr>
                  </thead>
                  
                  <tbody v-for="prestamo in prestamos" :key="prestamo.id">
                    
                    <tr>
                        
                      <td class="table-info">{{ prestamo.id }}</td>
                      <td class="table-info">{{ prestamo.idlibro }}</td>
                      <td class="table-info">{{ prestamo.idUser }}</td>
                      <td class="table-info">{{ prestamo.returned }}</td>
    
                    </tr>
                  </tbody>
              </table>
            </div>
      
    </main>
    </template>
    
    <script>
    import statisticsService from '../service/statisticsService';
    export default {
        data() {
        return {
          prestamos: [],
          prestamo: {},
          mensajeError: "",
        };
      },
      methods:{
        

        async traerPrestamos() {
          try {
            this.prestamos = await statisticsService.getPrestamos();
          } catch (e) {
            this.mensajeError = e;
          }
        },
        async traerDevueltos() {
          try {
            
            let d = await statisticsService.getPrestamos();
            d.forEach(e => {
              if (e.returned == 0){
                this.prestamos.push(e)
              }
            });

          } catch (e) {
            this.mensajeError = e;
          }
        },
        async traerNoDevueltos() {
          try {
            let datos = await statisticsService.getPrestamos();
            datos.forEach(e => {
              if (e.returned == 1){
                this.prestamos.push(e)
              }
            });
          } catch (e) {
            this.mensajeError = e;
          }
        },
        async traerMasPedido() {
          try {

            let datos = await statisticsService.getPrestamos();
           datos.forEach(e => {
            if (e.idlibro == 3 ){
              this.prestamos.push(e)
            }
           });

          } catch (e) {
            this.mensajeError = e;
          }
        },
      },
      }
    
    </script>
    
    <style>
    
    </style>