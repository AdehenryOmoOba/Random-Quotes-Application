import React, { useState, useEffect } from "react";
import "./App.css";
import COLORS_ARRAY from "./Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

let quotesURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("God is good.");
  const [author, setauthor] = useState("Adehenry");
  const [quotesArray, setQuotesArray] = useState("");
  const [accentColor, setaccentColor] = useState("#f00");

  const dataBaseQuotes = async () => {
    const response = await fetch(quotesURL);
    const data = await response.json();
    setQuotesArray(data.quotes);
  };

  useEffect(() => {
    dataBaseQuotes();
  }, []);

  const getRandomQuotes = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length);
    setaccentColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setauthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box">
          <p id="text" style={{ color: accentColor }}>
            <FontAwesomeIcon icon={faQuoteLeft} /> {quote}"
          </p>
          <p id="author" style={{ fontSize: "16px", color: accentColor }}>
            - {author}
          </p>
          <div className="tweet-new">
            <a
              href={encodeURI(
                `https://www.twitter.com/intent/tweet?text="${quote} -${author}`
              )}
              id="tweet-quote"
              style={{ backgroundColor: accentColor }}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button
              id="new-quote"
              onClick={getRandomQuotes}
              style={{ backgroundColor: accentColor }}
            >
              New Quote
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
