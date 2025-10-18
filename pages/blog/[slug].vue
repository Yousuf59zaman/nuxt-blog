<script setup lang="ts">
import { computed } from 'vue'
import { blogPosts } from '../../data/posts'
import { useRoute, useRouter } from 'vue-router'
import Tag from 'primevue/tag'
import Card from 'primevue/card'

const route = useRoute()
const router = useRouter()

// Get the current post by slug
const currentPost = computed(() => {
  return blogPosts.find(post => post.slug === route.params.slug)
})

// Get related posts (same category, excluding current post)
const relatedPosts = computed(() => {
  if (!currentPost.value) return []

  return blogPosts
    .filter(post =>
      post.category === currentPost.value?.category &&
      post.id !== currentPost.value?.id
    )
    .slice(0, 3)
})

// Navigate back
const goBack = () => {
  router.back()
}

// If post not found, redirect to home
if (!currentPost.value) {
  router.push('/')
}
</script>

<template>
  <div v-if="currentPost" class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          @click="goBack"
          class="mb-6 flex items-center text-white/90 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </button>

        <!-- Category Badge -->
        <div class="mb-4">
          <NuxtLink :to="`/category/${encodeURIComponent(currentPost.category)}`">
            <Tag
              :value="currentPost.category"
              severity="info"
              class="!bg-white/20 backdrop-blur-sm !text-white !rounded-full
                    !px-4 !py-2 !text-base !font-semibold leading-none
                    hover:!bg-white/30 transition-colors cursor-pointer"
            />
          </NuxtLink>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          {{ currentPost.title }}
        </h1>

        <!-- Meta Info -->
        <div class="flex items-center text-white/90">
          <img
            :src="currentPost.author.photo"
            :alt="currentPost.author.name"
            class="w-12 h-12 rounded-full mr-4 border-2 border-white/20"
          />
          <div>
            <p class="font-semibold">{{ currentPost.author.name }}</p>
            <p class="text-sm text-white/80">
              {{ currentPost.publishDate }} | {{ currentPost.readTime }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Featured Image -->
      <div class="mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <img
          :src="currentPost.thumbnail"
          :alt="currentPost.title"
          class="w-full h-96 object-cover"
        />
      </div>

      <!-- Article Content -->
      <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
        <!-- Excerpt -->
        <p class="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
          {{ currentPost.excerpt }}
        </p>

        <!-- HTML Content with Tailwind Typography styling -->
        <div
          class="prose prose-lg prose-indigo max-w-none"
          v-html="currentPost.content"
        ></div>
        <!-- Tags -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <Tag
              v-for="tag in currentPost.tags"
              :key="tag"
              :value="tag"
              severity="info"
              class="!bg-indigo-100 !text-indigo-700 !text-sm !px-4 !py-2 !rounded-full hover:!bg-indigo-200 transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Author Bio -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-start">
          <img
            :src="currentPost.author.photo"
            :alt="currentPost.author.name"
            class="w-20 h-20 rounded-full mr-6"
          />
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              {{ currentPost.author.name }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ currentPost.author.bio }}
            </p>
            <div v-if="currentPost.author.social" class="flex space-x-4">
              <a
                v-if="currentPost.author.social.twitter"
                href="#"
                class="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <span class="sr-only">Twitter</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                v-if="currentPost.author.social.github"
                href="#"
                class="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <span class="sr-only">GitHub</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </a>
              <a
                v-if="currentPost.author.social.linkedin"
                href="#"
                class="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <span class="sr-only">LinkedIn</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Posts -->
        <div v-if="relatedPosts.length > 0" class="mt-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              v-for="post in relatedPosts"
              :key="post.id"
              class="group transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              :pt="{
                root: { class: 'shadow-lg overflow-hidden rounded-3xl border border-white/80 bg-white transition-shadow duration-300 hover:shadow-2xl' },
                body: { class: 'p-0' },
                content: { class: 'p-0' }
              }"
            >
              <template #header>
                <NuxtLink :to="`/blog/${post.slug}`" class="block relative h-40 overflow-hidden bg-gray-200">
                  <img
                    :src="post.thumbnail"
                    :alt="post.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                </NuxtLink>
              </template>
              <template #content>
                <NuxtLink :to="`/blog/${post.slug}`" class="block p-4">
                  <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-sm text-gray-500">{{ post.readTime }}</p>
              </NuxtLink>
            </template>
          </Card>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tailwind Typography styles for HTML content */
.prose {
  color: #374151;
  max-width: 65ch;
}

.prose h2 {
  color: #111827;
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}

.prose h3 {
  color: #111827;
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  line-height: 1.75;
}

.prose ul, .prose ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose ul > li {
  padding-left: 0.375em;
  list-style-type: disc;
}

.prose ol > li {
  padding-left: 0.375em;
  list-style-type: decimal;
}

.prose pre {
  background-color: #1f2937;
  color: #e5e7eb;
  padding: 1em;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 1.714em;
  margin-bottom: 1.714em;
}

.prose code {
  background-color: #f3f4f6;
  color: #ef4444;
  padding: 0.125em 0.25em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 600;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
  font-weight: 400;
}

.prose strong {
  color: #111827;
  font-weight: 600;
}

.prose a {
  color: #4f46e5;
  text-decoration: underline;
  font-weight: 500;
}

.prose a:hover {
  color: #6366f1;
}
</style>
