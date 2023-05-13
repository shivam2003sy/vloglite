import { createStore } from 'vuex'
export default createStore({
  state: {
    // 1. Create a state variable to hold the user's name
    user :{},
    followers : [],
    following : [],
  },
  getters: {
    // 3. Create a getter to return the user's name
  },
  mutations: {
    // 2. Create a mutation to set the user's name
    user : (state, user) => state.user = user,
    followers : (state, followers) => state.followers = followers,
    following : (state, following) => state.following = following,
    REMOVE_FOLLOWING : (state, followingIndex) => state.following.splice(followingIndex, 1),
    ADD_FOLLOWING : (state,follower) => state.following.push(follower),
  },
  actions: {
    setUser({commit}, user) {
      commit('user', user)
    },
    setfollowers({commit}, followers) {
      commit('followers', followers)
    },
    setfollowing({commit}, following) {
      commit('following', following)
    },
  },
}
)
