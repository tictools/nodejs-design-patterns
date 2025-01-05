import ticker from "./ticker.mjs";

const thresholdInMilliseconds = 500;

const callback = (error, ticksCounter) => {
  if (error) {
    throw new TypeError(error.message);
  }

  console.log(`💥 Total ticks after callback execution: ${ticksCounter}`);
};

try {
  ticker({ thresholdInMilliseconds, callback })
    .on("tick", (step) => {
      console.log(`🚀 tick event emitted at ${step}`);
    })
    .on("end", () => {
      console.error("🙌 Excution ended!");
    })
    .on("error", (error) => {
      console.error(`Error when executing ticker: ${error.message}`);
    });
} catch (error) {
  console.log(`🚨 Error when invoking ticker method: ${error.message}`);
}
