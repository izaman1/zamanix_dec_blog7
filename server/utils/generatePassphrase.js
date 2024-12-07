const words = [
  "apple", "beach", "cloud", "dance", "eagle", "flame", "globe", "heart", 
  "image", "juice", "knife", "light", "music", "night", "ocean", "peace",
  "queen", "river", "storm", "tiger", "unity", "voice", "water", "youth",
  "zebra", "bread", "chair", "dream", "earth", "field", "grass", "house",
  "island", "jewel", "kings", "lemon", "money", "north", "olive", "paper",
  "quiet", "radio", "sleep", "table", "umbrella", "value", "wheel", "xray"
];

export const generatePassphrase = () => {
  const selectedWords = [];
  const usedIndices = new Set();

  while (selectedWords.length < 24) {
    const index = Math.floor(Math.random() * words.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selectedWords.push(words[index]);
    }
  }

  return selectedWords.join(' ');
};