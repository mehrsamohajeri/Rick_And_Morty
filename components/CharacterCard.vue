<template>
  <NuxtLink
    :to="`/character/${character.id}`"
    class="block rounded-[16px] overflow-hidden border border-dark-400 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
  >
    <div class="aspect-square overflow-hidden p-3">
      <ImageWithLoading
        :src="character.image"
        :alt="character.name"
        container-class="w-full h-full"
        img-class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg text-white truncate">
        {{ character.name }}
      </h3>
      <div class="flex items-center gap-2 mt-2">
        <span 
          class="w-2 h-2 rounded-full flex-shrink-0"
          :class="statusColor"
        />
        <span class="text-sm text-white truncate capitalize">
          {{ character.status }}-{{ character.species }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Character } from '~/types'

const props = defineProps<{
  character: Character
}>()

const statusColor = computed(() => {
  const status = (props.character?.status || '').toLowerCase()
  if (status === 'alive') return 'bg-status-alive'
  if (status === 'dead') return 'bg-status-dead'
  return 'bg-status-unknown'
})
</script>
