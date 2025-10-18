export interface Author {
  id: string
  name: string
  photo: string
  bio: string
  email?: string
  expertise?: string[]
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  thumbnail: string
  category: string
  author: Author 
  publishDate: string
  readTime: string
  tags: string[]
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://i.pravatar.cc/150?img=12',
    bio: 'Full-stack developer passionate about Vue.js and modern web technologies. 5+ years of experience building scalable applications.',
    email: 'john@example.com',
    expertise: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Design Systems'],
    social: {
      twitter: '@johndoe',
      github: 'johndoe',
      linkedin: 'johndoe'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'https://i.pravatar.cc/150?img=45',
    bio: 'UI/UX designer and frontend developer. Love creating beautiful and intuitive user experiences.',
    email: 'jane@example.com',
    expertise: ['Product Design', 'UX Research', 'Design Systems'],
    social: {
      twitter: '@janesmith',
      github: 'janesmith'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    photo: 'https://i.pravatar.cc/150?img=33',
    bio: 'DevOps engineer and cloud architecture enthusiast. Specializing in AWS and Kubernetes.',
    email: 'mike@example.com',
    expertise: ['Kubernetes', 'AWS', 'Automation'],
    social: {
      github: 'mikejohnson',
      linkedin: 'mikejohnson'
    }
  }
]

const getAuthorById = (authorId: string): Author => {
  const author = authors.find(({ id }) => id === authorId)

  if (!author) {
    throw new Error(`Author with id "${authorId}" not found`)
  }

  return author
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-nuxt-4',
    title: 'Getting Started with Nuxt 4: A Comprehensive Guide',
    excerpt: 'Learn how to build modern web applications with Nuxt 4, the latest version of the popular Vue.js framework.',
    content: `
      <h2>Introduction</h2>
      <p>Nuxt 4 brings exciting new features and improvements to the already powerful Vue.js framework. In this guide, we'll explore everything you need to know to get started.</p>

      <h2>Why Nuxt 4?</h2>
      <p>Nuxt 4 introduces better performance, improved developer experience, and enhanced TypeScript support. It's the perfect choice for building modern web applications.</p>

      <h2>Installation</h2>
      <p>Getting started is easy. Simply run:</p>
      <pre><code>npx nuxi@latest init my-app</code></pre>

      <h2>Key Features</h2>
      <ul>
        <li>Server-side rendering out of the box</li>
        <li>Automatic routing based on file structure</li>
        <li>Built-in state management</li>
        <li>Optimized build process</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Nuxt 4 is a powerful framework that makes building Vue.js applications easier and more enjoyable. Start building today!</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    category: 'Web Development',
    author: getAuthorById('1'),
    publishDate: '2025-01-15',
    readTime: '5 min read',
    tags: ['Nuxt', 'Vue.js', 'JavaScript', 'Web Development']
  },
  {
    id: '2',
    slug: 'tailwind-css-best-practices',
    title: 'Tailwind CSS Best Practices for 2025',
    excerpt: 'Discover the best practices and tips for using Tailwind CSS in your projects effectively.',
    content: `
      <h2>Introduction</h2>
      <p>Tailwind CSS has become one of the most popular utility-first CSS frameworks. Let's explore the best practices for 2025.</p>

      <h2>Design System Setup</h2>
      <p>Start by customizing your tailwind.config.js with your brand colors, fonts, and spacing scale.</p>

      <h2>Component Organization</h2>
      <p>Use @apply directive sparingly and prefer composition over abstraction.</p>

      <h2>Performance Tips</h2>
      <ul>
        <li>Use JIT mode for faster builds</li>
        <li>Purge unused styles in production</li>
        <li>Leverage custom plugins</li>
      </ul>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    category: 'Design',
    author: getAuthorById('2'),
    publishDate: '2025-01-12',
    readTime: '4 min read',
    tags: ['Tailwind', 'CSS', 'Design', 'Frontend']
  },
  {
    id: '3',
    slug: 'primevue-components-overview',
    title: 'PrimeVue Components: A Complete Overview',
    excerpt: 'Explore the rich set of UI components that PrimeVue offers for building enterprise applications.',
    content: `
      <h2>What is PrimeVue?</h2>
      <p>PrimeVue is a comprehensive UI component library for Vue.js applications, offering 80+ components.</p>

      <h2>Popular Components</h2>
      <ul>
        <li>DataTable - Advanced data grids</li>
        <li>Dialog - Modal windows</li>
        <li>Calendar - Date picker</li>
        <li>Chart - Data visualization</li>
      </ul>

      <h2>Theming</h2>
      <p>PrimeVue offers multiple themes and full customization support.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
    category: 'UI/UX',
    author: getAuthorById('2'),
    publishDate: '2025-01-10',
    readTime: '6 min read',
    tags: ['PrimeVue', 'Vue.js', 'Components', 'UI']
  },
  {
    id: '4',
    slug: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Vue Developers',
    excerpt: 'Master advanced TypeScript patterns to write better Vue.js applications with strong typing.',
    content: `
      <h2>Type Safety in Vue</h2>
      <p>TypeScript brings type safety to Vue components, making your code more maintainable.</p>

      <h2>Generic Components</h2>
      <p>Learn how to create reusable generic components with proper typing.</p>

      <h2>Utility Types</h2>
      <p>Leverage TypeScript utility types like Pick, Omit, and Partial.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    category: 'Programming',
    author: getAuthorById('1'),
    publishDate: '2025-01-08',
    readTime: '8 min read',
    tags: ['TypeScript', 'Vue.js', 'Programming', 'Advanced']
  },
  {
    id: '5',
    slug: 'responsive-design-principles',
    title: 'Modern Responsive Design Principles',
    excerpt: 'Learn the essential principles of creating responsive websites that work on all devices.',
    content: `
      <h2>Mobile-First Approach</h2>
      <p>Always start with mobile design and progressively enhance for larger screens.</p>

      <h2>Flexible Layouts</h2>
      <p>Use CSS Grid and Flexbox for flexible, responsive layouts.</p>

      <h2>Breakpoints</h2>
      <p>Choose breakpoints based on content, not devices.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
    category: 'Design',
    author: getAuthorById('2'),
    publishDate: '2025-01-05',
    readTime: '5 min read',
    tags: ['Responsive', 'Design', 'CSS', 'Mobile']
  },
  {
    id: '6',
    slug: 'kubernetes-deployment-guide',
    title: 'Kubernetes Deployment Guide for Web Apps',
    excerpt: 'Deploy your web applications to Kubernetes with confidence using this comprehensive guide.',
    content: `
      <h2>Why Kubernetes?</h2>
      <p>Kubernetes provides container orchestration at scale with high availability.</p>

      <h2>Basic Concepts</h2>
      <ul>
        <li>Pods and Services</li>
        <li>Deployments and ReplicaSets</li>
        <li>ConfigMaps and Secrets</li>
      </ul>

      <h2>Deployment Strategy</h2>
      <p>Learn rolling updates and blue-green deployments.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    category: 'DevOps',
    author: getAuthorById('3'),
    publishDate: '2025-01-03',
    readTime: '10 min read',
    tags: ['Kubernetes', 'DevOps', 'Cloud', 'Deployment']
  },
  {
    id: '7',
    slug: 'vue-composition-api-patterns',
    title: 'Vue 3 Composition API: Patterns and Best Practices',
    excerpt: 'Unlock the full potential of Vue 3 Composition API with these proven patterns.',
    content: `
      <h2>Composition API Basics</h2>
      <p>The Composition API provides better code organization and reusability.</p>

      <h2>Composables</h2>
      <p>Create reusable logic with composable functions.</p>

      <h2>Best Practices</h2>
      <ul>
        <li>Keep composables focused and single-purpose</li>
        <li>Use reactive() for objects, ref() for primitives</li>
        <li>Extract common patterns</li>
      </ul>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    category: 'Web Development',
    author: getAuthorById('1'),
    publishDate: '2025-01-01',
    readTime: '7 min read',
    tags: ['Vue.js', 'Composition API', 'JavaScript', 'Best Practices']
  },
  {
    id: '8',
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization: 2025 Edition',
    excerpt: 'Optimize your website performance with the latest techniques and tools.',
    content: `
      <h2>Core Web Vitals</h2>
      <p>Focus on LCP, FID, and CLS for better user experience.</p>

      <h2>Image Optimization</h2>
      <p>Use modern formats like WebP and AVIF with proper sizing.</p>

      <h2>Code Splitting</h2>
      <p>Implement lazy loading and dynamic imports.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    category: 'Performance',
    author: getAuthorById('3'),
    publishDate: '2024-12-28',
    readTime: '6 min read',
    tags: ['Performance', 'Optimization', 'Web Development', 'Speed']
  }
]
