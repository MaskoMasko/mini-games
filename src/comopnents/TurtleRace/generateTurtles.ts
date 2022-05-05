export const generateTurtles = () => {
  let turtles = [];
  for (let i = 0; i < 7; i++) {
    turtles.push({
      startingPos: Math.floor(Math.random() * 200),
      turltePos: i,
    });
  }
  return turtles;
};
