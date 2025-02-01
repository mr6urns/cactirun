export const generateRandomNumber = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};