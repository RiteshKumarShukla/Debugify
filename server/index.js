const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const completeGenerator = async (inputPrompt, code) => {
    const messages = [{ role: "user", content: code }, { role: "assistant", content: inputPrompt }];
    try {
        if (!code) {
            throw new Error("No input is provided");
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const generatedCode = completion.data.choices[0].message.content;
        console.log(generatedCode);

        return JSON.stringify(generatedCode);
    } catch (error) {
        console.error('Error:', error);
    }
};

app.post("/convert", async (req, res) => {
    try {
        const language = req.query.language;
        const inputCode = req.body.inputcode;

        const response = await completeGenerator(`Convert code from the current language to ${language} language. Each line should be on a new line.`, inputCode);
        console.log(response);

        res.send(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/debug", async (req, res) => {
    try {
        const inputCode = req.body.inputcode;

        const response = await completeGenerator(`Please debug the following code:\n${inputCode}\nProvide a step-by-step explanation to correct any errors.`, inputCode);
        console.log(response);

        res.send(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/qualityCheck", async (req, res) => {
    try {
        const inputCode = req.body.inputcode;

        const response = await completeGenerator(`Please check the quality of the following code:\n${inputCode}\nProvide any possible optimizations or tips to improve it.`, inputCode);
        console.log(response);

        res.send(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
