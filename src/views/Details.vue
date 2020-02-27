<template>
  <div class="about">
    <div class="container-fluid">
      <div class="row products">
        <div class="col-lg-4">
          <img alt=" " :src="post.images[0]">
        </div>
        <div class="col-lg-8">
          <h2>{{post.title}}</h2>
          <p>{{post.price}}€</p>
          <form
            @submit.prevent="set()"
            v-if="cart.findIndex(item => item.title === post.title) === -1"
          >
            <div class="form-group mx-sm-3 mb-2">
              <div class="input-group">
                <label for="quantity">Quantity:</label>
                <input
                  v-validate="'numeric|min_value:1|required'"
                  type="text"
                  id="quantity"
                  name="quantity"
                  v-model="quantity"
                  @focus="valueFocus('quantity')"
                  @blur="valueBlur('quantity')"
                  class="form-control"
                >
                <span class="input-group-btn">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="errors.items.length > 0"
                  >Add to cart</button>
                </span>
              </div>
            </div>
            <div v-if="errors.first('quantity')" class="alert alert-danger" role="alert">
              <span>{{ errors.first('quantity') }}</span>
            </div>
          </form>
          <div v-if="cart.findIndex(item => item.title === post.title) !== -1">
            <div
              class="alert alert-success"
              role="alert"
            >This item is already in your cart. To change the quantity, or delete it, go to the cart.</div>
          </div>
        </div>
      </div>
      <div class="row products">
        <div class="col-lg-12 text">
          <p>{{post.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data: () => ({
    quantity: 1
  }),
  computed: {
    post() {
      return this.$store.state.posts[this.$route.params.i];
    },
    cart() {
      return this.$store.state.cart;
    }
  },
  methods: {
    set() {
      this.$store.dispatch('addCart', {
        item: this.$route.params.i,
        quantity: Number.parseInt(this.quantity)
      });
    },
    valueFocus(model) {
      this[model] = '';
    },
    valueBlur(model) {
      if (this[model] < 1) {
        this[model] = 1;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-bottom: 1.5%;
  box-sizing: border-box;
  padding-bottom: 1.5%;
  border-bottom: 1px solid cornflowerblue;
  img {
    width: 100%;
    height: auto;
  }

  h2 {
    text-align: left;
  }

  p {
    text-align: left;
  }
}
</style>
