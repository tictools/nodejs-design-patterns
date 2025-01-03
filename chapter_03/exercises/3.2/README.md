# Recursive Event Builder Exercise Solution

## Problem Statement

We need a system that:

1. Emits periodic `tick` events at regular intervals.
2. Stops emitting ticks after a specified threshold (`thresholdInMilliseconds`).
3. Invokes a callback with the total number of ticks after completion.
4. Follows a clean and modular design, using the builder pattern and `EventEmitter`.

## Solution Overview

The solution involves two main components:

1. **`RecursiveEventBuilder` Class**:

   - Extends `EventEmitter` to provide event-driven functionality.
   - Implements the builder pattern for configuring recursion parameters.
   - Contains recursive logic to manage the periodic tick emission and threshold control.

2. **`ticker` Function**:
   - A wrapper function that validates input and initializes the `RecursiveEventBuilder`.
   - Returns the builder instance, allowing chaining of event listeners.
