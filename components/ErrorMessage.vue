<template>
  <div class="text-center py-20 text-red-400">
    <p class="text-lg">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>
