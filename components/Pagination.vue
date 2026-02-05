<template>
  <div class="flex items-center justify-center gap-1 flex-wrap mt-8">
    <button
      :disabled="currentPage <= 1"
      @click="$emit('update:page', 1)"
      class="px-3 py-2 rounded text-gray-400 hover:bg-dark-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      aria-label="First page"
    >
      &laquo;
    </button>
    <button
      :disabled="currentPage <= 1"
      @click="$emit('update:page', currentPage - 1)"
      class="px-3 py-2 rounded text-gray-400 hover:bg-dark-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      aria-label="Previous page"
    >
      &lsaquo;
    </button>

    <template v-for="(page, index) in visiblePages" :key="`${page}-${index}`">
      <button
        v-if="page !== '...'"
        @click="$emit('update:page', page)"
        :class="[
          'rounded font-medium transition-colors min-w-[25px]',
          page === currentPage
            ? 'bg-primary rounded-full text-dark-900'
            : 'text-gray-400 hover:bg-dark-500 hover:text-white'
        ]"
      >
        {{ page }}
      </button>
      <span v-else class="px-2 text-gray-500">...</span>
    </template>

    <button
      :disabled="currentPage >= totalPages"
      @click="$emit('update:page', currentPage + 1)"
      class="px-3 py-2 rounded text-gray-400 hover:bg-dark-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      aria-label="Next page"
    >
      &rsaquo;
    </button>
    <button
      :disabled="currentPage >= totalPages"
      @click="$emit('update:page', totalPages)"
      class="px-3 py-2 rounded text-gray-400 hover:bg-dark-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      aria-label="Last page"
    >
      &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  maxVisible?: number
}>()

defineEmits<{
  'update:page': [page: number]
}>()

const visiblePages = computed(() => {
  const { currentPage, totalPages } = props
  const maxVisible = props.maxVisible ?? 5
  const pages: (number | string)[] = []

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
    return pages
  }

  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push('...')
  }
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('...')
    pages.push(totalPages)
  }
  return pages
})
</script>
