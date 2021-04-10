/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: 'AIzaSyDYH5EjmkeWxeh1D3q-EGbesCdAS2rVXcs',
    projectId: 'slambook-f8a5f',
    messagingSenderId:'1071728065834',
    appId: '1:1071728065834:web:247a0ced4e0b8b4016f253',
})

// firebase.messaging()
firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));