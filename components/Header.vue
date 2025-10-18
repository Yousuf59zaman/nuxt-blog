<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Title -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900 hidden sm:block">Nuxt Blog</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            active-class="text-indigo-600"
          >
            Home
          </NuxtLink>

          <!-- Category Dropdown -->
          <div
            ref="categoryMenuRef"
            class="relative"
          >
            <button
              @click.stop="toggleCategoryMenu"
              class="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50/70 text-indigo-600 font-medium shadow-sm hover:bg-indigo-100 hover:text-indigo-700 transition-all"
            >
              <span>{{ categoryLabel }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': showCategoryMenu }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition name="fade-scale">
              <div
                v-if="showCategoryMenu"
                class="absolute left-0 mt-3 w-56 rounded-2xl border border-indigo-100 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden"
              >
                <div class="px-4 py-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                  <p class="text-xs font-semibold tracking-wide text-indigo-600 uppercase">Browse Categories</p>
                </div>
                <div class="py-2">
                  <button
                    v-for="category in categoriesList"
                    :key="category"
                    @click="selectCategory(category)"
                    class="flex w-full items-center justify-between px-4 py-2 text-sm transition-colors"
                    :class="[
                      category === selectedCategory
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    ]"
                  >
                    <span>{{ category }}</span>
                    <svg
                      v-if="category === selectedCategory"
                      class="w-4 h-4 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <NuxtLink
            to="/about"
            class="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            active-class="text-indigo-600"
          >
            About
          </NuxtLink>
        </nav>

        <!-- Search & Theme Toggle -->
        <div class="flex items-center space-x-4">
          <!-- Search Icon (Mobile) -->
          <button
            @click="showSearch = !showSearch"
            class="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <svg v-if="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

    
    </div>

    <!-- Mobile Search (Expandable) -->
    <div v-if="showSearch" class="md:hidden px-4 pb-4 bg-white border-t">
      <div class="relative">
        <InputText
          v-model="searchQuery"
          type="text"
          placeholder="Search blog posts..."
          class="w-full !px-4 !py-2 !pl-10 !pr-4"
          @keyup.enter="handleSearch"
        />
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="md:hidden px-4 py-4 bg-white border-t">
      <nav class="flex flex-col space-y-3">
        <NuxtLink
          to="/"
          class="text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2"
          @click="showMobileMenu = false"
        >
          Home
        </NuxtLink>

        <div class="py-2">
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Categories</label>
          <div class="relative">
            <select
              :value="selectedCategory"
              @change="handleMobileCategoryChange"
              class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option
                v-for="category in categoriesList"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <NuxtLink
          to="/about"
          class="text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2"
          @click="showMobileMenu = false"
        >
          About
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { blogPosts } from '../data/posts'
import InputText from 'primevue/inputtext'

const router = useRouter()

// State
const searchQuery = ref('')
const selectedCategory = ref<string>('All')
const showMobileMenu = ref(false)
const showSearch = ref(false)
const isDark = ref(false)
const showCategoryMenu = ref(false)
const categoryMenuRef = ref<HTMLElement | null>(null)

// Get unique categories
const categories = computed(() => {
  const cats = new Set(blogPosts.map(post => post.category))
  return Array.from(cats).sort()
})
const categoriesList = computed(() => ['All', ...categories.value])
const categoryLabel = computed(() =>
  selectedCategory.value && selectedCategory.value !== 'All'
    ? selectedCategory.value
    : 'Categories'
)

// Handle search
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/', query: { search: searchQuery.value } })
    showMobileMenu.value = false
    showSearch.value = false
  }
}

// Theme toggle
const toggleTheme = () => {
  isDark.value = !isDark.value
  // In a real implementation, you would apply the dark theme to the document
  // For now, this is just a placeholder
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Category dropdown logic
const selectCategory = (category: string) => {
  selectedCategory.value = category

  if (!category || category === 'All') {
    router.push('/')
  } else {
    router.push(`/category/${category}`)
  }

  showMobileMenu.value = false
  showCategoryMenu.value = false
}

const handleMobileCategoryChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  selectCategory(value)
}

const toggleCategoryMenu = () => {
  showCategoryMenu.value = !showCategoryMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (categoryMenuRef.value && !categoryMenuRef.value.contains(event.target as Node)) {
    showCategoryMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.15s ease;
  transform-origin: top;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}
</style>
