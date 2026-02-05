<template>
  <div class="mx-auto">
    <div class="grid md:grid-cols-1 gap-8">
      <EpisodesSection :episodes="episodes" />
      <LocationsSection
        :character="character"
        :current-location="currentLocation"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, Episode, Location } from '~/types'

defineProps<{
  character: Character
  episodes: Episode[]
  currentLocation: Location | null
}>()
</script>
