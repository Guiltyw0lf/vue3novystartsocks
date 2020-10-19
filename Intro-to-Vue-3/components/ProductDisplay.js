app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array
  },
    
  },
  template:
    /*html*/
    ` 
    <div id="myDIV" class="display-none">
      <div class="kosik">
      <h1>Vas kosik obsahuje: </h1>
      <h2 v-for="item in cart" >
        {{ item.name }}
        {{ item.price }} ,-       
      </h2>
         
          
      <button class="button" v-on:click="emptyCart">
      empty cart
      </button>

      <button class="button" v-on:click="sendEmail">
      Objednat
      </button>
      </div>
    </div>  
    
    
    
    <div class="topnav-flex">
      <div class="topnav" v-for="product in products">
      <a :href="linkTo(product.name)">{{ product.name}}</a>
     </div>
    </div>


  <div class="product-display">
    <div style="padding-left:16px" v-for="product in products" :id="product.name">
      <div class="product-container">   

        <div class="product-image">
          <img :src="getImage(product)"/>
        </div>

          <div class="product-info">     
          <h1> {{ brand }} {{ product.name }} </h1>

         <p v-if="inStock(product)">In Stock</p>
         <p v-else>Out of Stock</p>
         <p>Shipping: {{ shipping }}</p>
         <ul>
         <li>{{ product.description }}</li>
         </ul>


       <div class="circle-row">
        <div 

          v-for="(kombinace, index) in product.variants" 
         :key="kombinace.id_variant" 
         @mouseover="updateVariant(product,index)"     
         class="color-circle" 
         :style="{ backgroundColor: kombinace.attributes.color}"

         >
          <div v-for="(attribute) in kombinace.attributes">
          </div> 
        </div>

        </div>
        <div class="buttons">
       <div class="circle-row">
       <button class="button" v-on:click="addToCart(product.variants[product.selectedVariant])" 
       :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
        >
        Add to cart
       </button>
       <button 
        class="button" 
        :class="{ disabledButton: !inStock }" 
        :disabled="!inStock" 
        v-on:click="removeFromCart(product.variants[product.selectedVariant])">
         Remove from Cart
         </button>
          </div>
          <div class="circle-row">


            <button class="button" v-on:click="emptyCart" 
            :disabled="!inStock"
           :class="{ disabledButton: !inStock }"
            >
               Empty cart
              </button>


              <button 
              class="button" 
              :class="{ disabledButton: !inStock }" 
              :disabled="!inStock" 
              v-on:click="sendEmail">
              Order
              </button>
              </div>
        </div>

    

  
      </div>

        </div> 
    </div> 
      <div>

      </div>
  </div> 
  `,
  data() {
    return {
      brand: 'shop',
      products: [{
          id_product: 1,
          name: 'Ponozky',
          description: 'Toto je vysoce kvalitni neoprenova ponozka',
          selectedVariant: 0,
          details: ['80% cotton', '20% polyester', 'Gender-neutral'],
          variants: [{
              id_variant: 1001,
              name: 'Green sock',
              image: './assets/images/socks_green.jpg',
              attributes: {
                color: 'green',
                stav: 'repas'
              },
              price: 149,
              quantity: 20,
            },
            {
              id_variant: 1002,
              name: 'Blue sock',
              image: './assets/images/socks_blue.jpg',
              attributes: {
                color: 'blue',
                stav: 'derave'

              },
              price: 199,
              quantity: 20,
            },
          ]
        },
        {
          id_product: 2,
          name: 'Penezenky',
          description: 'Toto je vysoce kvalitni kozena penezenka',
          selectedVariant: 0,
          details: ['90% leather', '10% fasteners'],
          variants: [{
              id_variant: 2001,
              name: 'Cerna penezenka',
              image: './assets/images/penezenkablack.jpg',
              attributes: {
                color: 'black'
              },
              price: 249,
              quantity: 30,
            },
            {
              id_variant: 2002,
              name: 'Hneda penezenka',
              image: './assets/images/penezenkabrown.jpg',
              attributes: {
                color: 'brown'
              },
              price: 269,
              quantity: 35,
            },
            {
              id_variant: 2003,
              name: 'Cervena penezenka',
              image: './assets/images/penred.jpg',
              attributes: {
                color: 'red'
              },
              price: 269,
              quantity: 40,
            }
          ]
        },
        {
          id_product: 3,
          name: 'Tricka',
          description: 'Toto je vysoce kvalitni latene tricko',
          selectedVariant: 0,
          details: ['75% wool', '25% plastic'],
          image: './assets/images/twhite.jpg',
          variants: [{
              id_variant: 3001,
              name: 'tricko M',
              attributes: {
                color: 'white',
                size: 'M'
              },
              price: 349,
              quantity: 45,
            },
            {
              id_variant: 3002,
              name: 'tricko L',
              attributes: {
                color: 'white',
                size: 'L'
              },
              price: 359,
              quantity: 50,
            },
            {
              id_variant: 3003,
              name: 'tricko XL',
              attributes: {
                color: 'white',
                size: 'XL'
              },
              price: 389,
              quantity: 55,
            },
          ]
        },
        {
          id_product: 4,
          name: 'Prdel',
          quantity: 145,
          image: './assets/images/twhite.jpg',  
          variants: [{   
            id_variant: 4001,
            name: 'Prdel XXL',
            attributes: {
              color: 'white',
              size: 'XXL'
            },
            price: 389,
            quantity: 55,
          },
        ]    
          
        },
        {
          id_product: 5,
          name: 'Pica',
          image: './assets/images/twhite.jpg',  
          variants: [{   
            id_variant: 5001,
            name: 'Pica XXL',
            attributes: {
              color: 'white',
              size: 'XXL'
            },
            price: 2389,
            quantity: 55,
          },
        ] 
        },
        {
          id_product: 6,
          name: 'Hovno',
          image: './assets/images/twhite.jpg',  
          variants: [{   
            id_variant: 6001,
            name: 'Hovno XXXL',
            attributes: {
              color: 'white',
              size: 'XXXL'
            },
            price: 3999,
            quantity: 55,
          },
        ] 
        },
      ]
    }

  },
  methods: {
    addToCart(variant) {
      this.$emit('add-to-cart', variant )
    },
    removeFromCart(variant) {
      this.$emit('remove-from-cart', variant)
  },
    updateProduct(index) {
      this.selectedVariant = index
    },
    emptyCart() {
      this.$emit('empty-cart', this.variant)
  },
    linkTo(where) {
      return '#' + where;
    },
    getImage(product) {
      if (product.image) {
        return product.image
      } else if (product.variants) {
        return product.variants[product.selectedVariant].image
      } else {
        return src = "./assets/images/noimg.jpg"
      }
    },
    inStock(product) {
      if (product.quantity) {
        return product.quantity
      } else if (product.variants && product.variants[product.selectedVariant]) {
        return product.variants[product.selectedVariant].quantity
      } else {
        return 0
      }
    },
    updateVariant(product,index) {
      product.selectedVariant = index
    },
        
    sendEmail() {
      let total = 0;
      Object.values(this.cart).forEach(function(product) {
        console.log(product)

        total += product.price;
        
      });      
      alert("vase objednavka byla odeslana");
      let html = 'Vazeny zakazniku vase objednavka ';
      this.cart.forEach((item) => {
        html = `${html}<hr>Name: ${item.name}<br>Kod: ${item.id_variant}<br>Cena: ${item.price}`;
         })    
                   axios.post("https://mandrillapp.com/api/1.0/messages/send.json", JSON.stringify({
                 key: "FH5wdRhRxPYJIilzrdl36g",
                 message: {
                   
                     html: html,
                     text: "Toto je testovaci objednavka",
                     subject: "potvrzeni objednavky",
                     from_email: "duch@vanoce.cz",
                     from_name: "Vue Mastery Socks",
                     to: [{
                         email: email,
                         name: "Pitomci z bittrendu",
                         type: "to"
                     }],
                     headers: {
                         ReplyTo: "duch@vanoce.cz"
                     },
                     important: false
                 }
             }), {
                 "headers": {
                     "content-type": "application/json",
                 },
             });
    },
    cena() {
      return this.variants[this.selectedVariant].price
  },

  
     

  },
  computed: {
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    },
    


    
  },
  
})