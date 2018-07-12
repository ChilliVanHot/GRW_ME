import Vue from 'vue'
import VueResource from 'vue-resource'; // v0.5.1
import App from './App.vue'
//import ClientTable from 'vue-tables-2';
Vue.use(VueResource);

//import Vue from 'vue'
//import VueResource from 'vue-resource'; // v0.5.1
//import App from './App.vue'



////Vue.use(VueResource);

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.http.options.xhr = {'withCredentials': true};
Vue.http.headers.common['Authorization'] = 'Basic ' + btoa("username:password");


Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  el: '#performer-list',
  data: {
    checkedNames: [],
    columns: ['name','age','isAcive','registered'],
 data: getData(),
 options: {
   headings:{
   name: 'Name',
   isActive: 'isActive',
   age: 'Age'
   },
sotrable:['name','isActive','age'],
filterable:['name','isActive','age'] 
 }
 }
});
function getData() {
  return [{
    code: "ZW",
    name: "Zimbabwe",
    created_at: "2015-04-24T01:46:50.459583",
    updated_at: "2015-04-24T01:46:50.459593",
    uri: "http://api.lobbyfacts.eu/api/1/country/245",
    id: 245
  }
];
}

new Vue({
  render: h => h(App)
}).$mount('#app')
