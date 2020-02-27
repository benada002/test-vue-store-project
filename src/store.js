import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    cart: [],
    cartOpen: false,
    loading: true,
    loadingProcess: 0
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },

    updateCartOpen(state, open) {
      state.cartOpen = open;
    },

    updateLoading(state, loading) {
      state.loading = loading;
    },

    updateLoadingProcess(state, loadingProcess) {
      state.loadingProcess = loadingProcess;
    },
    addCartItem(state, item) {
      Vue.set(state.cart, state.cart.length, item);
      localStorage.cart = JSON.stringify(state.cart);
    },

    deleteCartItem(state, cartItem) {
      Vue.delete(state.cart, cartItem);
      localStorage.cart = JSON.stringify(state.cart);
    },

    changeQuantity(state, quan) {
      Vue.delete(state.cart[quan.index], 'quantity');
      Vue.set(state.cart[quan.index], 'quantity', Number.parseInt(quan.quantity));
      localStorage.cart = JSON.stringify(state.cart);
      state.cart[quan.index].quantity = Number.parseInt(quan.quantity);
    }
  },
  actions: {
    loadingData({ commit }) {
      commit('updateLoading', true);
      api.get('http://localhost:8080/api/10').then(res => {
        console.log(res.data);
        commit('updatePosts', res.data);
        commit('updateLoading', false);
      });
    },

    addCart({ commit, state }, item) {
      const { description, ...cartItem } = state.posts[item.item];
      cartItem.quantity = item.quantity;
      commit('addCartItem', cartItem);
    },

    changeCartStatus({ commit, state }) {
      commit('updateCartOpen', !state.cartOpen);
    }
  }
});
