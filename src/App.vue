<template>
  <router-view/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
export default {
  name: "App",
  components: {
 
  },
  beforeRouteEnter(to, from, next) {
    // check if the user is authenticated
    
    const isAuthenticated = localStorage.getItem('user') !== null;

    if (isAuthenticated) {
      // allow access to the route
      next();
    } else {
      // redirect to the login page
      next({ path: '/login' });
    }
  }
}
</script>

<style>
* {
  margin: 1;
  padding: 1;
  box-sizing: border-box;
}
</style>