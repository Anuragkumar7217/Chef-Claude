import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromGeminiAI } from "../ai.js";

export default function Main() {
    const [ingredients, setIngredients] = useState(["tomato", "onion", "garlic", "beef"]);
    const [recipe, setRecipe] = useState("");

    function addIngredient(e) {
        e.preventDefault();
        const newIngredient = e.target.ingredient.value;
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        e.target.reset();
    }

    async function getRecipe() {
        const recipe = await getRecipeFromGeminiAI(ingredients);
        setRecipe(recipe);
        console.log("get recipeeee");
    }

    return (
        <main>
            <form className="m-10 flex items-center justify-center" onSubmit={addIngredient}>
                <input className="border border-gray-400 py-2 px-4 rounded flex-grow shadow-lg min-w-[150px] max-w-[400px]" type="text" placeholder="e.g. oregano" name="ingredient" />
                <button className="ml-2 py-2 px-4 bg-black text-white rounded hover:bg-gray-700">+ Add ingredient</button>
            </form>

            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}