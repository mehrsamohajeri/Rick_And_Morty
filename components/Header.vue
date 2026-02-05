<template>
    <header
        class="sticky top-0 z-50 bg-gradient-to-r from-dark-500 from-[10%] to-dark-800 to-[35%] overflow-hidden">
        <div class="container mx-auto px-4 py-4">
            <div>
                <div
                    class="absolute hidden sm:block md:left-[210px] md:w-[250px] top-1 md:h-[300px] -z-10 rounded-full blur-2xl pointer-events-none"
                    style="background: radial-gradient(ellipse 100% 100% at 50% 50%, rgb(178,223,40) 0%, rgba(178,223,40,0.26) 40%, rgba(151,206,76,0.25) 65%, transparent 85%)"
                />
                <div class="flex flex-col gap-4">
                    <div class="relative inline-flex shrink-0">
                        <NuxtLink to="/" class="relative z-10">
                            <img
                                src="/logo.png"
                                alt="Rick & Morty"
                                class="h-14 md:h-20 w-auto object-cover"
                            />
                        </NuxtLink>
                    </div>
                    <div v-if="!isCharacterPage" class="flex-1 w-full">
                        <SearchBar
                            v-model="searchQuery"
                            @search="handleSearch"
                        />
                    </div>
                    <NuxtLink v-if="isCharacterPage" to="/"
                              class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 flex-1 min-w-0 group pb-3 md:pb-12">
                        <div class="flex-shrink-0">
                            <ImageWithLoading
                                v-if="character"
                                :src="character.image"
                                :alt="character.name"
                                container-class="w-[180px] h-[180px] md:w-[240px] md:h-[240px]"
                                img-class="w-[180px] h-[180px] md:w-[240px] md:h-[240px] object-cover"
                                loading="eager"
                            />
                            <div v-else
                                 class="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-[8px] bg-dark-600 animate-pulse"/>
                        </div>
                        <div class="min-w-0 md:ml-6">
                            <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-white truncate">
                                {{ character?.name ?? '...' }}
                            </h1>
                            <div v-if="character" class="flex items-center gap-2 mt-3">
                            <span
                                class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                :class="headerStatusColor"
                            />
                                <span class="text-sm md:text-base text-gray-300 truncate">
                                {{ character.status }} - {{ character.species }}
                            </span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import type { Character } from '~/types'

const route = useRoute()
const router = useRouter()
const { getCharacter } = useRickAndMortyApi()

const isCharacterPage = computed(() => /^\/character\/[^/]+$/.test(route.path))

const characterId = computed(() => {
  const match = route.path.match(/^\/character\/([^/]+)$/)
  return match ? match[1] : null
})

const { data: character } = await useAsyncData<Character | null>(
    () => `header-character-${characterId.value}`,
    () => characterId.value ? getCharacter(characterId.value!) : null,
    {watch: [characterId]}
)

const headerStatusColor = computed(() => {
    const status = (character.value?.status || '').toLowerCase()
    if (status === 'alive') return 'bg-status-alive'
    if (status === 'dead') return 'bg-status-dead'
    return 'bg-status-unknown'
})

const searchFromRoute = computed(() =>
    route.path === '/' ? (route.query.name as string) || '' : ''
)

const searchQuery = ref(searchFromRoute.value)

watch(searchFromRoute, (v) => {
    searchQuery.value = v
})

const handleSearch = (value?: string) => {
    const query = value ?? searchQuery.value
    router.push({
        path: '/',
        query: {
            name: query || undefined,
            page: 1
        }
    })
}
</script>