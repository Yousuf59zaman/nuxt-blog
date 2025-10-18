<template>
  <Dialog
    v-model:visible="isVisible"
    :modal="true"
    :closable="true"
    :draggable="false"
    :block-scroll="true"
    :dismissable-mask="true"
    class="w-full sm:max-w-3xl"
    :pt="{
      mask: { class: 'bg-slate-900/70 backdrop-blur-sm' },
      root: { class: 'rounded-2xl shadow-2xl border border-white/10 overflow-hidden bg-white dark:bg-slate-900' },
      header: { class: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-2xl px-6 py-5' },
      content: { class: 'p-0 bg-white dark:bg-slate-900' },
      closeButton: { class: 'text-white hover:text-purple-100 transition-colors' },
      footer: { class: 'bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 px-6 py-4' }
    }"
  >
    <template #header>
      <div class="flex items-center space-x-4">
        <img
          :src="author.photo"
          :alt="author.name"
          class="w-16 h-16 rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h3 class="text-2xl font-bold text-white">{{ author.name }}</h3>
          <p v-if="author.email" class="text-indigo-100 text-sm">{{ author.email }}</p>
        </div>
      </div>
    </template>

    <div class="px-6 py-8 space-y-8">
      <!-- Bio -->
      <section class="space-y-3">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white/90">About</h4>
        <p v-if="author.bio" class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ author.bio }}
        </p>
        <p v-else class="text-gray-500 dark:text-gray-400">
          This author hasn't shared a bio yet.
        </p>
      </section>

      <div class="grid gap-6 md:grid-cols-2">
        <!-- Social Links -->
        <section v-if="author.social" class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white/90">Connect</h4>
          <div class="grid gap-3">
            <a
              v-if="author.social.twitter"
              :href="`https://twitter.com/${author.social.twitter.replace('@', '')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:bg-sky-500/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span>{{ author.social.twitter }}</span>
              </span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.293 2.293a1 1 0 011.414 0L18 6.586a2 2 0 010 2.828l-7.071 7.071a4 4 0 01-2.829 1.172H4a1 1 0 01-1-1v-4.1a4 4 0 011.172-2.828l7.071-7.071a1 1 0 011.414 0zM5 15H4v1h1v-1z" />
              </svg>
            </a>

            <a
              v-if="author.social.github"
              :href="`https://github.com/${author.social.github}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-700/20 dark:text-slate-200 dark:hover:bg-slate-700/30 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
                <span>@{{ author.social.github }}</span>
              </span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.293 2.293a1 1 0 011.414 0L18 6.586a2 2 0 010 2.828l-7.071 7.071a4 4 0 01-2.829 1.172H4a1 1 0 01-1-1v-4.1a4 4 0 011.172-2.828l7.071-7.071a1 1 0 011.414 0zM5 15H4v1h1v-1z" />
              </svg>
            </a>

            <a
              v-if="author.social.linkedin"
              :href="`https://linkedin.com/in/${author.social.linkedin}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.293 2.293a1 1 0 011.414 0L18 6.586a2 2 0 010 2.828l-7.071 7.071a4 4 0 01-2.829 1.172H4a1 1 0 01-1-1v-4.1a4 4 0 011.172-2.828l7.071-7.071a1 1 0 011.414 0zM5 15H4v1h1v-1z" />
              </svg>
            </a>
          </div>
        </section>

        <!-- Additional Info -->
        <section class="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 p-5 shadow-sm space-y-3">
          <div class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h4 class="text-sm font-semibold text-gray-700 dark:text-white/80 uppercase tracking-wide">
                Expertise
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Contributor to {{ author.name.split(' ')[0] }}'s articles on this blog.
              </p>
            </div>
          </div>
          <ul v-if="author.expertise?.length" class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li
              v-for="skill in author.expertise"
              :key="skill"
              class="flex items-center gap-2"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-300"></span>
              {{ skill }}
            </li>
          </ul>
        </section>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <Button
          label="Close"
          @click="isVisible = false"
          class="px-6 py-2 !bg-indigo-600 !hover:bg-indigo-700 !text-white !border-none shadow-sm"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import type { Author } from '../data/posts'

interface Props {
  author: Author
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const isVisible = ref(props.visible)

watch(() => props.visible, (newValue) => {
  isVisible.value = newValue
})

watch(isVisible, (newValue) => {
  emit('update:visible', newValue)
})
</script>
