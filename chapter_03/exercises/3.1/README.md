# Exercise Documentation

## Overview

This exercise involves using the `FindRegex` class to search for a regex pattern in multiple files. The `FindRegex` class emits various events during the search process, such as `start`, `error`, `readFile`, and `found`. The `client.mjs` file demonstrates how to use this class and handle these events.

## Key Concepts

### Event Emission

The `FindRegex` class emits several events to notify listeners about the progress and results of the search:

- **`start`**: Emitted when the search process begins.
- **`error`**: Emitted if there is an error reading a file.
- **`readFile`**: Emitted when a file has been read.
- **`found`**: Emitted when a match is found in a file.

### Asynchronous Execution with `process.nextTick`

The `find` method in the `FindRegex` class uses `process.nextTick` to emit the `start` event asynchronously. This ensures that the `start` event is emitted after the current operation completes but before any I/O operations are processed. This allows event listeners to be set up before the event is emitted.

### Event Loop and `process.nextTick`

- **Current Operation**: The current JavaScript operation runs to completion.
- **Next Tick Queue**: Any callbacks scheduled with `process.nextTick` are executed.
- **Event Loop**: The event loop continues to the next phase, processing I/O events, timers, etc.

### Sequence of Events

1. `find()` is called.
2. `process.nextTick` schedules the `start` event to be emitted.
3. The `for...of` loop schedules the `readFile` operations.
4. The current operation completes.
5. The `process.nextTick` callback is executed, emitting the `start` event.
6. The event loop processes the `readFile` operations.

> [!NOTE]  
> When we say "after the current operation completes," we are referring to the completion of the synchronous part of the `find()` method. This means that the method executes from top to bottom, reaching the return statement. At this point, any asynchronous functions defined within the method (such as `readFile`) have already been pushed to the event queue. Before processing these asynchronous functions, the `process.nextTick` callback is executed, ensuring that the `start` event is emitted before any I/O operations begin.

### Difference Between Tick Queue and Event Queue

- **Tick Queue**: The tick queue is a special queue that holds callbacks scheduled with `process.nextTick`. These callbacks are executed immediately after the current operation completes, but before any I/O operations or timers in the event queue are processed.
- **Event Queue**: The event queue holds callbacks for I/O operations, timers, and other asynchronous tasks. These callbacks are processed in the next phase of the event loop, after the tick queue has been cleared.

## Summary

This exercise demonstrates how to use the `FindRegex` class to search for a regex pattern in multiple files and handle various events emitted during the search process. The use of `process.nextTick` ensures that the `start` event is emitted asynchronously, allowing event listeners to be set up before the event is fired. This approach ensures proper event handling and sequencing in an asynchronous environment.
ÍÍ
