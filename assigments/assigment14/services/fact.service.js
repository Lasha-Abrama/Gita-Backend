exports.getRandomFact = async () => {
  const response = await fetch(
    "https://uselessfacts.jsph.pl/api/v2/facts/random",
  );

  const data = await response.json();

  return data.text;
};
