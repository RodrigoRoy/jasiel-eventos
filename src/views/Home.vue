<template>
  <!-- <h1>This is the home page</h1> -->
  <v-card class="mx-auto" max-width="700" >
    <v-card-text>
      <div>Donec dictum posuere</div>
      <p class="display-1 text--primary">
        Lorem ipsum
      </p>
      <p>Sed sed venenatis enim</p>
      <div class="text--primary">
        Pellentesque molestie et ipsum in aliquet. Vestibulum tincidunt consectetur hendrerit.<br>
        Fusce hendrerit posuere leo vitae convallis.<br>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. <br>
        Donec est massa, viverra in ullamcorper ut, facilisis vel ex
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4" >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'home',
  beforeCreate: function(){
    fetch(this.$store.state.apiUrl + '/api/user', {method: 'GET'})
  }
};
</script>
