import { Course } from '../types'

export const courses: (Course & {
  description: string
  tags: string[]
})[] = [
  {
    id: 1,
    title: 'React Fundamentals',
    tag: 'react',
    description: 'Core React concepts: components, state, props, hooks.',
    tags: ['react', 'frontend', 'javascript']
  },
  {
    id: 2,
    title: 'Advanced TypeScript',
    tag: 'typescript',
    description: 'Type-level programming, generics, inference, architecture.',
    tags: ['typescript', 'frontend']
  },
  {
    id: 3,
    title: 'CSS Animation Systems',
    tag: 'css',
    description: 'Modern animation, transitions, layout motion.',
    tags: ['css', 'design', 'ui']
  },
  {
    id: 4,
    title: 'Node.js Backend',
    tag: 'backend',
    description: 'APIs, authentication, databases, scaling.',
    tags: ['backend', 'node']
  },
  {
    id: 5,
    title: 'UI/UX Design Theory',
    tag: 'design',
    description: 'Usability, hierarchy, cognitive load, systems thinking.',
    tags: ['design', 'ui']
  }
]
