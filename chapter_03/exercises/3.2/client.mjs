import ticker from './ticker.mjs'

ticker(500, function (_error, totalTicks) {
  console.log(`Total ticks emitted: ${totalTicks}`)
})
  .on('tick', () => console.log('✅ tick'))
  .on('finish', () => console.log('💥 Done'))
