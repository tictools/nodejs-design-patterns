export default function timestampIsDivisibleBy(factor) {
  return Date.now() % factor === 0;
}
