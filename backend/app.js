const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.listen(port);

console.log('OpenAI RESTful API server started on: ' + port);

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.route('/').get(async (req, res) => {
    res.send('Welcome to the OpenAI sandbox API');
});

app.route('/test').get(async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        temperature: 0,
        max_tokens: 7,
    });

    res.send(response.data.choices[0].text);
});

app.route('/generate').get(async (req, res) => {
    const prompt = req.query.prompt;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 20,
    });

    res.send(response.data.choices[0].text);
});

app.route('/translate').get(async (req, res) => {
    const language = req.query.language;
    const text = req.query.text;

    const prompt = `Translate this text from English to ${language}: ${text}`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 20,
    });

    const translation = response.data.choices[0].text;

    res.send({translation});
});