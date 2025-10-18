<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About Nuxt Blog
        </h1>
        <p class="text-xl text-gray-600">
          A modern blogging platform built with cutting-edge technologies
        </p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p class="text-gray-700 mb-6">
            Welcome to Nuxt Blog, a platform dedicated to sharing knowledge and insights about web development,
            design, and modern technology. Our mission is to provide high-quality content that helps developers
            and designers stay up-to-date with the latest trends and best practices in the industry.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">What We Cover</h2>
          <p class="text-gray-700 mb-4">
            Our blog covers a wide range of topics including:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Web Development:</strong> Tutorials and guides on modern frameworks like Nuxt.js, Vue.js, and more</li>
            <li><strong>Design:</strong> UI/UX best practices, CSS techniques, and responsive design principles</li>
            <li><strong>Programming:</strong> Advanced patterns, TypeScript, and code quality tips</li>
            <li><strong>DevOps:</strong> Deployment strategies, containerization, and cloud infrastructure</li>
            <li><strong>Performance:</strong> Optimization techniques for faster, more efficient web applications</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <p class="text-gray-700 mb-4">
            This blog is built using the latest web technologies:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-indigo-600 mb-2">Nuxt.js 4</h3>
              <p class="text-sm text-gray-600">
                The powerful Vue.js framework for server-side rendering and static site generation
              </p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-indigo-600 mb-2">Tailwind CSS</h3>
              <p class="text-sm text-gray-600">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-indigo-600 mb-2">PrimeVue</h3>
              <p class="text-sm text-gray-600">
                Rich set of open-source UI components for Vue.js
              </p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-indigo-600 mb-2">TypeScript</h3>
              <p class="text-sm text-gray-600">
                Strongly typed programming language for better code quality
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Authors</h2>
          <p class="text-gray-700 mb-6">
            Our content is created by experienced developers and designers who are passionate about sharing their
            knowledge. Each author brings their unique perspective and expertise to help you learn and grow in
            your career.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p class="text-gray-700 mb-4">
            We love hearing from our readers! Whether you have questions, suggestions, or would like to contribute
            to our blog, feel free to reach out to us through our social media channels.
          </p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">
          Start Exploring
        </h2>
        <p class="text-indigo-100 mb-6">
          Browse our collection of articles and discover valuable insights to enhance your skills
        </p>
        <NuxtLink
          to="/"
          class="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View All Posts
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose {
  max-width: none;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 1rem;
}
</style>
