import type { CarouselMemory, MemoryItem } from '../types'

/** Replace image paths with your own photos in /public/assets/memories/ */
export const FLASH_MEMORIES: MemoryItem[] = [
  {
    id: '1',
    title: 'Morning smiles',
    caption: 'The way you light up every room before the sun does.',
    image: '/assets/memories/memory-1.jpg',
    accent: '#ffb8d4',
  },
  {
    id: '2',
    title: 'Kitchen stories',
    caption: 'Chai, laughter, and your stories that never ended.',
    image: '/assets/memories/memory-2.jpg',
    accent: '#ffc9e0',
  },
  {
    id: '3',
    title: 'Festival glow',
    caption: 'Diyas, rangoli, and your hands guiding mine.',
    image: '/assets/memories/memory-3.jpg',
    accent: '#ff9ec5',
  },
  {
    id: '4',
    title: 'Quiet afternoons',
    caption: 'Those slow hours when the world felt perfectly safe.',
    image: '/assets/memories/memory-4.jpg',
    accent: '#ffd6e8',
  },
  {
    id: '5',
    title: 'Forever home',
    caption: 'Every memory leads back to you, Mumma.',
    image: '/assets/memories/memory-5.jpg',
    accent: '#ffe8f2',
  },
]

export const CAROUSEL_MEMORIES: CarouselMemory[] = [
  { id: 'c1', label: 'Your warm hug', image: '/assets/memories/carousel-1.jpg' },
  { id: 'c2', label: 'Sunday breakfasts', image: '/assets/memories/carousel-2.jpg' },
  { id: 'c3', label: 'Rainy window talks', image: '/assets/memories/carousel-3.jpg' },
  { id: 'c4', label: 'Temple visits', image: '/assets/memories/carousel-4.jpg' },
  { id: 'c5', label: 'Birthday surprises', image: '/assets/memories/carousel-5.jpg' },
  { id: 'c6', label: 'Late night care', image: '/assets/memories/carousel-6.jpg' },
]
