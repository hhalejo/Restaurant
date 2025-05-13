<template>
  <div class="mesa-order text-black p-4 sm:p-6 max-w-7xl mx-auto" v-if="mesa">
    <!-- Formulario -->
    <form
  @submit.prevent="submitOrder"
  class="bg-white w-[500px] rounded-xl shadow-md p-6 border border-gray-200 max-w-4xl mx-auto"
>
  <!-- Fila: Categoría -->
  <div class="mb-4 flex flex-row items-end gap-4">
  <!-- Categoría -->
  <div class="flex flex-col">
    <label for="categoria" class="text-lg font-semibold mb-1">Categoría:</label>
    <select
      v-model="selectedCategoria"
      id="categoria"
      class="text-lg border border-gray-300 rounded px-4 py-2 h-[44px] focus:outline-none focus:ring focus:ring-blue-300"
    >
      <option disabled value="">Seleccione una categoría</option>
      <option
        v-for="cat in categorias"
        :key="cat.id"
        :value="cat.id"
      >
        {{ cat.nombre }}
      </option>
    </select>
  </div>

  <!-- Cantidad -->
  <div class="flex flex-col">
    <label for="quantity" class="text-lg font-semibold mb-1">Cantidad:</label>
    <input
      type="number"
      v-model.number="order.quantity"
      id="quantity"
      min="1"
      required
      class="w-[65px] text-lg border border-gray-300 rounded px-4 py-2 h-[44px] focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
</div>


  <!-- Fila: Producto y cantidad -->
  <div class="mb-4 flex flex-col md:flex-row md:items-end gap-4">
    <!-- Producto -->
    <div class="flex-1">
      <label for="product" class="block text-xl font-semibold mb-1">Producto:</label>
      <select
        v-model="order.product"
        id="product"
        required
        class="w-full text-lg border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option disabled value="">Seleccione un producto</option>
        <option
          v-for="product in productosFiltrados"
          :key="product.id"
          :value="product.nombre"
        >
          {{ product.nombre }} - ${{ product.precio }}
        </option>
      </select>
    </div>

    <!-- Cantidad -->
    
  </div>

  <!-- Descripción -->
  <div class="mb-4">
  <label for="descripcion" class="block text-lg font-semibold mb-1">Descripción del producto:</label>
  <p
    id="descripcion"
    class="bg-gray-100 text-gray-700 p-3 rounded border border-gray-300 h-auto text-sm overflow-hidden"
  >
    {{
      descripcionSeleccionada ||
      "Seleccione un producto para ver su descripción"
    }}
  </p>
</div>

  <!-- Botónes -->
  <div class="flex flex  items-center justify-between">
    <div class="mt-6 text-left">
    <button
      type="submit"
      class=" w-[180px] text-lg py-3 bg-gradient-to-t from-blue-500 to-blue-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2"
    >
      Agregar a la Orden
    </button>
  </div>
  <div class="mt-6 text-left">
    <IngresarOrden
    :mesa="mesa"
    :orden="orders"
    :total="total"
    @orden-guardada="orders = []"/>
  </div>
  </div>
</form>


    <!-- Resumen de la orden -->
    <div v-if="orders.length" class="order-summary mt-6">
      <h3 class="text-xl font-semibold mb-3 text-gray-800">
        Resumen de la Orden
      </h3>
      <ul class="space-y-2">
        <li
          v-for="(item, index) in orders"
          :key="index"
          class="flex items-center justify-between bg-white rounded-md shadow-sm p-3 border border-gray-200"
        >
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-900">
              {{ item.product }}
            </div>
            <div class="text-xs text-gray-600 text-red-500">
              Cantidad: {{ item.quantity }} · Total: ${{
                item.total.toFixed(2)
              }}
            </div>
          </div>
          <button
            @click="eliminarItem(index)"
            class="ml-3 text-red-500 hover:text-red-700 transition-colors duration-150"
            title="Eliminar"
          >
            <i class="fas fa-trash-alt text-sm"></i>
          </button>
        </li>
      </ul>

      <p class="mt-4 text-lg text-right text-black font-semibold">
        Total: ${{ total.toLocaleString("es-CO") }}
      </p>
    </div>
  </div>
</template>

<script>
import IngresarOrden from './IngresarOrden.vue';

export default {
  components: {
    IngresarOrden,
  },
  props: {
    mesa: {
      type: Number,
      required: true,
    },
  },
  data() {
  return {
    productos: [],
    categorias: [],
    selectedCategoria: "",
    order: {
      product: "",
      quantity: 1,
    },
    descripcionSeleccionada: "",
    orders: [],
  };
},
computed: {
  productosFiltrados() {
    if (!this.selectedCategoria) return this.productos;
    return this.productos.filter(p => p.categoria_id === this.selectedCategoria);
  },
  total() {
    return this.orders.reduce((sum, item) => sum + item.total, 0);
  },
},
mounted() {
  fetch("http://localhost:5000/api/productos")
    .then((res) => res.json())
    .then((data) => {
      this.productos = data;
    });

  fetch("http://localhost:5000/api/productos/categorias")
    .then((res) => res.json())
    .then((data) => {
      this.categorias = data;
    });
},
watch: {
  "order.product"(nuevoProducto) {
    const prod = this.productos.find((p) => p.nombre === nuevoProducto);
    this.descripcionSeleccionada = prod ? prod.descripcion : "";
  },
},

  methods: {
    submitOrder() {
      const product = this.productos.find(
        (p) => p.nombre === this.order.product
      );
      if (product) {
        const existingOrder = this.orders.find(
          (item) => item.product === this.order.product
        );

        if (existingOrder) {
          existingOrder.quantity += this.order.quantity;
          existingOrder.total = existingOrder.precio * existingOrder.quantity;
        } else {
          const total = product.precio * this.order.quantity;
          this.orders.push({
            product: this.order.product,
            quantity: this.order.quantity,
            precio: product.precio,
            descripcion: this.order.descripcion,
            total,
            mesa: this.mesa,
          });
        }

        console.log(`Orden registrada para la Mesa ${this.mesa}`);

        this.order.product = "";
        this.order.quantity = 1;
        this.order.descripcion = "";
      }
    },

    eliminarItem(index) {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este producto?")
      ) {
        this.orders.splice(index, 1);
      }
    },
  },
};
</script>
