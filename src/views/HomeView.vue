<template>
  <NavBar />
  <NotifiCation style="position: fixed;" :type="type" :message="message" />
  <div class="container mt-4 middlearea" style="background-color: #fafafa;">
    <div class="row ">
      <div class="col-12 col-md-3 mt-2">
        <div class="col-xs-8 rightpanel" id="sticky-sidebar">
          <SearchBox />
          <div class="card d-flex m-2" style="background-color: #f5f5f5;">
            <img
              src="@/assets/images/card.jpeg"
              alt="banner"
              width="200"
              class="m-1"
            />
            <p class="text-mute m-1">
              <strong>
                Adv. listing
              </strong>
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <FeedsComponent />
      </div>
      <div class="col-12 col-sm-12 col-md-3 d-sm-none d-md-block">
        <div class="card col-xs-12 rightpanel" id="sticky-sidebar" style="width: 18rem; background-color: #ffffff;">
          <div class="card-body d-flex">
            <div>
              <a class="nav-link" >
                <span>
                  <strong>by: Shivam Singh</strong>
                </span>
              </a>
              <div class="mt-2">
              </div>
              <div class="mt-2 ml-2">
                <div class="mt-3">
                  <span>
                    <img src="@/assets/images/cardlook.jpeg" style="width: 250px; border-radius: 5%;" />
                  </span>
                </div>
              </div>
              <div class="ml-2 mt-2"
                style="color: #999; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                <p></p>
                <p style="font-size: 12px; color: #888;">
                  © 2023 Blog lite modern application development 2 project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import FeedsComponent from '@/components/FeedsComponent.vue';
import SearchBox from '@/components/SearchBox.vue';
import NotifiCation from '@/components/NotifiCation.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    NavBar,
    FeedsComponent,
    SearchBox,
    NotifiCation,
   
  },
  data() {
    return {
      loading: false,
      message: '',
      type: '',
      users: [],

    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods:{
  },
  async created() {
    if (!localStorage.getItem('tocken')) {
      console.log(this.$store.state.user)
      this.$router.push('/login')
    }
    await axios.get('/api/user').then(response => {
      if (response.data.data != null) {
        console.log('response', response.data.data)
        console.log('response2', response.data.data.Profile.image)
        this.$store.dispatch('setUser', response.data.data)
      } else {
        this.$router.push('/login')
      }
    })
      .catch(err => {
        // network error
        if (err.message === "Network Error") {
          this.message = "Network Error ! Please check your internet connection";
          this.type = "error";
        }
        // not found
        if (err.response && err.response.status === 404) {
          this.message = "Not data found !"
          this.type = "warning";
        }
      })
  }
}

</script>
<style>
.userName{
  font-size: 20px;
  color: #000000;
}


.rightpanel {
  border: 0;
  background-color: #FAFAFA;
}

.rightpanellinks {
  text-decoration: none;
  color: lightgrey;
}

.rightpanellinks:hover {
  text-decoration: none;
  color: lightgrey;
}

/* media query for mobile  */
@media only screen and (max-width: 600px) {
  #sticky-sidebar {
    position: static;
  }
}

/* media query for tablet  */
@media only screen and (min-width: 600px) {
  #sticky-sidebar {
    position: static;
  }
}

/* media query for desktop  */
@media only screen and (min-width: 768px) {
  #sticky-sidebar {
    position: fixed;
  }
}

/* media query for large desktop  */
@media only screen and (min-width: 992px) {
  #sticky-sidebar {
    position: fixed;
  }
}

/* media query for extra large desktop  */

@media only screen and (min-width: 1200px) {

  #sticky-sidebar {
    position: fixed;
  }
}
</style>
