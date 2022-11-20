<script>
import { RouterLink, RouterView } from 'vue-router'
import {loginStore} from '../src/stores/loginStore.js'
import {storeToRefs} from 'pinia'

export default {
  setup() {
    const store = loginStore();
    const { login, logout } = store;
    const { usuario, estaLogeado } = storeToRefs(store);
    return { store, login, usuario, estaLogeado, logout }
  },
  data() {
    return {
    }
  },
  methods: {
    logoutForm() {
      this.$router.push('/');
      this.logout();
    }
  }
}
</script>

<template>

  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
  </head>

  <header>
    <div>
      <!-- <p v-if="estaLogeado" >Usuario Logueado: {{ this.usuario.email }}</p>  -->

      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink> 
              <RouterLink class="nav-link" to="/about">About</RouterLink>
              <!-- <RouterLink class="nav-link" v-if="estaLogeado" to="/sistema">Sistema</RouterLink> -->
              <RouterLink class="nav-link" v-if="estaLogeado" to="/book">Libros</RouterLink>
              <RouterLink class="nav-link" v-if="estaLogeado" to="/statistics">Estadisticas</RouterLink>

            </div>
          </div>
          
          <a class="nav-link" aria-expanded="false" v-if="estaLogeado"><b> Bienvenido!! {{ this.usuario.email }}</b></a>

          <RouterLink class="btn btn-secondary" v-if="!estaLogeado" to="/register">Register</RouterLink>
          <RouterLink class="btn btn-outline-success" v-if="!estaLogeado" to="/login">Login</RouterLink>
          <button class="btn btn-danger" @click="logoutForm"  v-if="estaLogeado">Logout</button>
        </div>
      </nav>

      <!-- <nav>
        <RouterLink to="/">Home | </RouterLink> 
        <RouterLink to="/about">About | </RouterLink>
        <RouterLink v-if="estaLogeado" to="/sistema">Sistema | </RouterLink>
        <RouterLink v-if="estaLogeado" to="/book">Libros | </RouterLink>
        <RouterLink v-if="!estaLogeado" to="/login">Login | </RouterLink>
        <RouterLink v-if="!estaLogeado" to="/register">Register | </RouterLink>
        <button @click="logoutForm"  v-if="estaLogeado"> Logout</button>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
