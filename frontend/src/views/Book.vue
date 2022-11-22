<template>
  <main>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
  </head>

  <body>
    <!-- <h3>Registro de Libros</h3>

    <br /> -->
    <div class="container-fluid">
      <h1 class="text-center fw-bolder text-primary">Registro de Libros</h1>

      <br/>
      <div class="row justify-content-center">
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
              <button @click="createBook" class="btn btn-primary">Registrar libro</button>
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
                  </tr>
              </thead>
              <!-- Cuerpo de la tabla -->
              <tbody v-for="book in books" :key="book.id">
                <!-- Filas de la tabla -->
                <tr>
                  <td>{{ book.titulo }}</td>
                  <td>{{ book.autor }}</td>
                  <!-- <td><button @click="deleteBook(book.id)">Eliminar</button></td> -->
                  <td><a @click="deleteBook(book.id)"> <i class="fa fa-trash" aria-hidden="true"></i> </a></td>
                </tr>
              </tbody>
          </table>

        </div>

      </div>
    </div>
    
  </body>
</main>
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
