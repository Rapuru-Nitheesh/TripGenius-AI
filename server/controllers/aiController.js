const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateItinerary = async (req, res) => {
  try {
    const { source, destination, days, budget } = req.body;

    const prompt = `
You are an expert travel planner.

Generate a detailed travel itinerary.

Source: ${source}
Destination: ${destination}
Days: ${days}
Budget: ₹${budget}

Include:
- Day-wise plan
- Tourist attractions
- Hotel suggestions
- Food suggestions
- Travel tips

Return the response in a neat format.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      plan: response.text,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  generateItinerary,
};