import Vue from "vue";
//import Vuetify from "vuetify/lib/framework";
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        icons: {
            iconfont: 'mdi', // default - only for display purposes
          },
        themes: {
            light: {
                primary: '#ff5722',
                secondary: '#607d8b',
                accent: '#03a9f4',
                error: '#f44336',
                warning: '#ffeb3b',
                info: '#2196f3',
                success: '#4caf50',
                background: '#f0f0f0',
            },
        },
        options: {
            customProperties: true
        },
    },
})

export default vuetify;
