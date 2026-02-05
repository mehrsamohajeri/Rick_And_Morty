import type { Character, Episode, Location, ApiResponse } from '~/types'

export function useRickAndMortyApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string

  const getCharacters = async (page = 1, name?: string) => {
    const params = new URLSearchParams()
    params.set('page', String(page))
    if (name?.trim()) params.set('name', name.trim())

    const url = `${apiBase}/character?${params.toString()}`
    try {
      return await $fetch<ApiResponse<Character>>(url)
    } catch {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
    }
  }

  const getCharacter = async (id: string | number): Promise<Character | null> => {
    try {
      return await $fetch<Character>(`${apiBase}/character/${id}`)
    } catch {
      return null
    }
  }

  const getEpisodes = async (ids: number[]) => {
    if (ids.length === 0) return []
    const url = ids.length === 1
      ? `${apiBase}/episode/${ids[0]}`
      : `${apiBase}/episode/${ids.join(',')}`
    const data = await $fetch<Episode | Episode[]>(url)
    return Array.isArray(data) ? data : [data]
  }

  const getLocations = async (ids: number[]) => {
    if (ids.length === 0) return []
    const url = ids.length === 1
      ? `${apiBase}/location/${ids[0]}`
      : `${apiBase}/location/${ids.join(',')}`
    const data = await $fetch<Location | Location[]>(url)
    return Array.isArray(data) ? data : [data]
  }

  const extractIdFromUrl = (url: string): number => {
    const match = url.match(/\/(\d+)\/?$/)
    return match ? parseInt(match[1], 10) : 0
  }

  return {
    getCharacters,
    getCharacter,
    getEpisodes,
    getLocations,
    extractIdFromUrl
  }
}
