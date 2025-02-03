export default function ClaudeRecipe(props){
    return(
        <section>
            <h2 className="text-3xl font-medium">Recipe:</h2>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <p>{props.recipe}</p>
            </div>            
       </section>
    );
}