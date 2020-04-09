<template>
  <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="username" :rules="rules.username" label="Nombre de usuario" required ></v-text-field>
    <v-text-field v-model="password" :rules="rules.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" required></v-text-field>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Entrar </v-btn>
  </v-form>
</template>

<script>
import * as auth from '../../services/AuthService'

export default{
  name: 'login',
  data: function(){
    return {
      username: '',
      password: '',
      valid: true,
      show1: false,
      rules: {
        username: [
          value => !!value || 'El nombre de usuario es necesario',
        ],
        password: [
          value => !!value || 'La contraseña es necesaria',
        ],
      },
      nameRules: [
        v => !!v || 'El nombre de usuario es necesario',
        v => (v && v.length <= 16) || 'El nombre de usuario no debe ser mayor a 16 caracteres',
        v => (v && v.length >= 3) || 'El nombre de usuario debe tener al menos 3 caracteres',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es necesaria',
      ],
    };
  },
  methods: {
    onSubmit: async function(){
      if(!this.$refs.formulario.validate()) // Se activa validación del formulario
        return;
      const user = {
        username: this.username,
        password: this.password
      };
      await auth.login(user);
      this.$router.push({name: 'home'});
    }
  }
}
</script>
