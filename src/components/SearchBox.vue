<template>
    <div>
      <div class="input-group">
        <input type="text" class="form-control" v-model="searchTerm" @input="handleSearch" placeholder="Search for user ...">
        <!-- cross button -->
        <div class="input-group-append">
          <!-- <button class="btn btn-outline-secondary" type="button" @click="handelClear">
            clear
          </button> -->
          </div>
      </div>
      <b-modal v-model="showUserList" hide-footer>
        <ul class="list-group">
          <li class="list-group-item" v-for="user in users" :key="user.id">
            <router-link :to="{ name: 'profile', params: { username: user.user }}">
              {{ user.user }}
            </router-link>
          </li>
        </ul>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SearchBox',
    data() {
      return {
        searchTerm: '',
        users: [],
        showUserList: false,
        debouncedSearch: null,
      };
    },
    methods: {
      handleSearch() {
        clearTimeout(this.debouncedSearch);
        this.debouncedSearch = setTimeout(() => {
          if (this.searchTerm.length > 0) {
            this.searchUsers();
          }
        }, 500);
      },
      searchUsers() {
        axios.get(`/api/users?search=${this.searchTerm}`)
          .then(response => {
            this.users = response.data.data.slice(0, 4);
            this.showUserList = true;
            setTimeout(() => {
              this.showUserList = false;
            }, 500);
          })
          .catch(error => {
            console.error('Error searching users:', error);
          });
      },
    },
    handelClear() {
      this.searchTerm = '';
      this.users = [];
      this.showUserList = false;
    },
  };
  </script>
  