import type { Character, Episode, Location, ApiResponse } from '~/types'

const FETCH_TIMEOUT = 15000 // 15 seconds

const fetchOptions = {
  timeout: FETCH_TIMEOUT,
  retry: 1,
  retryDelay: 1000
}

export function useRickAndMortyApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string

  const getCharacters = async (page = 1, name?: string) => {
    const params = new URLSearchParams()
    params.set('page', String(page))
    if (name?.trim()) params.set('name', name.trim())

    const url = `${apiBase}/character?${params.toString()}`
    try {
      return await $fetch<ApiResponse<Character>>(url, fetchOptions)
    } catch (err) {
      // Return empty on 404 (no search results), throw on network/timeout
      if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 404) {
        return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
      }
      throw err
    }
  }

  const getCharacter = async (id: string | number): Promise<Character | null> => {
    try {
      return await $fetch<Character>(`${apiBase}/character/${id}`, fetchOptions)
    } catch {
      return null
    }
  }

  const getEpisodes = async (ids: number[]): Promise<Episode[]> => {
    if (ids.length === 0) return []
    try {
      const url = ids.length === 1
        ? `${apiBase}/episode/${ids[0]}`
        : `${apiBase}/episode/${ids.join(',')}`
      const data = await $fetch<Episode | Episode[]>(url, fetchOptions)
      return Array.isArray(data) ? data : [data]
    } catch {
      return []
    }
  }

  const getLocations = async (ids: number[]): Promise<Location[]> => {
    if (ids.length === 0) return []
    try {
      const url = ids.length === 1
        ? `${apiBase}/location/${ids[0]}`
        : `${apiBase}/location/${ids.join(',')}`
      const data = await $fetch<Location | Location[]>(url, fetchOptions)
      return Array.isArray(data) ? data : [data]
    } catch {
      return []
    }
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
