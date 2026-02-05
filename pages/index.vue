<template>
  <div>
    <LoadingSpinner v-if="pending" />
    <ErrorMessage
      v-else-if="error"
      message="Failed to load. Please check your connection and try again."
    />
    <ErrorMessage
      v-else-if="characters.length === 0 && searchFromRoute"
      message="No characters found. Try a different search."
    />
    <CharacterList
      v-else
      :characters="characters"
      :info="info"
      :current-page="currentPage"
      @update:page="goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import type { Character, ApiResponse } from '~/types'

const route = useRoute()
const router = useRouter()
const { getCharacters } = useRickAndMortyApi()

const currentPage = computed(() => Number(route.query.page) || 1)
const searchFromRoute = computed(() => (route.query.name as string) || '')

const { data, pending, error } = await useAsyncData<ApiResponse<Character>>(
  () => `characters-${currentPage.value}-${searchFromRoute.value}`,
  () => getCharacters(currentPage.value, searchFromRoute.value),
  { watch: [currentPage, searchFromRoute] }
)

const characters = computed<Character[]>(() => data.value?.results ?? [])
const info = computed(() => data.value?.info ?? { count: 0, pages: 0, next: null, prev: null })

const goToPage = (page: number) => {
  router.push({
    path: '/',
    query: {
      ...route.query,
      page: page > 1 ? page : undefined
    }
  })
}
</script>
