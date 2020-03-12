<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col v-for="event in events" v-bind:key="event._id" cols="12" sm="4" >
        <v-card class="pa-2" tile >
          <v-card-text>
            <p class="title text--primary">
              {{ event.name }}
            </p>
            <p class="subtitle-1">
              {{ event.place }}
            </p>
            <p class="caption">
              {{ event.fecha }}
            </p>
            <p>
              Anfitrión: <strong>{{ event.guest }}</strong>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn icon v-on:click.prevent="goToEvent(event._id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon v-on:click.prevent="editEvent(event._id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="openDialogDelete(event)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="350" v-if="currentEvent">
      <v-card>
        <v-card-title class="headline">Borrar evento</v-card-title>
        <v-card-text>¿Estás seguro de borrar el evento "{{ currentEvent.name }}"?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDelete()">Aceptar</v-btn>
          <v-btn text @click="dialogDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as eventService from '../../services/EventService'
import moment from 'moment';

moment.locale('es'); // Configuración de fechas en español

export default{
  name: 'events-all',
  data: function(){
    return {
      events: null,
      dialogDelete: false,
      currentEvent: undefined,
    }
  },
  beforeRouteEnter(to, from, next){
    eventService.getAllEvents()
    .then(res => {
      next(vm => {
        // vm.events = res.data.events;
        vm.events = res.data.events.map(event => {
          let parsedEvent = event;
          parsedEvent.fecha = moment(parsedEvent.date).format('L');
          return parsedEvent;
        });
      });
    });
  },
  methods: {
    goToEvent: function(eventId){
      this.$router.push({name: 'event-view', params: {id: eventId}});
    },
    editEvent: function(eventId){
      this.$router.push({name: 'event-edit', params: {id: eventId}});
    },
    openDialogDelete: function(evento){
      this.dialogDelete = true;
      this.currentEvent = evento;
    },
    confirmDelete: async function(){
      this.dialogDelete = false;
      await this.deleteEvent(this.currentEvent._id);
      this.currentEvent = undefined;
    },
    deleteEvent: async function(eventId){
      // const registerPromise = auth.registerUser(user);
      // const loginPromise = auth.login(user);
      await eventService.deleteEvent(eventId);
      eventService.getAllEvents()
      .then(res => {
        this.events = res.data.events.map(event => {
          let parsedEvent = event;
          parsedEvent.fecha = moment(parsedEvent.date).format('L');
          return parsedEvent;
        });
      });
    },
  }
}
</script>
