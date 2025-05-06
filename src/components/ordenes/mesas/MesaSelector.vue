<template>
  <div class="w-full">
    <h2 class="text-4xl font-semibold mb-6 text-center text-white">Selecciona una Mesa</h2>

    <!-- Grilla de botones -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full">
      <button
        v-for="n in 15"
        :key="n"
        @click="seleccionarMesa(n)"
        class="bg-white text-gray-800 py-6 px-4
               rounded-xl shadow-md transform 
               transition-all duration-300 
               ease-in-out hover:scale-105 
               hover:shadow-lg hover:bg-[#f9f9f9] 
               active:scale-95 flex items-center 
               justify-center space-x-2">
        <svg class="w-6 h-6 text-[#FF9500]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v2H3V5zm0 4h14v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
        <span class="font-medium text-lg">Mesa {{ n }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['mesa-seleccionada'])

function seleccionarMesa(numero) {
  emit('mesa-seleccionada', numero)
  console.log(`Mesa ${numero} seleccionada`)
  
}
</script>
