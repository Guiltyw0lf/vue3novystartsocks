const app = Vue.createApp({
  data() {
    return {
      premium: true,
      cart: []
    }
  },
  methods: {
    updateCart(variant) {
      this.cart.push(variant)      
    },

    removeCart(variant) {
      this.cart = this.cart.filter((item) => {
        return item.id_variant !== variant.id_variant
      });
  }, 

  emptyCart() {
    this.cart.splice(0, this.cart.length);
 }, 

  }
})
