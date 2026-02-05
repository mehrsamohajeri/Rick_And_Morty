<template>
  <section>
    <h2 class="flex items-center gap-2 text-xl font-semibold text-white mb-4">
      <img :src="locationIcon" alt="" class="w-6 h-6" aria-hidden="true" />
      Locations
    </h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <li
        v-if="character.location?.name"
        class="p-4 rounded-[16px] bg-episode-background"
      >
        <p class="text-white font-bold">{{ character.location.name }}</p>
        <p class="text-episode text-xs font-medium mt-2">{{ currentLocation?.type ?? 'unknown' }}</p>
        <p class="text-gray-500 text-xs mt-2">{{ currentLocation?.dimension || 'unknown' }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Character, Location } from '~/types'
import locationIcon from '~/assets/icons/location-icon.svg'

defineProps<{
  character: Character
  currentLocation: Location | null
}>()
</script>
