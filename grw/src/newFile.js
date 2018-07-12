import Vue from 'vue';
import { btoa } from "./main";
Vue.http.options.xhr = { 'withCredentials': true };
Vue.http.headers.common['Authorization'] = 'Basic ' + btoa("username:password");
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';