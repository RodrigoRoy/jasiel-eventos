<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col v-for="event in events" v-bind:key="event._id" cols="12" sm="4" >
        <v-card class="pa-2" tile >
          <v-card-text>
            <p class="display-1 text--primary">
              {{ event.name }}
            </p>
            <p>
              {{event.date}} - {{ event.place }}
            </p>
            <p>
              {{ event.guest }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn text v-on:click.prevent="goToEvent(event._id)">Ver</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as eventService from '../../services/EventService'

export default{
  name: 'events-all',
  data: function(){
    return {
      events: null,
      currentEventId: null,
    }
  },
  beforeRouteEnter(to, from, next){
    eventService.getAllEvents()
    .then(res => {
      next(vm => {
        vm.events = res.data.events;
      });
    });
  },
  methods: {
    goToEvent: function(eventId){
      this.$router.push({name: 'event-view', params: {id: eventId}});
    },
  }
}
</script>
