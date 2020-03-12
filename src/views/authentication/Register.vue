<template>
  <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="username" :counter="16" :rules="nameRules" label="Nombre de usuario" required ></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="Correo electrónico" required ></v-text-field>
    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="Contraseña" counter @click:append="show1 = !show1"></v-text-field>
    <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordMatchRules" :type="show2 ? 'text' : 'password'" label="Confirmar contraseña" class="input-group--focused" counter @click:append="show2 = !show2"></v-text-field>
    <v-checkbox v-model="admin" label="Registrar como administrador" ></v-checkbox>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Registrar </v-btn> <!-- @click="validate" -->
  </v-form>
</template>

<script>
import * as auth from '../../services/AuthService'

export default{
  name: 'register',
  data: function(){
    return {
      username: '',
      email: '',
      password: '',
      first: '',
      last: '',
      admin: false,
      valid: true,
      show1: false,
      show2: false,
      nameRules: [
        v => !!v || 'El nombre de usuario es necesario',
        v => (v && v.length <= 16) || 'El nombre de usuario no debe ser mayor a 16 caracteres',
        v => (v && v.length >= 3) || 'El nombre de usuario debe tener al menos 3 caracteres',
      ],
      emailRules: [
        v => !!v || 'El correo electrónico es necesario',
        v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es necesaria',
      ],
      passwordMatchRules: [
        v => !!v || 'La contraseña es necesaria',
        v => v === this.password || 'La contraseña escrita no coincide',
      ]
    };
  },
  methods: {
    onSubmit: async function(){
      const user = {
        username: this.username,
        password: this.password,
        email: this.email,
        admin: this.admin,
      };
      const registerPromise = auth.registerUser(user);
      const loginPromise = auth.login(user);
      await Promise.all([registerPromise, loginPromise]);
      this.$router.push({name: 'home'});
    }
  }
}
</script>
