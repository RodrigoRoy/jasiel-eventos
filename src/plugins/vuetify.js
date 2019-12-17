import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors' // App themes

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  // theme: { // App themes
  //   themes: {
  //     light: {
  //       primary: colors.red.darken1, // #E53935
  //       secondary: colors.red.lighten4, // #FFCDD2
  //       accent: colors.indigo.base, // #3F51B5
  //     }
  //   }
  // }
});
