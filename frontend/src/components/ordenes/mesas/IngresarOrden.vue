<!-- components/BotonOrdenar.vue -->
<template>
    <button
      type="button"
      @click="ordenar"
      class="w-[180px] text-lg py-3 bg-gradient-to-t from-blue-500 to-blue-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2"
    >
      Ordenar
    </button>
  </template>
  
  <script>
  export default {
    name: "BotonOrdenar",
    props: {
      mesa: {
        type: Number,
        required: true,
      },
      orden: {
        type: Array,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    methods: {
      ordenar() {
        if (!this.orden.length) {
          alert("No hay productos en la orden.");
          return;
        }
  
        const payload = {
          mesa: this.mesa,
          orden: this.orden,
          total: this.total,
        };
  
        fetch("http://localhost:5000/api/ordenes/guardar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.message);
            this.$emit("orden-guardada"); // Notifica al padre si deseas limpiar o cerrar algo
          })
          .catch((err) => {
            console.error("Error al guardar orden:", err);
            alert("Error al guardar orden.");
          });
      },
    },
  };
  </script>
  