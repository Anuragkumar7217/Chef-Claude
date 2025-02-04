import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props){
    return(
        <section className="p-15 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-3xl font-medium">Chef Claude Recommends:</h2>
            <div className="">
                {/* <p>{props.recipe}</p> */}
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </div>            
       </section>
    );
}