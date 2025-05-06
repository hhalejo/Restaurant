<!-- components/SecondaryBar.vue -->
<template>
    <div class="w-full bg-[#FF9500] p-1">
      <ul class="flex justify-center space-x-8 text-white">
        <!-- Botón Home -->
        <li>
          <button class="flex items-center space-x-2 text-black hover:bg-black hover:text-white px-4 py-2 rounded transition-all duration-300 ease-in-out">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </button>
        </li>
  
        <!-- Botón Ordenar en Restaurante -->
        <li>
          <button class="flex items-center space-x-2 text-black hover:bg-black hover:text-white px-4 py-2 rounded transition-all duration-300 ease-in-out">
            <i class="fas fa-utensils"></i>
            <span>Ordenar</span>
          </button>
        </li>
  
        <!-- Botón Pago de Pedido -->
        <li>
          <button class="flex items-center space-x-2 text-black hover:bg-black hover:text-white px-4 py-2 rounded transition-all duration-300 ease-in-out">
            <i class="fas fa-credit-card"></i>
            <span>Pago</span>
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  // No se necesita lógica adicional, solo es un componente de presentación
  </script>
  
  <style scoped>
  /* Si deseas más personalización, puedes agregar más estilos aquí */
  </style>
  