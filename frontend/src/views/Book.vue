<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
  </head>

  <body>
    <h3>Registro de Libros</h3>

    <br />
    <div class="container-fluid">
      <div class="row">
        <!-- Alta de libros -->
        <div class="col-md-5">
          <h4>Registro de libros</h4>
          <form @submit.prevent>
            <!-- ID del libro -->
            <div class="form-group">
              <label class="control-label" for="book-id">ID del libro</label>
              <input v-model="book.id" type="text" id="book-id" class="form-control" />
            </div>
            <br />
            <!-- Nombre del libro -->
            <div class="form-group">
              <label class="control-label" for="book-name">Nombre del libro</label>
              <input v-model="book.titulo" type="text" id="book-name" class="form-control" />
            </div>
            <br />
            <!-- Autor del libro -->
            <div class="form-group">
              <label class="control-label" for="book-author">Autor del libro</label>
              <input v-model="book.autor" type="text" id="book-author" class="form-control" />
            </div>
            <br />
            <!-- Botón para registrar libros -->
            <div class="form-group">
              <!-- <a type="button" class="btn btn-secondary"> Volver</a> -->
              <button @click="createBook" class="btn btn-primary">Registrar libro</button>
              <!-- <input @click="createBook" type="submit" value="Registrar libro" class="btn btn-primary"/> -->
            </div>
          </form>
        </div>

        <!-- Listado de libros registrados -md-4-->
        <div class="col-md-5">
          <h4>Listado de libros registrados</h4>
          <table class="table">
            <!-- Cabecera de la tabla -->
              <thead>
                  <tr>
                      <th>
                          Título del libro
                      </th>
                      <th>
                          Autor
                      </th>
                      <th></th>
                  </tr>
              </thead>
              <!-- Cuerpo de la tabla -->
              <tbody v-for="book in books" :key="book.id">
                <!-- Filas de la tabla -->
                <tr>
                  <td>{{ book.titulo }}</td>
                  <td>{{ book.autor }}</td>
                  <td><button @click="deleteBook(book.id)">Eliminar</button></td>

                </tr>
              </tbody>
          </table>

        </div>

      </div>
    </div>
    
  </body>
</template>


<script>
import bookService from "../service/bookService.js";


export default {
  data() {
    return {
      books: [],
      book: {},
      mensajeError: "",
    };
  },
  async mounted() {
    console.log('Cargar')
    this.books = await bookService.getBooks();

  },
  methods: {

    async createBook() {
      try {
        const datos = await bookService.postBook({ ...this.book });
        console.log(datos);
        //this.books.push({...this.book})
        this.books = await bookService.getBooks();

      } catch (e) {
        this.mensajeError = e;
      }
    },
    async deleteBook(bookId) {
      try {
        console.log(bookId);

        const datos = await bookService.deleteBook(bookId);
        console.log(datos);
        //this.books.push({...this.book})
        //this.books = this.books.filter((libros) => )
        this.books = await bookService.getBooks();

      } catch (e) {
        this.mensajeError = e;
      }
    },

    async traerProductos() {
      try {
        this.productos = await productoService.getProductos();
      } catch (e) {
        this.mensajeError = e;
      }
    },
  },
};
</script>
