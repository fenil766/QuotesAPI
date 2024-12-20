import React, { useState } from 'react';
import axios from 'axios';
import { MdContentCopy } from "react-icons/md";
import './quotes.css';

function Quotes() {
  const [quote, setQuote] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);  // State for copy success message
  const [loading, setLoading] = useState(false);  // State for button loading state

  // Function to fetch a quote
  const generateQuote = async () => {
    try {
      setLoading(true); // Disable button during fetching
      const response = await axios.get('http://localhost:5000/api/quote');
      setQuote(response.data);
      setCopySuccess(false);  // Reset copy success state when new quote is fetched
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false); // Re-enable button after fetching
    }
  };

  // Function to copy the quote to clipboard and regenerate a new quote
  const copyAndRegenerateQuote = () => {
    if (quote) {
      // Copy the quote to clipboard
      navigator.clipboard.writeText(`${quote.quote} - ${quote.author}`);
      
      // Show success message
      setCopySuccess(true);
      
      // Regenerate a new quote after copying
      setTimeout(() => {
        generateQuote();  // Fetch a new quote
        setCopySuccess(false);  // Hide the success message after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <button
          className="generate-button"
          onClick={generateQuote}
          disabled={loading}  // Disable the button while loading
        >
          {loading ? 'Loading...' : 'Generate Quote'}
        </button>

        {quote && (
          <div className="quote-box">
            <p className="quote-text">"{quote.quote}"</p>
            <p className="author-text">- {quote.author}</p>
            <button className="copy-button" onClick={copyAndRegenerateQuote}>
              <MdContentCopy />
            </button>
          </div>
        )}

        {copySuccess && (
          <div className="copy-success-message">
            Quote copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default Quotes;
