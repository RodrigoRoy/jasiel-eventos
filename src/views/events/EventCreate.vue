<template>
  <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="evento.name" :rules="rules.name" :counter="32" label="Nombre del evento" required ></v-text-field>
    <v-text-field v-model="evento.guest" :rules="rules.guest" :counter="64" label="Nombre del anfitrión" required ></v-text-field>
    <v-menu v-model="menuCalendar" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
      <template v-slot:activator="{ on }">
        <v-text-field v-model="evento.date" label="Fecha" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
      </template>
      <v-date-picker v-model="evento.date" @input="menuCalendar = false"></v-date-picker>
    </v-menu>
    <v-select v-model="evento.place" :rules="rules.place" :items="['Salón La Joya', 'Salón La Olla']" label="Lugar" required></v-select>
    <v-slider v-model="evento.amount" :disabled="!evento.place" :min="evento.place == 'Salón La Joya' ? 100 : 250" :max="evento.place == 'Salón La Joya' ? 250 : 500" step="50" thumb-label="always" ticks="always" tick-size="4" label="Capacidad" class="mt-6 mb-4"></v-slider>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4" @click="validate"> Registrar </v-btn>

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
        amount: 100,
        date: new Date().toISOString().substr(0, 10),
        people: [],
        guest: '',
      },
      rules: {
        name: [
          value => !!value || 'El nombre del evento es necesario',
          value => (value && value.length <= 32) || 'El nombre debe ser menor a 32 caracteres',
        ],
        guest: [
          value => !!value || 'El nombre del anfitrión es necesario',
          value => (value && value.length <= 64) || 'El nombre debe ser menor a 64 caracteres',
        ],
        place: [
          value => !!value || 'Es necesario elegir un salón',
        ],
      },
      valid: true,
      menuCalendar: false,
    };
  },
  methods: {
    addPerson: function(){
      this.evento.people.push({name: '', limit: 0});
    },
    validate: function(){
      this.$refs.formulario.validate()
    },
    onSubmit: async function(){
      const request = {
        event: this.evento
      };
      const newEvent = await eventService.createEvent(request);
      this.$router.push({name: 'event-view', params: {id: newEvent.data.id}});
    },
  }
}
</script>
