<template>
  <!-- <h1>This is the home page</h1> -->
  <v-card class="mx-auto" max-width="700" >
    <v-card-text>
      <div>Iniciativa de software libre</div>
      <p class="display-1 text--primary">
        Proyecto gestor de eventos
      </p>
      <p>Para salón de fiestas</p>
      <div class="text--primary">
        El presente proyecto da cuenta del uso de software para la administración y gestión de labores relacionadas a un salón de fiestas donde se organizan diversos eventos.<br>
        En específico, el proyecto administra los usuarios y personas que se registran para obtener un lugar en el espacio disponible.<br>
        Así también se encarga de la generación de boletos identificadores mediante el uso de códigos QR y la interfaz para regular e identificar el proceso de entrada de los invitados.
      </div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text color="primary" >
        Ver eventos
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: 'home',
  beforeCreate: function(){
    fetch(this.$store.state.apiUrl + '/user', {method: 'GET'})
  }
};
</script>
