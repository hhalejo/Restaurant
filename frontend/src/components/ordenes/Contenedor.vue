<template>
<div class="justify-center mt-3 text-4xl text-black  text-center flex"><strong>Ordenes</strong></div>
  <!-- Contenedor principal único -->
  <div class="w-full m-3 bg-gray-300 flex
              justify-center items-start
              rounded-lg py-3
              lg:w-[1400px]
              min-h-[600px] h-auto">
    <!-- Contenedor con dos contenedores internos -->
    
    <div class="flex flex-wrap justify-center mt-8 gap-5 w-full max-w-[1800px]">
      <!-- Contenedor izquierdo -->
      <div class="flex justify-center 
                 w-full sm:w-[90%] md:w-[80%] lg:w-[45%] xl:w-[47%]
                 min-h-[500px]
                 bg-gradient-to-t from-[#58ADE6] to-[#4680F6]
                 p-6 rounded-lg text-white text-4xl font-bold text-center">
        <MesasSelector @mesa-seleccionada="handleMesaSeleccionada" />
      </div>

      <!-- Contenedor derecho -->
      <div class="flex justify-center 
                 w-full sm:w-[90%] md:w-[80%] lg:w-[45%] xl:w-[47%]
                 min-h-[500px] 
                 bg-gradient-to-t from-[#995900] to-[#FF9500]
                 p-6 rounded-lg text-white text-4xl font-bold text-center">
        <MesaOrder :mesa="mesaSeleccionada" />
      </div>
    </div>
  </div>
</template>


<script setup>
import MesasSelector from './mesas/MesaSelector.vue'
import MesaOrder from './mesas/MesaOrder.vue'

import { ref } from 'vue'

// Variable para almacenar el número de la mesa seleccionada
const mesaSeleccionada = ref(null)

// Función que maneja el evento de selección de mesa
function handleMesaSeleccionada(mesa) {
  mesaSeleccionada.value = mesa
  console.log(`Mesa seleccionada: ${mesa}`)
}
</script>
