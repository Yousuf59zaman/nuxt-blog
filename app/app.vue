<script setup lang="ts">
import { blogPosts } from '../data/posts'
import { useSearch } from '../composables/useSearch'
// Initialize search with Fuse.js
const { searchResults, search, clearSearch, resultCount } = useSearch(blogPosts)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <!-- Search Section -->
      <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Search Blog Posts
            </h1>
          </div>

          <div class="relative">
            <input
              type="text"
              @input="(e) => search((e.target as HTMLInputElement).value)"
              placeholder="Search blog posts by title..."
              class="w-full px-4 py-3 pl-12 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg transition-all duration-200"
            />
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <p class="mt-3 text-white text-sm">Found {{ resultCount }} results</p>
        </div>
      </section>

      <!-- Results Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div v-if="searchResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="post in searchResults"
            :key="post.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- Thumbnail -->
            <div class="relative h-48 overflow-hidden bg-gray-200">
              <img
                :src="post.thumbnail"
                :alt="post.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  {{ post.category }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
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
                  <p class="text-sm font-semibold text-gray-900">{{ post.author.name }}</p>
                  <p class="text-xs text-gray-500">{{ post.publishDate }} · {{ post.readTime }}</p>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p class="text-gray-600">Try adjusting your search terms</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
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
