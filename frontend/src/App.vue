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
  <header>
    <div>
      <p v-if="estaLogeado" >Usuario Logueado: {{ this.usuario.email }}</p> 
      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/about">About</RouterLink> |
        <RouterLink v-if="estaLogeado" to="/sistema">Sistema | </RouterLink> 
        <RouterLink v-if="!estaLogeado" to="/login">Login</RouterLink> |
        <RouterLink v-if="!estaLogeado" to="/register">Register</RouterLink> |
        <button @click="logoutForm"  v-if="estaLogeado">Logout</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
