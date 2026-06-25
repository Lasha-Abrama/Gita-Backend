const FactService = require("../services/fact.service");

exports.getRandomFact = async (req, res) => {
  try {
    const fact = await FactService.getRandomFact();

    res.status(200).json({ fact });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch fact",
    });
  }
};
