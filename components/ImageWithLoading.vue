<template>
  <div :class="['relative overflow-hidden rounded-[8px]', containerClass]">
    <div
      v-show="!loaded"
      class="absolute inset-0 bg-dark-600 animate-pulse"
      aria-hidden="true"
    />
    <img
      :src="src"
      :alt="alt"
      :class="[imgClass, 'transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0']"
      :loading="loading"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    containerClass?: string
    imgClass?: string
    loading?: 'lazy' | 'eager'
  }>(),
  { loading: 'lazy', containerClass: '', imgClass: '' }
)

const loaded = ref(false)

watch(() => props.src, () => {
  loaded.value = false
})
</script>
