export const disableEmptyHouses = (setDisabled, numberOfPlayers) => {
  const disabled = { red: false, green: false, blue: false, yellow: false };
  const colors = ['red', 'green', 'blue', 'yellow'];

  if (numberOfPlayers === 3) {
    const color = colors[Math.floor(Math.random() * 4)];
    disabled[color] = true;
    return setDisabled({ ...disabled });
  } else if (numberOfPlayers === 2) {
    const overide = [
      { green: true, blue: true },
      { red: true, yellow: true }
    ][Math.floor(Math.random() * 2)];
    return setDisabled({ ...disabled, ...overide });
  }

  setDisabled(disabled);
}
