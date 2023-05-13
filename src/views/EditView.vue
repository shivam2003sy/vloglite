<template>
    <div class="container mt-5">
    <NotifiCation v-if="message" :message="message" :type="type" />
      <h1 class="mb-4">Edit Post</h1>
  <form @submit.prevent="updatePost" class="my-4">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="title">Title:</label>
        <input type="text" id="title" class="form-control" v-model="post.title" />
      </div>
      <div class="form-group col-md-6">
        <label for="content">Content:</label>
        <textarea id="content" class="form-control" rows="4" v-model="post.description"></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-2">Update Post</button>
  </form>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import NotifiCation from '@/components/NotifiCation.vue';
  export default {
    name: "EditView",
    components: {
      NotifiCation,
    },
    data() {
      return {
        post: {
          title: "",
          description: "",
        },
        message  : '',
      };
    },
    methods: {
      async updatePost() {
        try {
          let id  = this.$route.params.id
          console.log('params',id)
          const response = await axios.put(`/api/posts/${this.$route.params.id}`, this.post);
          console.log("Post updated successfully", response.data);
            this.message = 'Post updated successfully '
            this.type = 'success'
            setTimeout(() => {
            //   got back to history
              this.$router.go(-1)
            }, 2000);

        } catch (error) {
          console.error("Failed to update post", error);
          this.message = 'Failed to update post'
          this.type = 'error'
        }
      },
    },
    async created() {
        await axios.get(`/api/posts/${this.$route.params.id}`)
        .then((res) => {
          console.log(res.data.data.post);
          this.post.title = res.data.data.post.title
          this.post.description = res.data.data.post.caption
        })
     }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles for the component here */
  </style>
  