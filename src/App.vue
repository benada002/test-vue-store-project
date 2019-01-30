<template>
  <div id="app" class="container">
    <LoadingBar v-if="loading"/>
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex flex-row-reverse">
      <div class="cart-details" @click="updateCartStatus()">
        <font-awesome-icon icon="shopping-cart"/>
        <span class="badge badge-pill badge-danger">{{cart.length}}</span>
      </div>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbar01"
        aria-controls="navbarsExample08"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar01">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Products</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <cart v-if="cartOpen"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: () => ({
    changedQuantity: []
  }),
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    posts() {
      return this.$store.state.posts;
    },
    cart() {
      return this.$store.state.cart;
    },
    cartOpen() {
      return this.$store.state.cartOpen;
    }
  },
  methods: {
    updateCartStatus() {
      this.$store.dispatch('changeCartStatus');
    },
    closeCart() {
      this.$store.commit('updateCartOpen', false);
    },
    deleteItem(value) {
      this.changedQuantity.splice(value, 1);
      this.$store.commit('deleteCartItem', value);
    },
    changeQuantity(i) {
      this.$store.dispatch('changeQuan', {
        index: i,
        quantity: Number.parseInt(this.changedQuantity[i])
      });
      // this.$forceUpdate()
    },
    detailsLink(i) {
      return this.posts.findIndex(item => item.title === this.cart[i].title);
    }
  },
  created() {
    this.$store.dispatch('loadingData'); // dispatch loading

    if (typeof Storage !== 'undefined') {
      if (!localStorage.cart) {
        console.log('notlocal');
        localStorage.setItem('cart', JSON.stringify([]));
      }
      this.$store.state.cart = JSON.parse(localStorage.cart);
      console.log('local');
    }
  },
  mounted() {
    this.$el.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        if (this.cartOpen) {
          this.updateCartStatus();
        }
      }
    });
  }
};
</script>

<style lang="scss">
@import url('./styles/style.scss');

body {
  background-color: #f2f2f2;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 90px;
}

.navbar {
  border-bottom: 4px solid cornflowerblue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.43);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.43);
  a,
  .navbar-toggler {
    color: cornflowerblue !important;
    font-weight: 700;
  }
}

.cart-details {
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.44);
  padding: 0.5em 0.3em;
  cursor: pointer;
}

.cart-overview {
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.44);
  padding: 0.5em 0.3em;
  background-color: #fff;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  position: fixed;
  top: 58px;
  right: 0;
  min-width: 25%;
  text-align: left;
  overflow: auto;
  bottom: 0px;
  z-index: 999;
  -webkit-animation-name: zoomInDown;
  animation-name: zoomInDown;
  img {
    width: 100%;
    height: auto;
  }
}

.input-group-btn {
  .btn {
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
  }
}
</style>
