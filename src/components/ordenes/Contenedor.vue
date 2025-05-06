<template>
    <!-- Contenedor principal único -->
    <div class="w-full m-5 bg-gray-300 flex
                justify-center items-center 
                rounded-lg py-3
                lg:w-[1400px]
                lg:h-[550px]
                ">
    
      <!-- Contenedor con dos contenedores internos -->
      <div class="flex flex-wrap justify-center gap-5 w-full max-w-[1800px]">
    
        <!-- Contenedor izquierdo -->
        <div
          class="flex justify-center 
                 w-full sm:w-[90%] md:w-[80%] lg:w-[45%] xl:w-[47%]
                 min-h-[500px]
                 bg-gradient-to-t from-[#58ADE6] to-[#4680F6]
                 p-6 rounded-lg text-white text-4xl font-bold text-center">
          <MesasSelector />
        </div>
    
        <!-- Contenedor derecho -->
        <div
          class="flex justify-center 
                 w-full sm:w-[90%] md:w-[80%] lg:w-[45%] xl:w-[47%]
                 min-h-[500px] 
                 bg-gradient-to-t from-[#995900] to-[#FF9500]
                 p-6 rounded-lg text-white text-4xl font-bold text-center">
          <MesaOrder />
        </div>
    
      </div>
    </div>
  </template>
  
<script setup>

import MesasSelector from './mesas/MesaSelector.vue'
import MesaOrder from './mesas/MesaOrder.vue'

</script>