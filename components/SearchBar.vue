<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="relative">
      <input
        v-model="localQuery"
        type="text"
        placeholder="Search blog posts by title..."
        class="w-full px-4 py-3 pl-12 pr-12 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
        @input="handleSearch"
      />

      <!-- Search Icon -->
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Clear Button -->
      <button
        v-if="localQuery"
        @click="handleClear"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Search Results Count -->
    <div v-if="showResultCount && localQuery" class="mt-2 text-sm text-gray-600">
      Found {{ resultCount }} {{ resultCount === 1 ? 'result' : 'results' }} for "{{ localQuery }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: string
  resultCount?: number
  showResultCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  resultCount: 0,
  showResultCount: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', query: string): void
  (e: 'clear'): void
}>()

const localQuery = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  localQuery.value = newValue
})

const handleSearch = () => {
  emit('update:modelValue', localQuery.value)
  emit('search', localQuery.value)
}

const handleClear = () => {
  localQuery.value = ''
  emit('update:modelValue', '')
  emit('clear')
}
</script>
