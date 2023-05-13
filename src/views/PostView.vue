<template>
    <NavBar />
    <div class="container mt-3">

        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else-if="message" class="alert alert-danger" role="alert">
            {{ message }}st likes = 100;
      const comments = 10;
        </div>
        <div  v-else>
            <div class="row">
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header">
                            <router-link :to="{ name: 'profile', params: { username: user.user } }"
                                class="text-decoration-none text-dark">
                                <h5 class="card-title mb-0 font-weight-bold">{{ user.user }}</h5>
                            </router-link>
                        </div>
                        <div class="card-body">

                            <h2 class="card-title">{{ post.title }}</h2>


                            <p class="card-text">{{ post.caption }}</p>

                            <img :src="'https://bloglite-21f1006233.b4a.run/static/uploads/' + post.imgpath"
                                :alt="post.title" class="img-fluid rounded mb-3">

                            <p class="card-text"><small class="text-muted">{{ post.timestamp }}</small></p>


                            <div class="d-flex align-items-center mb-3">
                                <p class="m-0 me-3">Likes: {{ no_of_likes}}</p>
                                <button class="btn btn-outline-danger" @click="toggleLike">
                                    <i :class="['fa', 'fa-heart', { 'me-1': !liked, 'me-2': liked }]"></i>
                                    {{ liked ? 'Unlike' : 'Like' }}
                                </button>
                            </div>
                            <div v-for="comment in comments" :key="comment.id" class="mb-3">
                                <div class="d-flex align-items-center">
                                    <p class="m-0 font-weight-bold">{{ comment.username }}</p>
                                    <p class="m-0 ms-3">{{ comment.comment }}</p>
                                </div>
                            </div>

                            <comment-box :post-id="post.id" @submit-comment="submitComment"></comment-box>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <PostChart  :comments ="comments.length"  :likes="no_of_likes"/>
                </div>
            </div>
            <!-- graph of engagements no of likes and commnets -->
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import CommentBox from '@/components/CommentBox.vue';
import PostChart from '@/components/PostChart.vue';
export default {
    name: 'PostView',
    components: {
        NavBar,
        CommentBox,
        PostChart
    },
    data() {
        return {
            post: null,
            loading: true,
            message: '',
            user: null,
            comments: null,
            likes: null,
            liked: false,
            no_of_likes: 0
        }
    },
    async created() {
        try {
            const response = await axios.get(`/api/posts/${this.$route.params.id}`);
            this.post = response.data.data.post;
            this.no_of_likes = this.post.no_of_likes;
            this.user = response.data.data.user;
            this.comments = response.data.data.postcommentedby;
            this.likes = response.data.data.postlikedby;
            for (let i = 0; i < this.likes.length; i++) {
                if (this.likes[i].username === localStorage.getItem('user')) {
                    this.liked = true;
                }
            }
            console.log('post', response.data);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                this.message = 'There was a server error. Please refresh the page.';
            } else {
                this.message = 'An error occurred. Please try again later.';
            }
        }
        this.loading = false;
    },
    methods: {
        async submitComment(comment, postId) {
            console.log("comment", comment);
            console.log("postId", postId);
            try {
                const response = await axios.post(`/api/posts/comment/${postId}`, {
                    comment,
                });
                console.log("response", this.comments);
                console.log("response", response.data.data);
                this.comments.push(response.data.data);
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    this.message = "There was a server error. Please refresh the page.";
                } else {
                    this.message = "An error occurred. Please try again later.";
                }
            }   
        },
        async toggleLike() {
      try {
        await axios.post(`/api/posts/${this.post.id}/like`, {
          liked: !this.liked
        });
        if (this.liked) {
          this.no_of_likes -= 1;
        } else {
          this.no_of_likes += 1;
        }
        this.liked = !this.liked;
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.message = 'There was a server error. Please refresh the page.';
        } else {
          this.message = 'An error occurred. Please try again later.';
        }
      }
    }
    }
}

</script>
<style>
.container {
    margin-top: 50px;
}
</style>