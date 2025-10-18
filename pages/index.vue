<script setup lang="ts">
import { ref, computed } from 'vue'
import { blogPosts, type Author } from '../data/posts'
import { useSearch } from '../composables/useSearch'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'

definePageMeta({
  layout: 'default'
})

// Initialize search
const { searchResults, search, resultCount } = useSearch(blogPosts)

// Category filtering
const selectedCategory = ref<string>('All')
const categories = computed(() => {
  const cats = new Set(blogPosts.map(post => post.category))
  return ['All', ...Array.from(cats).sort()]
})

// Pagination
const currentPage = ref(1)
const postsPerPage = 6

// Author Modal
const showAuthorModal = ref(false)
const selectedAuthor = ref<Author | null>(null)

// Combined filtering (search + category)
const filteredPosts = computed(() => {
  let posts = searchResults.value

  if (selectedCategory.value !== 'All') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  return posts
})

// Paginated posts
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

// Handle search input
const handleSearch = (event: Event) => {
  const query = (event.target as HTMLInputElement).value
  search(query)
  currentPage.value = 1 // Reset to first page on search
}

// Handle category change
const selectCategory = (category: string) => {
  selectedCategory.value = category
  currentPage.value = 1 // Reset to first page on category change
}

// Handle page change
const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle author click
const openAuthorModal = (author: Author, event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  selectedAuthor.value = author
  showAuthorModal.value = true
}
</script>

<template>
  <div>
    <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <!-- Search & Filter Section -->
      <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Amazing Content
            </h1>
            <p class="text-white/90 text-lg">Search and explore our collection of blog posts</p>
          </div>

          <!-- Search Bar -->
          <div class="relative mb-6">
            <InputText
              type="text"
              @input="handleSearch"
              placeholder="Search blog posts by title, excerpt, or tags..."
              class="w-full !px-4 !py-3 !pl-12 !text-gray-900 !bg-white/95 !rounded-2xl !shadow-xl !border-none focus:!ring-4 focus:!ring-white/70 focus:!shadow-2xl focus:!outline-none placeholder:text-gray-400"
            />
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
              :class="[
                'px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105',
                selectedCategory === category
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Results Count -->
          <p class="mt-4 text-white text-sm text-center">
            Found {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'result' : 'results' }}
          </p>
        </div>
      </section>

      <!-- Blog Posts Grid -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div v-if="paginatedPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="post in paginatedPosts"
            :key="post.id"
            class="group transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            :pt="{
              root: { class: 'shadow-lg overflow-hidden rounded-3xl border border-white/80 bg-white transition-shadow duration-300 hover:shadow-2xl' },
              body: { class: 'p-0' },
              content: { class: 'p-0' }
            }"
          >
            <template #header>
              <NuxtLink :to="`/blog/${post.slug}`" class="block relative h-48 overflow-hidden bg-gray-200">
                <img
                  :src="post.thumbnail"
                  :alt="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/0 to-gray-900/20"></div>
                <div class="absolute top-4 left-4">
                  <Tag :value="post.category" severity="info" class="!bg-white/90 !text-indigo-600 !font-semibold !rounded-full !px-4 !py-2 shadow-lg backdrop-blur-sm" />
                </div>
              </NuxtLink>
            </template>

            <template #content>
              <NuxtLink :to="`/blog/${post.slug}`" class="block p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {{ post.title }}
                </h3>

                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                  {{ post.excerpt }}
                </p>

                <!-- Author Info -->
                <div class="flex items-center mb-4">
                  <img
                    :src="post.author.photo"
                    :alt="post.author.name"
                    class="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <button
                      @click="(e) => openAuthorModal(post.author, e)"
                      class="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer text-left"
                    >
                      {{ post.author.name }}
                    </button>
                    <p class="text-xs text-gray-500">{{ post.publishDate }} | {{ post.readTime }}</p>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  <Tag
                    v-for="tag in post.tags.slice(0, 3)"
                    :key="tag"
                    :value="tag"
                    severity="secondary"
                    class="!bg-gray-100 !text-gray-700 !text-xs"
                  />
                </div>
              </NuxtLink>
            </template>
          </Card>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p class="text-gray-600">Try adjusting your search terms or filters</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-12 space-x-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all duration-300',
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-md hover:shadow-lg'
            ]"
          >
            Previous
          </button>

          <div class="flex space-x-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'w-10 h-10 rounded-lg font-medium transition-all duration-300',
                currentPage === page
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 shadow-md hover:shadow-lg'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all duration-300',
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-md hover:shadow-lg'
            ]"
          >
            Next
          </button>
        </div>
      </section>
    </main>

    <!-- Author Modal -->
    <AuthorModal
      v-if="selectedAuthor"
      :author="selectedAuthor"
      v-model:visible="showAuthorModal"
    />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
