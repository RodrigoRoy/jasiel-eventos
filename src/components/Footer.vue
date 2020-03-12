<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="blue-grey text-center">
      <!-- <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text> -->

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Jasiel</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: ['mdi-home-outline', 'mdi-facebook', 'mdi-github-circle']
  }),
}
</script>
