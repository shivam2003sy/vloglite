<template>
  <nav class="navbar  navbar-expand-lg
  navbar-light bg-white
  elevation-2
  gradient-1
  sticky-top border justify-content-between">
    <RouterLink to="/" class="navbar-brand ">
      <img src="@/assets/images/wb.jpeg" height="60" class="d-inline-block align-top" alt="homelogo">
    </RouterLink>
    <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse lap" :class="{ show: isNavbarCollapsed }">
      <!-- to the right -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <RouterLink to="/" class="nav-link">Home <span class="sr-only">(current)</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink v-if="user" :to="{name: 'profile', params: {username: user}}" class="nav-link">Profile</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/create" class="nav-link">Create Post</RouterLink>
        </li>
      </ul>
      <div class="end" >

        <button v-if="face === 'false'" type="button" class="btn btn-outline-warning"  @click="emailVerify">Not Verified</button>
        <button v-else type="button" class="btn btn-outline-success" @click="alreadyverified">Verified</button>
        {{ email }}
        <!-- <button v-if="user" class="btn btn-primary m-2" @click="logout">Logout</button> -->
        <button v-if="user" class="btn btn-primary m-2 logout-button" @click="logout">
      <i class="fas fa-sign-out-alt mr-2"></i>Logout
    </button>
      </div>
    </div>
  </nav>
  <div v-if="notify">
    <NotifiCaion type="success" :message='notify'/>
  </div>
</template>
<script>
import axios from 'axios';
import NotifiCaion from './NotifiCation.vue'
export default {
  name: 'NavBar',
  components: {
    NotifiCaion
  },
  data() {
    return {
      user: localStorage.getItem('user'),
      email : localStorage.getItem('email'),
      isNavbarCollapsed: false,
      face : localStorage.getItem('email_verified') == 'true' ? 'true' : 'false',
      notify :''

    }
  },
  methods: {
    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    },
    logout() {
      localStorage.removeItem('tocken')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      localStorage.removeItem('email_verified')
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    },
    async emailVerify() {
      await axios.post('/api/verify')
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.notify = 'Verification link sent to your email ! then login again' 
          setTimeout(() => {
            this.notify = 'login again after verification'
          }, 2000);
          setTimeout(() => {
            this.notify = ''
          }, 4000);
        }    
      })
      .catch(err => {
        console.log(err)
      })

    },
    alreadyverified() {
      this.notify = 'Your email is already verified !'
      setTimeout(() => {
        this.notify = ''
      }, 2000);
    }
  },
}
</script>


<style scoped>
/* Custom styles for Navbar */
.navbar-brand img {
  max-height: 50px;
  object-fit: contain;
  margin-left: 50px;
}

.navbar-nav .nav-link {
  padding: 0.5rem 1rem;
}

.navbar-toggler {
  border: none;
}

.show {
  display: flex !important;
}
.lap {
  /* justify-self: end; */
  margin-left: auto;
  margin-right: 50px;
}
.end{
  margin-left: auto;
  margin-right: 50px;
  justify-content: end;
  justify-self: end;
  justify-items: end;
}
.end:hover{
  cursor: pointer;
  
}
.logout-button {
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  background-color:coral
}

.logout-button:hover {
  background-color :chocolate
}
@media (max-width: 576px) {
  .navbar-nav .nav-link {
    padding: 0.5rem;
  }
  .end{
    display: flex;
  }
}
</style>