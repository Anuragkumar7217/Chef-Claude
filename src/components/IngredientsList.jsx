export default function IngredientsList(props) {

    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (
        <section className="flex flex-col mx-25">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h2 className="text-3xl font-medium">Ingredients on hand:</h2>
                <ul>
                    {ingredientsListItems}
                </ul>
            </div>
            {props.ingredients.length > 3 && <div className="flex items-center justify-center m-10">
                <div className="flex gap-10 items-center justify-center bg-orange-200 w-fit p-6 rounded-lg shadow-lg">
                    <div>
                        <h3 className="text-2xl font-medium">Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe} className="py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-500 hover:text-lg"> Get a recipe </button>
                </div>
            </div>}
        </section>
    );
}