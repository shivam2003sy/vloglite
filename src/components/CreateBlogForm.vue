<template>
  <div class="container m-3">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1>Create New Blog Post</h1>
        <form @submit.prevent="submitForm" class="mt-4">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="title" class="form-control">
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="description" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="image">Image:</label>
            <div>
              <input type="file" id="image" @change="previewImage" class="form-control-file">
            </div>
            <div class="mt-2">
              <img v-if="imagePreview" :src="imagePreview" alt="Image preview" class="img-fluid">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Create Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateBlogForm',
  data() {
    return {
      title: '',
      description: '',
      image: null,
      imagePreview: null
    }
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      this.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('file', this.image);
      const response = await axios.post('api/posts', formData);
      console.log(response);
      this.$store.dispatch('modal', false);
      this.title = '';
      this.description = '';
      this.image = null;
      this.imagePreview = null;
    }
  }
}
</script>
