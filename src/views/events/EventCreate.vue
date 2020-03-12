<template>
  <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="evento.name" :counter="32" label="Nombre del evento" required ></v-text-field>
    <v-text-field v-model="evento.guest" :counter="64" label="Nombre del anfitrión" required ></v-text-field>
    <v-select v-model="evento.place" :items="['Salón La Olla', 'Salón La Joya']" label="Lugar" required></v-select>
    <v-menu v-model="menuCalendar" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
      <template v-slot:activator="{ on }">
        <v-text-field v-model="evento.date" label="Fecha" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
      </template>
      <v-date-picker v-model="evento.date" @input="menuCalendar = false"></v-date-picker>
    </v-menu>
    <v-slider v-model="evento.amount" min="150" max="500" step="50" thumb-label="always" ticks="always" tick-size="4" label="Capacidad"></v-slider>
    <div v-for="(person, index) in evento.people" :key="index">
      <v-text-field v-model="person.name" :counter="64" label="Nombre de invitado"></v-text-field>
      <v-text-field type="number" v-model="person.limit" min="1" :max="evento.amount" label="Cantidad de personas"></v-text-field>
    </div>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Registrar </v-btn>

  </v-form>
</template>

<script>
import * as eventService from '../../services/EventService'

export default{
  name: 'formulario',
  components: {
    // "vue-p5": VueP5
  },
  data: function(){
    return {
      evento: {
        name: '',
        layout: [],
        place: '',
        amount: 150,
        date: new Date().toISOString().substr(0, 10),
        people: [],
        guest: '',
      },
      valid: true,
      menuCalendar: false,
    };
  },
  methods: {
    addPerson: function(){
      this.evento.people.push({name: '', limit: 0});
    },
    onSubmit: async function(){
      const request = {
        event: this.evento
      };
      // const registerPromise = auth.registerUser(user);
      // const loginPromise = auth.login(user);
      const newEvent = await eventService.createEvent(request);
      // await eventService.createEvent(request);
      console.log('newEvent:', newEvent);
      this.$router.push({name: 'home'}); // TODO
    },
  }
}
</script>
