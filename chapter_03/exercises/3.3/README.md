# Why is the `tick` Event Emitted by `start()` Not Received Without `process.nextTick()`?

Given exercise 3.3 implementation. why is the `tick` event emitted by `start()` not received, but it works when using `process.nextTick()`?

## Explanation

The behavior difference is due to the asynchronous nature of the JavaScript event loop and the timing of event listener attachment.

### Key Points:

1. **Event Loop and Microtasks**:

   - `process.nextTick()` queues a callback in the **microtask queue**, which executes **before** any I/O events or `setTimeout` callbacks.
   - Emitting the `tick` event synchronously without `process.nextTick()` runs the callback in the current execution stack, potentially before any listeners have been attached to the event emitter.

2. **Event Listener Attachment**:

   - If the `start()` method emits the `tick` event synchronously (`this.emit("tick", "INITIAL STEP");`) as soon as it is called...
   - ... thent he `tick` event is emitted before the `.on("tick", ...)` listener is attached, so the event will not be caught because no listener is present yet.

3. **Using `process.nextTick()`**:
   - By wrapping `this.emit("tick", "INITIAL STEP");` inside `process.nextTick()`, the emission of the `tick` event is delayed until the current execution stack is cleared and listeners have been attached.
   - This ensures that the listener for the `tick` event is in place when the event is emitted.

### Why It Fails Without `process.nextTick()`:

Without `process.nextTick()`, `this.emit("tick", "INITIAL STEP");` runs immediately when `start()` is called. At that point, in the calling code:

```javascript
ticker({ thresholdInMilliseconds, callback })
  .on("tick", (step) => {
    console.log(`🚀 tick event emitted at ${step}`);
  })
  .on("end", () => {
    console.error("🙌 Execution ended!");
  });
```

The `start()` method has already emitted the `tick` event before `.on("tick", ...)` is called, so the event is lost.

### Solution:

To ensure the `tick` event is always received, modify the `start()` method as follows:

```javascript
start() {
  process.nextTick(() => this.emit("tick", "INITIAL STEP"));
  this.recurse();
  return this;
}
```

This guarantees that the `tick` event is emitted after the listeners have been attached, regardless of the timing.

Alternatively, you could modify the calling code to attach listeners before calling `start()`, but using `process.nextTick()` is more robust and keeps the API intuitive.
