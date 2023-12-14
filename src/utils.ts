export const randomInt = (maxExclusive: number) =>
  Math.floor(Math.random() * maxExclusive);

export const randomBool = () => !!randomInt(2);
