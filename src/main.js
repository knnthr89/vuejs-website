import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';

const configOptions = {
    apiKey: "AIzaSyD46PWxKYRjz-_upmXUzrTMKXK7x4u3phs",
    authDomain: "imadiq-857ee.firebaseapp.com",
    projectId: "imadiq-857ee",
    storageBucket: "imadiq-857ee.appspot.com",
    messagingSenderId: "899851400756",
    appId: "1:899851400756:web:5af184eca792ca72e87c61",
    measurementId: "G-V4GQ0GY67S"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
