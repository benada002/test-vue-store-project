<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated flipInX"
    leave-active-class="animated flipOutX"
  >
    <div class="cart-overview" v-if="cart.length > 0">
      <div
        class="back container-fluid d-flex justify-content-start align-items-center"
        @click="updateCartOpen()"
      >
        <svg width="20px" height="30px">
          <line x1="0" y1="16" x2="15" y2="0" style="stroke:#8e8e8e; stroke-width: 3px;"></line>
          <line x1="0" y1="14" x2="15" y2="30" style="stroke:#8e8e8e; stroke-width: 3px;"></line>
        </svg>
        Back
      </div>
      <div>
        <div class="container-fluid">
          <div
            class="row"
            v-for="(post, i) in cart"
            :key="post"
            :style="(i + 1) % 2 !== 0 ? '' : {backgroundColor: '#f2f2f2',}"
          >
            <div class="col-2 col-md-3">
              <img alt=" " :src="post.images[0]">
            </div>
            <div class="col-5 col-sm-5 col-md-5 col-lg-6">
              <router-link :to="`/details/${detailsLink(i)}`">
                <h5>{{ post.title }}</h5>
              </router-link>
              <p>Unit: {{post.price}}€</p>
              <p>
                <span class="total">Total:</span>
                {{post.price * post.quantity}}€
              </p>
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-lg-2">
              <span class="alert alert-danger" v-if="!inputIsNumber">Just numbers.</span>
              <form @submit.prevent="changeQuantity(i)">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    name="change-quantity"
                    v-model="changedQuantity[i]"
                    @keyup="justNumbers(i)"
                  >
                  <span class="input-group-btn">
                    <button class="btn btn-default" type="submit">Change</button>
                  </span>
                </div>
              </form>
            </div>
            <div class="col-2 col-md-1">
              <button type="button" class="btn btn-danger" @click="deleteItem(i)">
                <font-awesome-icon icon="times"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row des">
          <div class="col-12">
            <h4>Cart</h4>
            <hr>
          </div>
          <div class="col-12">
            <div class="row">
              <span class="col-10">Price:</span>
              <span class="col-2">{{priceAll()}}€</span>
            </div>
          </div>
          <button type="button" class="btn btn-success btn-lg btn-block" disabled>Checkout</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    changedQuantity: [],
    inputIsNumber: true,
  }),
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    posts() {
      return this.$store.state.posts;
    },
  },
  created() {
    this.changedQuantity = this.cart.map(({ quantity }) => quantity);
  },
  methods: {
    justNumbers(i) {
      const reg = new RegExp(/\D/g);
      const reg2 = new RegExp(/\d/g);

      if (!reg.test(this.changedQuantity[i])) {
        // eslint-disable-next-line no-return-assign
        return (this.inputIsNumber = true);
      }
      if (reg2.test(this.changedQuantity[i])) {
        this.changedQuantity[i] = this.changedQuantity[i].match(/\d/g).join('');
      } else {
        this.changedQuantity[i] = '';
      }
      // eslint-disable-next-line no-return-assign
      return (this.inputIsNumber = false);
    },
    priceAll() {
      return this.$store.state.cart.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    },
    deleteItem(value) {
      this.changedQuantity.splice(value, 1);
      this.$store.commit('deleteCartItem', value);
    },
    // eslint-disable-next-line consistent-return
    changeQuantity(i) {
      const quan = Number.parseInt(this.changedQuantity[i], 10);
      if (Number.isNaN(quan)) {
        // eslint-disable-next-line no-return-assign
        return (this.inputIsNumber = false);
      }
      if (quan === 0) {
        return this.deleteItem(i);
      }
      this.$store.commit('changeQuantity', { index: i, quantity: quan });
      this.changedQuantity[i] = '';
    },
    detailsLink(i) {
      return this.posts.findIndex((item) => item.title === this.cart[i].title);
    },
    updateCartOpen() {
      this.$store.dispatch('changeCartStatus');
    },
  },
};
</script>

<style lang="scss">
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
  width: 100%;
  text-align: left;
  overflow: auto;
  bottom: 0px;
  z-index: 999;
  -webkit-animation-name: zoomInDown;
  animation-name: zoomInDown;
  .row {
    margin-top: 0.2em;
    padding: 0.2em 0;
  }
  .des {
    background-color: #f2f2f2;
    border-radius: 3px;
    padding: 0.4em 0.5em;
    margin-top: 2em;
  }
  span {
    font-weight: 700;
  }
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

.total {
  color: red;
}

p {
  margin-bottom: 0.2rem;
}

.back {
  color: #535353;
  margin: 1.5em 0;
  cursor: pointer;
}
.back > * {
  margin-right: 0.4em;
}
</style>
