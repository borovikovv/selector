export function getRandomWord() {
  const words: Record<number, string> = {
    0: "Ukraine",
    1: "Option",
    2: "Random",
    3: "Allo",
    4: "Select",
    5: "JavaSctipt",
    6: "React",
    7: "Better",
    8: "Happy",
    9: "Smart",
  };
  const randomNum: number = Math.floor(Math.random() * 10);
  return words[randomNum];
}