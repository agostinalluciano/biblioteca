<template>
  <main>
    <h2>Register</h2>
    <form @submit.prevent="register">
        correo <input v-model="usuarioForm.email" type="email" required> <br/>
        password <input v-model="usuarioForm.password" type="password" required> <br/>
        <button type="submit">Register</button> <br/>
        {{ mensajeError }}
    </form>
  </main>
</template>

<script>
import {loginStore} from '../stores/loginStore.js'
import {storeToRefs} from 'pinia'

    export default {
        setup() {
            const store = loginStore();
            const { register } = store;
            const { usuario, estaLogeado } = storeToRefs(store);
            return { store, register, usuario, estaLogeado }
        },
        data() {
            return {
                usuarioForm: { email:"",password:"" },
                mensajeError: ""
            }
        },
        methods: {
            async register() {
                await this.register(this.usuarioForm);
                //validar si ya existe y crearlo
                if ( this.estaLogeado ) {
                    this.$router.push('/sistema')
                } else {
                    this.mensajeError = "Usuario ya existe"
                }
            }
        }
    }
</script>
