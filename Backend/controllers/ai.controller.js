const ai = require("../services/ai.service");

module.exports.getResults = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await ai.generateResult(prompt);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
