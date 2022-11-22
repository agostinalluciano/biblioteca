<template>
  <main>
    <h2 class="text-center fw-bolder">Registrarse</h2>

    <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Registro</h3></div>
                                    <div class="card-body">
                                        <form @submit.prevent="register">
                                            <div class="form-floating mb-3">
                                                <label for="inputEmail">Correo Eletrónico</label> <br> <br>
                                                <input v-model="usuarioForm.email" type="email" required class="form-control" placeholder="name@example.com">
                                            </div>
                                            <div class="form-floating mb-3">
                                                <label for="inputPassword">Contraseña</label> <br> <br>
                                                <input v-model="usuarioForm.password" type="password" class="form-control" required>
                                            </div>
                                            

                                            <div class="d-grid gap-2">
                                                <button type="submit" class="btn btn-primary" >Registrarse</button>
                                                {{ mensajeError }}
                                            </div>
                                        </form>
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
                    this.$router.push('/about')
                } else {
                    this.mensajeError = "Usuario ya existe"
                }
            }
        }
    }
</script>
