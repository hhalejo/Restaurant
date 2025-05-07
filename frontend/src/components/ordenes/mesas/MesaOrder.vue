<template>
  <div class="mesa-order text-black" v-if="mesa">
    <h2>Ordenar Productos - Mesa {{ mesa }}</h2>

    <form @submit.prevent="submitOrder">
      <div class="form-group mb-4 mt-4">
        <label for="product">Producto:</label>
        <select v-model="order.product" id="product" required>
          <option disabled value="">Seleccione un producto</option>
          <option
            v-for="product in products"
            :key="product.id"
            :value="product.name"
          >
            {{ product.name }} - ${{ product.price }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="quantity">Cantidad:</label>
        <input
          type="number"
          v-model.number="order.quantity"
          id="quantity"
          min="1"
          required
        />
      </div>

      <button
        type="submit"
        class="mt-4 w-full sm:w-auto
               px-6 py-2 bg-gradient-to-t from-[#58ADE6] to-[#4680F6]
                hover:bg-orange-600 text-white 
                font-semibold rounded-lg shadow-md 
                transition duration-300 ease-in-out 
                focus:outline-none focus:ring-2
                "
      >
        Agregar a la Orden
      </button>
    </form>

    <div v-if="orders.length" class="order-summary color">
      <h3>Resumen de la Orden</h3>
      <ul
        class="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <li
          v-for="(item, index) in orders"
          :key="index"
          class="order-card w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl m-2"
        >
          <div class="order-card-content flex flex-col justify-between h-full">
            <div class="order-info">
              <h4 class="text-lg font-semibold text-gray-800">
                {{ item.product }}
              </h4>
              <p class="text-sm text-gray-600">
                {{ item.quantity }} x ${{
                  (item.total / item.quantity).toFixed(2)
                }}
              </p>
              <p class="text-base font-bold text-gray-900">
                <strong>Total:</strong> ${{ item.total.toFixed(2) }}
              </p>
              <button
                @click="eliminarItem(index)"
                class="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow-md transition duration-300 ease-in-out"
              >
                <i class="fas fa-trash-alt mr-2"></i> Eliminar
              </button>
            </div>
          </div>
        </li>
      </ul>
      <p class="mt-5"><strong>Total:</strong> ${{ total }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mesa: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      products: [], // Lista de productos vacía al inicio
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
  mounted() {
    // Cargar los productos desde el servidor cuando el componente se monta
    fetch('http://localhost:5000/api/productos')
      .then(res => res.json())
      .then(data => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  },
  methods: {
    submitOrder() {
      const product = this.products.find((p) => p.name === this.order.product);
      if (product) {
        const total = product.price * this.order.quantity;
        this.orders.push({
          ...this.order,
          total,
          mesa: this.mesa, // Ahora estamos guardando la mesa seleccionada también
        });

        console.log(`Orden registrada para la Mesa ${this.mesa}`);

        // Reset form
        this.order.product = "";
        this.order.quantity = 1;
      }
    },
    eliminarItem(index) {
      if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        this.orders.splice(index, 1);
      }
    },
  },
};
</script>
