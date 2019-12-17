<template>
  <v-card class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4">
          {{ evento.place }} - {{ evento.date }}
        </div>
        <v-list-item-title class="headline mb-1">
          {{ evento.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ evento.guest }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn text v-on:click.prevent="createPDF()">PDF document</v-btn>
      <v-btn text v-on:click.prevent="backToEvents()">Regresar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as eventService from '../../services/EventService'
// import moment from 'moment'
import QRCode from 'qrcode'

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default{
  name: 'event-view',
  data: function(){
    return {
      evento: null,
      qrCode: '',
    }
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
    // createQRCode: function(){
    //   console.log('Hello QR');
    //   QRCode.toDataURL('I am a pony!')
    //   .then(url => {
    //     this.qrCode = url;
    //     console.log(url);
    //     window.open(url);
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    // },
    createPDF: function(){
      console.log('Hello PDF');

      QRCode.toDataURL('I am a pony!')
      .then(url => {
        // window.open(url);
        let docDefinition = {
          content: [
            'pdfmake (since it\'s based on pdfkit) supports JPEG and PNG format',
            'If no width/height/fit is provided, image original size will be used',
            {
              image: 'qrcode',
            },
          ],
          images: {
            qrcode: url,
          }
        };
        pdfMake.createPdf(docDefinition).download('Example.pdf');
      })
      .catch(err => {
        console.error(err)
      })
    },
    // onSubmit: async function(){
    //   const request = {
    //     event: this.evento
    //   };
    //   await eventService.updateEvent(request);
    //   this.$router.push({name: 'eventos'});
    // },
    backToEvents: function(){
      this.$router.push({name: 'eventos'});
    },
  }
}
</script>
