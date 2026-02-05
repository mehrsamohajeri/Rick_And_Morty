<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-12">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <Pagination
      v-if="info.pages > 1"
      :current-page="currentPage"
      :total-pages="info.pages"
      @update:page="$emit('update:page', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types'

defineProps<{
  characters: Character[]
  info: { count: number; pages: number; next: string | null; prev: string | null }
  currentPage: number
}>()

defineEmits<{
  'update:page': [page: number]
}>()
</script>
