<template>
    <form
        class="gap-2 w-full"
        @submit.prevent="onSubmit"
    >
        <div class="bg-dark-500 p-4 rounded-[8px] flex items-center gap-3 shadow-2xl">
            <input
                v-model="inputValue"
                type="text"
                placeholder="Search for characters..."
                class="flex-1 px-4 py-3 rounded-[4px] bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
                type="submit"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-[4px] bg-primary text-dark-900 font-medium hover:bg-primary-light transition-colors shrink-0"
            >
                <img :src="searchIcon" alt="Search" class="w-5 h-5 shrink-0 object-contain" />
                <span class="hidden sm:inline text-[#00333D]">Search</span>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import searchIcon from '~/assets/icons/search-icon.svg'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
    search: [value?: string]
}>()

const inputValue = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
})

const onSubmit = () => {
    emit('search', inputValue.value)
}
</script>
