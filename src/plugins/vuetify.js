import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors' // App themes

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: { // App themes
    themes: {
      light: {
        primary: colors.purple.darken1,
        secondary: colors.purple.darken3,
        accent: colors.purple.base,
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: colors.purple.darken1,
        secondary: colors.purple.darken3,
        accent: colors.purple.base,
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      }
    }
  }
});
