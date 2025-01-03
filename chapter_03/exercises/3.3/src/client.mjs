import ticker from "./ticker.mjs";

const thresholdInMilliseconds = 500;

const callback = (error, totalTicks) => {
  if (error) {
    console.error(`Error when executing callback: ${error.message}`);
  }

  console.log(`💥 Total ticks after callback execution: ${totalTicks}`);
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
