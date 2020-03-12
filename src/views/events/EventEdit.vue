<template>
  <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="evento.name" :counter="32" label="Nombre del evento" required readonly></v-text-field>
    <v-text-field v-model="evento.guest" :counter="64" label="Nombre del anfitrión" required readonly></v-text-field>
    <v-select v-model="evento.place" :items="['Salón La Olla', 'Salón La Joya']" label="Lugar" required readonly></v-select>
    <v-menu v-model="menuCalendar" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" readonly>
      <template v-slot:activator="{ on }">
        <v-text-field v-model="evento.date" label="Fecha" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
      </template>
      <v-date-picker v-model="evento.date" @input="menuCalendar = false"></v-date-picker>
    </v-menu>
    <v-slider v-model="evento.amount" min="150" max="500" step="50" thumb-label="always" ticks="always" tick-size="4" label="Capacidad" readonly></v-slider>

    <div v-for="(person, index) in evento.people" :key="index">
      <v-text-field v-model="person.name" :counter="64" label="Nombre de invitado"></v-text-field>
      <v-text-field type="number" v-model="person.limit" min="1" :max="evento.amount" label="Cantidad de personas"></v-text-field>
    </div>
    <v-btn @click="addPerson">Agregar invitados</v-btn>

    <br />

    <vue-p5 @setup="setup" @draw="draw" @mouseclicked="mouseClicked"></vue-p5>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Registrar </v-btn>

    <!-- {{ evento }} -->
  </v-form>
</template>

<script>
import * as eventService from '../../services/EventService'
import {Table} from '../../utilities/Table'
import VueP5 from 'vue-p5'

export default{
  name: 'editEvento',
  components: {
    "vue-p5": VueP5
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
      // evento: {},
      valid: true,
      menuCalendar: false,
    };
  },
  beforeRouteEnter(to, from, next){
    eventService.getEventById(to.params.id)
    .then(res => {
      if(!res){
        next('/eventos');
      }
      else{
        next(vm => {
          const evento = res.data.event;
          // (aquí cualquier edición)
          vm.evento = evento;
        });
      }
    });
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
      await eventService.createEvent(request);
      this.$router.push({name: 'home'}); // TODO
    },
    setup: function(sketch){
      sketch.createCanvas(800, 800);
      const tableSize = 50;
      const chairsPerTable = 10;
      const chairSize = 20;
      const totalTables = this.evento.amount / 10;
      const totalRows = totalTables / 4;
      const horizontalSpacing = sketch.width / 5;
      const verticalSpacing = sketch.height / totalRows; // size + spacing
      const marginSpacing = 80;
      for(let i = 0; i < 5; i++){
        for(let j = 0; j < totalRows; j++){
          if(i != 2)
            this.evento.layout.push(new Table(i*horizontalSpacing + marginSpacing, j*verticalSpacing + marginSpacing, tableSize, chairsPerTable, chairSize));
        }
      }
      // this.evento.layout = [
      //   new Table(200, 150, tableSize, chairsPerTable, chairSize),
      //   new Table(400, 300, tableSize, chairsPerTable, chairSize),
      //   new Table(200, 450, tableSize, chairsPerTable, chairSize)
      // ];
      // this.evento.layout = [
      //   new Table(200, 150, 80, 10, 20),
      //   new Table(400, 300, 80, 10, 20),
      //   new Table(200, 450, 80, 10, 20)
      // ];
    },
    draw: function(sketch){
      // sketch.createCanvas(800, 800);
      const tableSize = 50;
      const chairsPerTable = 10;
      const chairSize = 20;
      const totalTables = this.evento.amount / 10;
      const totalRows = totalTables / 4;
      const horizontalSpacing = sketch.width / 5;
      const verticalSpacing = sketch.height / totalRows; // size + spacing
      const marginSpacing = 80;
      for(let i = 0; i < 5; i++){
        for(let j = 0; j < totalRows; j++){
          if(i != 2)
            this.evento.layout.push(new Table(i*horizontalSpacing + marginSpacing, j*verticalSpacing + marginSpacing, tableSize, chairsPerTable, chairSize));
        }
      }

      sketch.stroke(0);
      sketch.background(200);
      for(let table of this.evento.layout){
        sketch.fill(sketch.color(255, 255, 0, 90));
        // sketch.ellipseMode(sketch.CORNER);
        sketch.ellipse(table.x, table.y, table.size);
        for(let chair of table.chairs){
          let fillColor = chair.isFree ? sketch.color(255) : sketch.color(123);
          sketch.fill(fillColor);
          sketch.rect(chair.x, chair.y, chair.size, chair.size);
        }
      }
    },
    mouseClicked: function({ mouseX, mouseY}){
      // console.log('mouseClicked - evento', this.evento);
      for(let table of this.evento.layout){
        for(let chair of table.chairs){
          chair.update(mouseX, mouseY)
        }
      }
    },
  }
}
</script>
