// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Firebase from 'firebase';

Vue.config.productionTip = false

// Your web app's Firebase configuration
/*var firebaseConfig = {
	apiKey: "AIzaSyDnFTba5zpwTpCHNsJyF6GNEllvy_4_ofA",
	authDomain: "ttscore-vue.firebaseapp.com",
	databaseURL: "https://ttscore-vue.firebaseio.com",
	projectId: "ttscore-vue",
	storageBucket: "ttscore-vue.appspot.com",
	messagingSenderId: "257744547344",
	appId: "1:257744547344:web:bee929b3dbd70293"
};*/
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//var defaultApp = firebase.initializeApp(firebaseConfig);
//console.log(defaultApp.name);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
