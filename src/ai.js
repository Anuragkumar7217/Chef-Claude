import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
`;
// Format your response in markdown to make it easier to render on a web page.

const apiKey = import.meta.env.VITE_APP_API;

if (!apiKey) {
    throw new Error("API Key is not defined in .env file");
}
console.log("api key", apiKey);

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function getRecipeFromGeminiAI(ingredientsArr) {

    if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
        throw new Error("Ingredients list cannot be empty.");
    }

    const ingredientsString = SYSTEM_PROMPT+ ingredientsArr.join(", ");

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(ingredientsString);
        console.log(result.response.text());

        // const recipe = result.response?.candidates?.[0]?.content ||
        //     "Sorry, I couldn't generate a recipe at the moment.";

        return result.response.text();
    } catch (error) {
        console.error("Error fetching recipe from AI:", error);
        return "Sorry, I couldn't generate a recipe at the moment.";
    }
}


// import { GoogleGenerativeAI } from "@google/generative-ai";

// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
// You don't need to use every ingredient they mention in your recipe.
// The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
// Format your response in markdown to make it easier to render on a web page.
// `;

// const apiKey= import.meta.env.VITE_APP_API; // Ensure this is set in your .env file

// if (!apiKey) {
//     throw new Error("API Key is not defined in .env file");
// }
// console.log("api key", apiKey);

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// export async function getRecipeFromGeminiAI(ingredientsArr) {
//     if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
//         throw new Error("Ingredients list cannot be empty.");
//     }

//     const ingredientsString = ingredientsArr.join(", ");

//     try {
//         const chatSession = model.startChat({
//             generationConfig,
//             history: [{ role: "system", content: SYSTEM_PROMPT }] // Send the SYSTEM_PROMPT here
//         });

//         const result = await chatSession.sendMessage(
//             `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
//         );

//         // Ensure the result is correctly parsed
//         const recipe = result.response && result.response.candidates && result.response.candidates[0]
//             ? result.response.candidates[0].content // Access the first candidate's content
//             : "Sorry, I couldn't generate a recipe at the moment."; // Fallback if no content is found

//         return recipe; // Return the generated recipe
//     } catch (error) {
//         console.error("Error fetching recipe from AI:", error);
//         return "Sorry, I couldn't generate a recipe at the moment.";
//     }
// }
