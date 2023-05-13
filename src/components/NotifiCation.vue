
<template>
    <div class="notification" :class="type">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotifiCation',
    props: {
      type: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .notification {
    padding: 16px;
    color: #fff;
    font-size: 16px;
  }
  
  .success {
    background-color: #28a745;
  }
  
  .error {
    background-color: #dc3545;
  }
  
  .warning {
    background-color: #ffc107;
  }
  
  .info {
    background-color: #17a2b8;
  }
  </style>