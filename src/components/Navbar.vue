<template>
  <header>
    <v-app-bar
      absolute
      dark
      scroll-target="#app-container"
      color="primary"
      :hide-on-scroll="true"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">
        Proyecto
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item>
            <v-list-item-title>
              <router-link to="/" class="nav-link" exact>Inicio</router-link>
            </v-list-item-title>
          </v-list-item> -->
          <v-list-item v-if="!$store.state.isLoggedIn">
            <v-list-item-title>
              <router-link to="/registrar" class="nav-link" exact>Registrar</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.isLoggedIn">
            <v-list-item-title>
              <router-link to="/login" class="nav-link" exact>Login</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-list-item-title>
              <!-- <router-link to="/login" class="nav-link" exact>Cerrar sesión</router-link> -->
              <a v-on:click.prevent="logout()" class="nav-link" href="#">Cerrar sesión</a>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            {{this.$store.state.username ? this.$store.state.username : 'User'}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/" exact>Inicio</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/eventos" exact>Eventos</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/evento/nuevo" exact>Nuevo</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/about" exact>Ayuda</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import * as auth from '../services/AuthService';

export default {
  name: 'Navbar',
  data: () => ({
    drawer: null, // navigation-drawer
    // items: [
    //   {text: 'Dashboard', 'icon': 'mdi-view-dashboard'},
    //   {text: 'Photos', 'icon': 'mdi-image'},
    //   {text: 'About', 'icon': 'mdi-help-box'},
    // ],
  }),
  methods: {
    logout: function(){
      auth.logout();
      this.$router.push({name: 'home'});
    }
  }
}
</script>
