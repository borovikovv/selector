export function getRandomWord(num: number) {
  const words = ['Option', "Random"];

  return (num % 2 === 0) ? words[0] : words[1]
}
