<template>
  <li
    class="bg-white shadow-lg p-4 rounded-lg flex justify-between w-full mb-3"
  >
    <div class="flex items-center">
      <img class="w-12 h-12 rounded-full" :src="boss.image" :alt="boss.nome" />
      <div class="ml-3">
        <p class="text-gray-900 font-sans tracking-wide text-sm">
          {{ boss.nome }} 
        </p>
        <p
          v-if="boss.status === 'Morto'"
          class="text-gray-900 font-sans tracking-wide text-sm"
        >
          {{ boss.dtMorte }} - {{ boss.dtSpawn }}
        </p>
        
      </div>
    </div>
    <div class="flex items-center">
      <badge :color="boss.statusColor">{{ boss.status }}</badge>
    </div>
  </li>
</template>
<script>
import Badge from "./Badge";
export default {
  components: {
    Badge
  },
  props: {
    boss: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
