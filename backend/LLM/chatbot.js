require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = 3001;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body.prompt;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput }
      ],
      model: "gpt-3.5-turbo",
    });

    const botResponse = completion.choices[0].message.content;

    res.json({ message: botResponse });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Chatbot backend listening at http://localhost:${port}`);
});
