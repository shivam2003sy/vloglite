<template>
  <div class="container-fluid bodyColor">
    <NavBar />
    <header>
      <profile-header :user="user" :profile="profile" :isFollowing='isFollowing' v-on:update:isFollowing="handleUpdateIsFollowing" />
    </header>
    <main class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <profile-posts :posts="posts" @deletepost="deletePost(id)" :isLoggedUser="isLoggedUser" />
      </div>
      <div class="col-lg-4 col-md-10 col-sm-12 mt-5">
        <div v-if="isLoggedUser">
          <div class="card mb-3">
            <div class="container profile-followers">
              <div class="row">
                <div class="col-12">
                  <div v-if="follower.length === 0" class="follower-info">
                    <h4>No Followers</h4>
                  </div>
                  <div v-else>
                    <h3>Followers</h3>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="list-group">
                    <div v-for="(f) in follower" :key="f.follower_id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <div class="follower-info">
                        <RouterLink :to="{ name: 'profile', params: { username: f.follower } }">
                          <h4>{{ f.follower }}</h4>
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="container profile-followers">
              <div class="row">
                <div class="col-12">
                  <div class="col-12">
                    <div v-if="follower.length === 0" class="follower-info">
                      <h4>No Followings</h4>
                    </div>
                    <div v-else>
                      <h3>Followings</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="">
                    <!-- {{ following }} -->
                    <div v-for="(follower) in following" :key="follower.following_id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <div class="follower-info">
                        <RouterLink :to="{ name: 'profile', params: { username: follower.following } }">
                          <h4>{{ follower.following }}</h4>
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import ProfileHeader from '@/components/ProfileHeader.vue'
import ProfilePosts from '@/components/ProfilePosts.vue'

import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
  name: 'ProfilePage',
  components: {
    ProfileHeader,
    NavBar,
    ProfilePosts,

  },
  data() {
    return {
      posts: [],
      user: null,
      profile: null,
      isLoggedUser: false,
      isFollowing: false,
      follower: [],
      following: []
    }
  },
  methods: {
    async handleUpdateIsFollowing(isFollowing) {
      this.isFollowing = isFollowing
    },
    deletePost(id) {
      const index = this.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        // If post with id is found, remove it from the posts array
        this.posts.splice(index, 1);
      } else {
        console.log('Post not found with id:', id);
      }
    },
  },
  async created() {
    // user to show in profile
    let user = this.$route.params.username
    console.log('params', user)
    if (user === localStorage.getItem('user')) {
      this.isLoggedUser = true
    }
    //fetching user details 
    let response = axios.get('api/users/' + user)
    response.then((res) => {
      console.log('response', res.data.data)
      this.user = res.data.data.user
      this.profile = res.data.data.Profile
    })
      .catch((err) => {
        console.log(err)
      })

    //  fetching posts
    let posts = axios.get('/api/users/' + user + '/posts')
    posts.then((res) => {
      this.posts = res.data.data.posts
      console.log('posts', this.posts)
    })
      .catch((err) => {
        console.log(err)
      })
    // fetching followers
    let followers = axios.get('/api/users/' + user + '/followers')
    followers.then((res) => {
      this.followers = res.data.data
      this.$store.dispatch('setfollowers', res.data.data)
      console.log('followers', this.followers)
      console.log('from store followers', this.$store.state.followers)
      if (this.followers.some(follower => follower.user === localStorage.getItem('user'))) {
        this.isFollowing = true
        console.log('isFollowing', this.isFollowing)
      }
    })
      .catch((err) => {
        console.log(err)
      })
    // fetching followings
    axios.get(`/api/followings/${user}`)
      .then((res) => {
        this.following = res.data.data
        console.log('following', this.following)
      })
      .catch((err) => {
        console.log(err)
      })
    axios.get(`/api/followers/${user}`)
      .then((res) => {
        this.follower = res.data.data
        console.log('followers', this.follower)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

