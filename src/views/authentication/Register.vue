<template>
  <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="username" :rules="rules.name" :counter="16" label="Nombre de usuario" required ></v-text-field>
    <v-text-field v-model="email" :rules="rules.email" label="Correo electrónico" required ></v-text-field>
    <v-text-field v-model="password" :rules="rules.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" counter @click:append="show1 = !show1"></v-text-field>
    <v-text-field :rules="rules.passwordVerification" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Confirmar contraseña" class="input-group--focused" counter @click:append="show2 = !show2"></v-text-field>
    <v-checkbox v-model="admin" label="Registrar como administrador"></v-checkbox>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Registrar </v-btn>
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
      rules: {
        name: [
          value => !!value || 'El nombre de usuario es necesario',
          value => (value && value.length <= 16) || 'El nombre de usuario no debe ser mayor a 16 caracteres',
          value => (value && value.length >= 3) || 'El nombre de usuario debe tener al menos 3 caracteres',
        ],
        email: [
          value => !!value || 'El correo electrónico es necesario',
          value => /.+@.+\..+/.test(value) || 'El correo electrónico debe ser válido',
        ],
        password: [
          value => !!value || 'La contraseña es necesaria',
        ],
        passwordVerification: [
          value => !!value || 'Es necesario repetir la misma contraseña',
          value => value === this.password || 'La contraseña no coincide',
        ]
      },
    };
  },
  methods: {
    onSubmit: async function(){
      if(!this.$refs.formulario.validate()) // Se activa validación del formulario
        return;
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
