import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  const [source, setSource] = useState("en");

  const [target, setTarget] = useState("ur");

  const [translatedText, setTranslatedText] = useState("");

  console.log(text);
  console.log(source);
  console.log(target);

  const translateText = async () => {
    console.log("Button Clicked");

    if(text.trim()===""){
        alert("Please enter some text.");
        return;
    }

    try{

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );
        console.log(response);

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
        console.log(data.responseData.translatedText);
        console.log("Translated:", data.responseData.translatedText);

        setTranslatedText(data.responseData.translatedText);

    }

    catch(error){

        console.log(error);

        alert("Translation Failed");

    }

};

  return (
    <div className="App">
      <h1>🌍 Language Translation Tool</h1>

      <textarea
         placeholder="Enter text here..."
         rows="6"
         cols="50"
         value={text}
         onChange={(e) => setText(e.target.value)}
      ></textarea>

      <br /><br />

      <label>Source Language:</label>
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
>
         <option value="en">English</option>
         <option value="ur">Urdu</option>
         <option value="fr">French</option>
</select>

      <br /><br />

      <label>Target Language:</label>
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value)}
>
        <option value="ur">Urdu</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="ar">Arabic</option>
        <option value="pa">Punjabi</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
       <option value="de">German</option>
</select>

      <br /><br />

      <button onClick={translateText}>
        Translate
      </button>

      <h2>Translated Text</h2>

      <p>{translatedText}</p>
    </div>
  );
}

export default App;