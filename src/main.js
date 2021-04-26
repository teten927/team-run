import Vue from 'vue'
import router from'./router'
import App from './App.vue'
import VModal from 'vue-js-modal'
import store from './store'
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDR2rrfYQDqTimrGcQPTN0Kgp1Eoru7544",
  authDomain: "team-run-9cdbf.firebaseapp.com",
  projectId: "team-run-9cdbf",
  storageBucket: "team-run-9cdbf.appspot.com",
  messagingSenderId: "375598164758",
  appId: "1:375598164758:web:45f04c5b83a1344f523e37",
  measurementId: "G-GDCRFSWN0F"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

Vue.use(VModal);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
