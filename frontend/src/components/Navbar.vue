<template>
    <header class="w-full">
      <nav class="w-full p-2 shadow-md bg-gradient-to-r from-[#58ADE6] to-[#4680F6]">
        <div class="flex justify-between items-center">
          
          <div class="text-white text-xl font-bold ml-4">
            {{ restaurantName }}
          </div>
          
          <!-- Botones a la derecha -->
          <div class="flex items-center">
            <!-- Botón de usuario -->
            <button class="bg-[#FF9500] text-black py-2 px-4 rounded hover:bg-[#FF7F00]" value="usuario">
              Usuario
            </button>
  
            <!-- Botón de configuración (ícono de piñón) -->
            <button class="text-white text-2xl ml-4 px-4 hover:text-gray-200">
              <i class="fas fa-cogs"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
    // Lógica para hacer el nombre del restaurante configurable
    const restaurantName = "Restaurante del  Alejo"; // Aquí puedes cambiar el nombre
  </script>
  
  <style scoped>
    /* Si deseas agregar estilos personalizados adicionales */
  </style>
  