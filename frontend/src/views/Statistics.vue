<template>
  <main>
    <h1 class="text-center fw-bolder text-primary">Estadistica de libros</h1>

    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-15">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h4 class="text-center font-weight-light my-4 text-success">
                      Listado de prestamos registrados
                    </h4>
                  </div>
                  <div class="card-body">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        @click="traerPrestamos()"
                        class="btn btn-outline-primary btn-sm"
                      >
                        Traer Lista
                      </button>
                      <br />
                      <button
                        @click="traerDevueltos()"
                        class="btn btn-outline-primary btn-sm"
                      >
                        Traer libros devueltos
                      </button>
                      <br />
                      <button
                        @click="traerNoDevueltos()"
                        class="btn btn-outline-primary btn-sm"
                      >
                        Traer libros no devueltos
                      </button>
                      <br />
                      <button
                        @click="traerMasPedido()"
                        class="btn btn-outline-primary btn-sm"
                      >
                        Traer libros mas pedidos
                      </button>
                      <br />
                    </div>

                    <div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="table-secondary fw-bolder">
                              Id_Prestamo
                            </th>
                            <th class="table-secondary fw-bolder">
                              Nombre Libro
                            </th>
                            <th class="table-secondary fw-bolder">
                              Nombre de Usuario
                            </th>
                            <th class="table-secondary fw-bolder">Retornado</th>
                          </tr>
                        </thead>

                        <tbody v-for="prestamo in prestamos" :key="prestamo.id">
                          <tr>
                            <td class="table-info">{{ prestamo.id }}</td>
                            <td class="table-info">
                              {{ prestamo.nombreLibro }}
                            </td>
                            <td class="table-info">
                              {{ prestamo.nombreUsuario }}
                            </td>
                            <td class="table-info">{{ prestamo.returned }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</template>

<script>
import statisticsService from "../service/statisticsService";

export default {
  data() {
    return {
      prestamos: [],
      prestamo: {},
      mensajeError: "",
    };
  },
  async mounted() {
    console.log("Cargar");
    this.prestamos = await statisticsService.getPrestamos();
  },
  methods: {
    async traerPrestamos() {
      try {
        this.prestamos = [];
        this.prestamos = await statisticsService.getPrestamos();
      } catch (e) {
        this.mensajeError = e;
      }
    },
    async traerDevueltos() {
      try {
        this.prestamos = [];
        let d = await statisticsService.getPrestamos();
        d.forEach((e) => {
          if (e.returned == 1) {
            this.prestamos.push(e);
          }
        });
      } catch (e) {
        this.mensajeError = e;
      }
    },
    async traerNoDevueltos() {
      try {
        this.prestamos = [];
        let datos = await statisticsService.getPrestamos();
        datos.forEach((e) => {
          if (e.returned == 0) {
            this.prestamos.push(e);
          }
        });
      } catch (e) {
        this.mensajeError = e;
      }
    },
    async traerMasPedido() {
      try {
        this.prestamos = [];
        let datos = await statisticsService.getPrestamos();
        datos.forEach((e) => {
          if (e.idlibro == 3) {
            this.prestamos.push(e);
          }
        });
      } catch (e) {
        this.mensajeError = e;
      }
    },
  },
};
</script>

<style></style>
