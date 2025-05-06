<template>
  <div class="min-h-screen flex justify-center items-center flex-col">
    <Navbar /> 
    <Secondarybar />
    <Contenedor />
    <main class="flex-1 p-4">
      <!-- Aquí iría el contenido principal, como las páginas -->
      <router-view /> 
    </main>
    <footer class="w-full bg-[#FF9500] text-center p-4">
      <p class="text-black">© 2025 Restaurante del Alejandro Ospina. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Secondarybar from './components/Secondarybar.vue'
import Contenedor from './components/ordenes/Contenedor.vue'

</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>
