const express = require('express');
const cors = require('cors')

var app = express();
app.use(cors());
app.use(express.json());


const {Configuration, OpenAI} =  require("openai");
const openai = new OpenAI({
    apiKey: "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",
    gptVersion: 'gpt-3.5-turbo'
});

//this post function is a taken from openai quickstart example, but modified to work with expressjs
app.post('/api/generator', async (req, res) => {

    //   if (!configuration.apiKey) {
    //       res.status(500).json({
    //           error: {
    //               message: "OpenAI API key not configured, please follow instructions in README.md",
    //           }
    //       });
    //       return;
    //   }

    const animal = req.body.animal || '';
    if (animal.trim().length === 0) {
        res.status(400).json({
            error: { message: "Please enter a valid animal" }
        });

        return;
    }

    try {
        const completion = await openai.completions.create({
            model: "text-davinci-003",
            prompt: generatePrompt(animal),
            temperature: 0.6,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } 
    catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } 
        else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                message: 'An error occurred during your request.',
                }
            });
        }
    }

    function generatePrompt(animal) {
        const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
 
        return `Suggest three names for an animal that is a superhero.
            Animal: Cat
            Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
            Animal: Dog
            Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
            Animal: ${capitalizedAnimal}
            Names:`;
    }
})

const port = 3343;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})






// ========================================================================================================================== //
// const { OpenAIApi } = require('chatai');

// const openai = new OpenAIApi({
//     apiKey: 'YOUR_API_KEY',
//     gptVersion: 'gpt-3.5-turbo', // Use the GPT-3.5 Turbo model for free access
// });

// async function generateCompletion(animal) {
//     try {
//         const completion = await openai.createCompletion({
//             prompt: generatePrompt(animal),
//             max_tokens: 50, // You can adjust the max_tokens based on your needs
//         });
//         return completion.choices[0].text;
//     } catch (error) {
//         // Handle errors here
//         console.error(`Error with OpenAI API request: ${error.message}`);
//         throw error; // You can handle the error as needed in your application
//     }
// }

// // Define your express route or function
// app.post('/generateAnimalResponse', async (req, res) => {
//     const { animal } = req.body;

//     try {
//         const result = await generateCompletion(animal);
//         res.status(200).json({ result });
//     } catch (error) {
//         // Handle errors here
//         res.status(500).json({
//             error: {
//                 message: 'An error occurred during your request.',
//             }
//         });
//     }
// });



