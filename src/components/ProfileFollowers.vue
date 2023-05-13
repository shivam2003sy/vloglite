<template>
  <div class="container profile-followers">
    <div class="row">
      <div class="col-12">
        <h3>Followings ({{ following.length }})</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="list-group">
          <div
            v-for="(follower, index) in following"
            :key="follower.id"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div class="follower-info">
              <h4>{{ follower.user }}</h4>
              <p>{{ follower.email }}</p>
            </div>
            <button
              @click="toggleFollow(index)"
              :class="[following.includes(index) ? 'btn btn-outline-danger' : 'btn btn-primary']"
            >
              {{ following.includes(index) ? 'unfollow' : 'follow' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFollowing",
  data() {
    return {
      following: [
        { id: 1, user: "John", email: "john@example.com" },
        { id: 2, user: "Jane", email: "jane@example.com" },
        { id: 3, user: "Bob", email: "bob@example.com" },
      ],
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
};
</script>
