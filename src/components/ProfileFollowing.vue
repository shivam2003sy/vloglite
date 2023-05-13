<template>
  <div class="container profile-followers">
    <div class="row">
      <div class="col-12">
        <h3>Followers</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="list-group">
          <!-- <div
            v-for="(follower, index) in following"
            :key="follower.id"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div class="follower-info">
              <h4>shivam</h4>
              <p>shivam2003sy@gmail.com</p>
            </div>
            <button
              @click="toggleFollow(index)"
              :class="[following.includes(index) ? 'btn btn-outline-danger' : 'btn btn-primary']"
            >
              {{ following.includes(index) ? 'unfollow' : 'follow' }}
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProfileFollowing",
  data() {
    return {

    };
  },
  methods: {
    toggleFollow(index) {
      const pos = this.following.indexOf(index);
      if (pos > -1) {
        this.following.splice(pos, 1);
      } else {
        this.following.push(index);
      }
    },
  },
  created() {
    axios.get('')
  },
};
</script>
