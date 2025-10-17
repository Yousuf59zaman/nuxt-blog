import Fuse from 'fuse.js'
import { ref, computed } from 'vue'
import type { BlogPost } from '../data/posts'

export const useSearch = (posts: BlogPost[]) => {
  const searchQuery = ref('')
  const searchResults = ref<BlogPost[]>(posts)

  // Fuse.js configuration
  const fuseOptions = {
    keys: [
      {
        name: 'title',
        weight: 0.7 // Title has highest priority
      },
      {
        name: 'excerpt',
        weight: 0.2
      },
      {
        name: 'tags',
        weight: 0.1
      }
    ],
    threshold: 0.3, // Lower = more strict matching (0 = perfect match, 1 = match anything)
    minMatchCharLength: 2,
    includeScore: true,
    ignoreLocation: true // Search in entire string, not just beginning
  }

  // Initialize Fuse instance
  const fuse = new Fuse(posts, fuseOptions)

  // Perform search
  const search = (query: string) => {
    searchQuery.value = query

    if (!query || query.trim() === '') {
      // If query is empty, return all posts
      searchResults.value = posts
      return
    }

    // Perform fuzzy search
    const results = fuse.search(query)
    searchResults.value = results.map(result => result.item)
  }

  // Clear search
  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = posts
  }

  // Computed property for checking if search is active
  const isSearching = computed(() => searchQuery.value.trim() !== '')

  // Computed property for result count
  const resultCount = computed(() => searchResults.value.length)

  return {
    searchQuery,
    searchResults,
    search,
    clearSearch,
    isSearching,
    resultCount
  }
}
