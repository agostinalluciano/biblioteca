<template>
  <main>
    <h2>Login</h2>

    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">Login</h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="login">
                      <div class="form-floating mb-3">
                        <label for="inputEmail">Correo Eletrónico</label> <br />
                        <br />
                        <input
                          v-model="usuarioForm.email"
                          class="form-control"
                          type="email"
                          required
                          placeholder="name@example.com"
                        />
                      </div>
                      <div class="form-floating mb-3">
                        <label for="inputPassword">Contraseña</label> <br />
                        <br />
                        <input
                          v-model="usuarioForm.password"
                          class="form-control"
                          type="password"
                          required
                        />
                      </div>

                      <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">
                          Ingresar
                        </button>
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
import { loginStore } from "../stores/loginStore.js";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = loginStore();
    const { login } = store;
    const { usuario, estaLogeado } = storeToRefs(store);
    return { store, login, usuario, estaLogeado };
  },
  data() {
    return {
      usuarioForm: { email: "", password: "" },
      mensajeError: "",
    };
  },
  methods: {
    async login() {
      await this.login(this.usuarioForm);
      if (this.estaLogeado) {
        this.$router.push("/about");
      } else {
        this.mensajeError = "Error en credenciales";
      }
    },
  },
};
</script>
