const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3006;
const cors = require('cors');

// Middleware pour parser les requêtes JSON
app.use(express.json());

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    // Appelez l'API OpenAI ici (assurez-vous d'avoir configuré votre clé d'API)
    const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
    const API_KEY = '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 '; // !!! Remplacez par votre clé API et ne partagez jamais votre clé API en public !!!

    try {
        const openaiResponse = await axios.post(OPENAI_API_URL, {
            prompt: prompt,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        const responseText = openaiResponse.data.choices[0].text.trim();

        // Traitement du texte pour obtenir seulement les mots clés
        let keywords = [];
        if (responseText.includes('Buy')) {
            keywords.push('Buy');
            const amountTokenMatch = responseText.match(/(\d+)\s+(\w+)/);
            if (amountTokenMatch) {
                keywords.push(`amount: ${amountTokenMatch[1]}`);
                keywords.push(`token: ${amountTokenMatch[2]}`);
            }
        } else if (responseText.includes('transfer')) {
            keywords.push('transfer');
            const transferMatch = responseText.match(/(\d+)\s+from\s+(\w+)\s+to\s+(\w+)/);
            if (transferMatch) {
                keywords.push(`amount: ${transferMatch[1]}`);
                keywords.push(`fromAddress: ${transferMatch[2]}`);
                keywords.push(`toAddress: ${transferMatch[3]}`);
            }
        }

        res.json(keywords);

    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/', (req, res) => {
    res.send('Hello, this is the chatbot backend!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(cors());