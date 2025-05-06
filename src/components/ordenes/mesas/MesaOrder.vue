<template>
    <div class="mesa-order text-black">
      <h2>Ordenar Productos - Mesa {{ mesa }}</h2>
  
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="product">Producto:</label>
          <select v-model="order.product" id="product" required>
            <option disabled value="">Seleccione un producto</option>
            <option v-for="product in products" :key="product.id" :value="product.name">
              {{ product.name }} - ${{ product.price }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="quantity">Cantidad:</label>
          <input type="number" v-model.number="order.quantity" id="quantity" min="1" required />
        </div>
  
        <button type="submit">Agregar a la Orden</button>
      </form>
  
      <div v-if="orders.length" class="order-summary">
        <h3>Resumen de la Orden</h3>
        <ul>
          <li v-for="(item, index) in orders" :key="index">
            {{ item.quantity }} x {{ item.product }} - ${{ item.total }}
          </li>
        </ul>
        <p><strong>Total:</strong> ${{ total }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      mesa: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        products: [
          { id: 1, name: "Pizza", price: 10 },
          { id: 2, name: "Hamburguesa", price: 8 },
          { id: 3, name: "Ensalada", price: 6 },
        ],
        order: {
          product: "",
          quantity: 1,
        },
        orders: [],
      };
    },
    computed: {
      total() {
        return this.orders.reduce((sum, item) => sum + item.total, 0);
      },
    },
    methods: {
      submitOrder() {
        const product = this.products.find((p) => p.name === this.order.product);
        if (product) {
          const total = product.price * this.order.quantity;
          this.orders.push({
            ...this.order,
            total,
            mesa: this.mesa // Puedes guardar también la mesa
          });
  
          console.log(`Orden registrada para la Mesa ${this.mesa}`);
  
          // Reset form
          this.order.product = "";
          this.order.quantity = 1;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .mesa-order {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f4f4f4;
    border-radius: 10px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1.2rem;
    background-color: #ff9500;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #e28300;
  }
  
  .order-summary {
    margin-top: 2rem;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
  }
  </style>
  