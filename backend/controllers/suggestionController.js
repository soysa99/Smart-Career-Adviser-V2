
const axios = require('axios');

const getSuggestions = async (req, res) => {
  const { skills, interests, goals } = req.body;

  if (!skills || !interests || !goals) {
    return res.status(400).json({
      error: "Missing required fields. Please provide skills, interests, and goals."
    });
  }

  const prompt = `
Suggest career paths for someone with:
- Skills: ${skills.join(", ")}
- Interests: ${interests.join(", ")}
- Goals: ${goals}
Give a list of 3-5 careers. For each career, provide:
1. Title
2. Short description
Return it in this format:
1. Title: [Career Name]
   Description: [Short Description]
`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const suggestionsText = response.data.choices[0].message.content;

    const suggestionBlocks = suggestionsText
      .split(/\d+\.\s+Title:/)
      .filter(block => block.trim() !== '')
      .map(block => {
        const titleMatch = block.match(/^(.*?)(\n|$)/);
        const descriptionMatch = block.match(/Description:\s*(.*)/);
        return {
          title: titleMatch ? titleMatch[1].trim() : "Unknown Title",
          description: descriptionMatch ? descriptionMatch[1].trim() : "No description available."
        };
      });

    res.json({ suggestions: suggestionBlocks });

  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get suggestions from AI" });
  }
};

module.exports = { getSuggestions };
