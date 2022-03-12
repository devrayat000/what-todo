import createEmotionCache from '@emotion/cache'

export default function createCache() {
  return createEmotionCache({
    key: 'todo-css',
    prepend: true,
  })
}
