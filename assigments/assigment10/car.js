const fs = require("fs/promises");

const [, , car, year, color] = process.argv;

async function getCars() {
  try {
    const data = await fs.readFile("cars.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (e) {
    if (e.code === "ENOENT") {
      await fs.writeFile("cars.json", "[]");
      return [];
    }
    throw e;
  }
}

async function carOperations(car, year, color) {
  const cars = await getCars();

  if (car === "show") {
    const result = cars.filter(
      (c) =>
        c.carReleaseDate === year ||
        c.carColor.toLowerCase() === year.toLowerCase(),
    );

    console.log(result);
    return;
  }

  if (!car || !year || !color) {
    console.log("car, year and color are required");
    return;
  }

  cars.push({
    carName: car,
    carReleaseDate: year,
    carColor: color,
  });

  await fs.writeFile("cars.json", JSON.stringify(cars));

  console.log("Car added successfully");
}

carOperations(car, year, color);
