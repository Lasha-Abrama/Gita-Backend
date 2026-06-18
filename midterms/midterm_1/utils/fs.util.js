import fs from "fs/promises";

export async function readFile(filePath, isParse = true) {
  if (!filePath) throw new Error("File not provided!");

  const readData = await fs.readFile(filePath, "utf-8");

  if (!isParse) return readData;

  try {
    return JSON.parse(readData || "[]");
  } catch (err) {
    throw new Error("Invalid JSON in file");
  }
}

export async function writeFile(filePath, data) {
  if (!filePath) throw new Error("File not provided!");
  await fs.writeFile(
    filePath,
    typeof data === "string" ? data : JSON.stringify(data),
  );

  console.log("Written Successfully");
}
