<template>
  <div>
    <LoadingSpinner v-if="pending" />
    <ErrorMessage
      v-else-if="!character"
      message="Character not found."
    />
    <CharacterDetailContent
      v-else
      :character="character"
      :episodes="episodes"
      :current-location="currentLocation"
    />
  </div>
</template>

<script setup lang="ts">
import type { Character, Episode, Location } from '~/types'

const route = useRoute()
const { getCharacter, getEpisodes, getLocations, extractIdFromUrl } = useRickAndMortyApi()

const id = computed(() => route.params.id as string)

const { data: character, pending, error } = await useAsyncData<Character | null>(
  `character-${id.value}`,
  () => getCharacter(id.value)
)

const episodeIds = computed(() => {
  if (!character.value?.episode) return []
  return character.value.episode
    .map(extractIdFromUrl)
    .filter(Boolean)
})

const locationIds = computed(() => {
  if (!character.value) return []
  const ids: number[] = []
  if (character.value.location?.url) {
    const id = extractIdFromUrl(character.value.location.url)
    if (id && !ids.includes(id)) ids.push(id)
  }
  return ids
})

const { data: episodesData } = await useAsyncData(
  `episodes-${id.value}`,
  () => getEpisodes(episodeIds.value),
  { watch: [episodeIds] }
)

const episodes = computed<Episode[]>(() => {
  const data = episodesData.value
  if (!data) return []
  return Array.isArray(data) ? data : [data]
})

const { data: locationsData } = await useAsyncData(
  `locations-${id.value}`,
  () => getLocations(locationIds.value),
  { watch: [locationIds] }
)

const locationsList = computed<Location[]>(() => {
  const data = locationsData.value
  if (!data) return []
  return Array.isArray(data) ? data : [data]
})

const currentLocation = computed<Location | null>(() => {
  if (!character.value?.location?.url) return null
  const locId = extractIdFromUrl(character.value.location.url)
  return locationsList.value.find(l => l.id === locId) ?? null
})

useHead({
  title: character.value
    ? `${character.value.name} - Rick and Morty`
    : pending.value
      ? 'Loading... - Rick and Morty'
      : 'Character not found - Rick and Morty'
})
</script>
