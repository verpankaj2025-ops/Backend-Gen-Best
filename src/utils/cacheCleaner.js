export const startCacheCleaner = (cache) => {
  setInterval(() => {
    cache.clear()
    console.log("🧹 Cache cleared")
  }, 300000) // every 5 min
}
