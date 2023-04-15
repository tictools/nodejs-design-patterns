import ticker from "./error-ticker.mjs";

ticker(500, function (error, totalTicks) {
  if (error) {
    console.error(`❌ Error captured by callback :: ${error}`);
  }
  console.log(`Total ticks emitted: ${totalTicks}`);
})
  .on("tick", () => console.log("✅ tick"))
  .on("finish", () => console.log("💥 Done"))
  .on("error", (error) => console.log(`❌ Error emmited by event :: ${error}`));
