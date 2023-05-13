<template>
  <div class="profile-posts">
    <div class="container">
      <h2 class="profile-posts__heading">Posts</h2>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="post in posts" :key="post.id" class="col">
          <div class="card h-100">
            <RouterLink :to="{ name: 'post', params: { id: post.id } }" class="card-link">
              <img :src="'https://bloglite-21f1006233.b4a.run/static/uploads/' + post.imgpath" class="card-img-top" alt="post image" />
            </RouterLink>
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.caption }}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{ formatDate(post.timestamp) }}</small>
              <p class="card-text"><small class="text-muted">{{ post.no_of_likes }} likes</small></p>
              <div v-if="isCurrentUser">
                <button @click="deletePost(post.id)" class="btn btn-danger btn-sm m-1">Delete</button>
                <RouterLink :to="{ name: 'edit', params: { id: post.id } }" class="btn btn-primary btn-sm">Edit</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProfilePosts",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isCurrentUser() {
      return localStorage.getItem("user") === this.$route.params.username;
    },
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    },
    async deletePost(id) {
      // Call a method to delete the post with the given id
      // You can implement this method according to your backend logic
      await axios
        .delete(`/api/posts/${id}`)
        .then((res) => {
          console.log(res);
          // id send to profleView to update the posts
          setTimeout(() => {
            // hard reload
            window.location.reload();
          }, 1);
          this.$emit("deletepost", id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
