<!-- AddToDesktopButton.vue -->

<template>
    <button @click="addToDesktop">Add to Desktop</button>
  </template>
  
  <script>
  export default {
    name : 'AddToDesktopButton',
    methods: {
      addToDesktop() {
        console.log('Add to desktop');
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          // Detect if the app can be installed
          window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            // Save the event so it can be triggered later.
            this.deferredPrompt = event;
            // Show the install button
            this.showInstallPromotion();
            event.prompt();
          });
        }
      }
    }
  }
  </script>