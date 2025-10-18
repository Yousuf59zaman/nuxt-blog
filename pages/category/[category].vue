<script setup lang="ts">
import { computed } from 'vue'
import { blogPosts } from '../../data/posts'
import { useRoute } from 'vue-router'
import { useHead } from 'nuxt/app'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

const route = useRoute()
const allCategories = computed(() =>
  Array.from(new Set(blogPosts.map(post => post.category))).sort()
)

const rawCategoryParam = computed(() => String(route.params.category ?? ''))

const normalizedParam = computed(() => decodeURIComponent(rawCategoryParam.value).trim().toLowerCase())

const resolvedCategory = computed(() =>
  allCategories.value.find(category => category.toLowerCase() === normalizedParam.value)
)

const categoryPosts = computed(() => {
  if (!resolvedCategory.value) {
    return []
  }

  return blogPosts.filter(post => post.category === resolvedCategory.value)
})

useHead(() => ({
  title: resolvedCategory.value
    ? `${resolvedCategory.value} Articles | Nuxt Blog`
    : 'Category Not Found | Nuxt Blog'
}))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </NuxtLink>

        <p class="text-sm uppercase tracking-widest text-white/80 mb-2">Category</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white">
          {{ resolvedCategory ?? 'Category not found' }}
        </h1>
        <p v-if="resolvedCategory" class="mt-4 text-white/80">
          Browse recent posts from the {{ resolvedCategory }} collection.
        </p>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <NuxtLink
          v-for="category in allCategories"
          :key="category"
          :to="`/category/${encodeURIComponent(category)}`"
        >
          <Tag
            :value="category"
            :severity="resolvedCategory === category ? 'info' : 'secondary'"
            :class="[
              'transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer !rounded-full !px-5 !py-2 !text-sm border',
              resolvedCategory === category
                ? '!bg-indigo-600 !text-white !border-transparent'
                : '!bg-white !text-indigo-600 hover:!bg-indigo-50 !border-indigo-100'
            ]"
          />
        </NuxtLink>
      </div>

      <div v-if="categoryPosts.length" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card
          v-for="post in categoryPosts"
          :key="post.id"
          class="group transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          :pt="{
            root: { class: 'shadow-lg overflow-hidden rounded-3xl border border-white/80 bg-white transition-shadow duration-300 hover:shadow-2xl' },
            body: { class: 'p-0' },
            content: { class: 'p-0' }
          }"
        >
          <template #content>
            <NuxtLink :to="`/blog/${post.slug}`" class="block group">
              <div class="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
                <div class="relative h-48 sm:h-full overflow-hidden bg-gray-200">
                  <img
                    :src="post.thumbnail"
                    :alt="post.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-tr from-gray-900/60 via-gray-900/10 to-transparent"></div>
                  <div class="absolute bottom-4 left-4 flex items-center gap-2">
                    <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/90 text-indigo-600 font-semibold shadow-lg backdrop-blur-sm">
                      {{ post.category.charAt(0) }}
                    </span>
                    <span class="text-sm font-medium text-white drop-shadow">Featured in {{ post.category }}</span>
                  </div>
                </div>
                <div class="p-6 flex flex-col justify-between">
                  <div>
                    <Tag :value="post.category" severity="info" class="!bg-indigo-100 !text-indigo-700 !text-xs !font-semibold !rounded-full !px-3 !py-1 mb-4" />
                    <h2 class="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                      {{ post.title }}
                    </h2>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                      {{ post.excerpt }}
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <img
                        :src="post.author.photo"
                        :alt="post.author.name"
                        class="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p class="text-sm font-semibold text-gray-900">{{ post.author.name }}</p>
                        <p class="text-xs text-gray-500">{{ post.publishDate }} | {{ post.readTime }}</p>
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                      Read More
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </template>
        </Card>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-2xl shadow-lg">
        <svg class="mx-auto h-16 w-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">No posts yet</h2>
        <p class="text-gray-600">
          We could not find any posts for this category. Try browsing another topic.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
