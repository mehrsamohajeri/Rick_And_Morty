<template>
  <section>
    <h2 class="flex items-center gap-2 text-xl font-semibold text-white mb-4">
      <img :src="episodeIcon" alt="" class="w-5 h-4" aria-hidden="true" />
      Episodes
    </h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <li
        v-for="episode in episodes"
        :key="episode.id"
        class="p-4 rounded-[16px] bg-episode-background"
      >
        <p class="font-bold text-white">{{ episode.name }}</p>
        <p class="text-episode text-xs font-medium mt-2">{{ episode.episode }}</p>
        <p class="text-gray-500 text-xs mt-2">{{ episode.air_date }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Episode } from '~/types'
import episodeIcon from '~/assets/icons/episode-icon.svg'

defineProps<{
  episodes: Episode[]
}>()
</script>
