import Vue from 'vue';//
import VueResource from 'vue-resource'; // v0.5.1
import App from './App.vue';

import VueTables from 'vue-tables-2';

import Resource from 'vue-resource'

Vue.use(Resource)


Vue.use(VueResource)
//Vue.http.options.emulateJSON = true
//const http=Vue.http
//export default http
/////

Vue.use(VueTables.ClientTable);


//Vue.config.productionTip = false
//Vue.config.devtools = true
//Vue.http.options.credentials = true;
//Vue.http.options.xhr = {'withCredentials': true};
//Vue.http.headers.common['Authorization'] = 'Basic ' + btoa("username:password");


//Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';


new Vue({
  render: h => h(App)
}).$mount('#app')
