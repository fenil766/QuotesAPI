const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const apiKey = 'MplFARHx8fwU93CH28jCPlLakwI6XTScMl0BMBeB';
// Route to fetch a random quote
app.get('/api/quote', async (req, res) => {
  try {
    const category = 'happiness'; // You can dynamically change this category if needed
    const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        'X-Api-Key': apiKey 
      }
    });

    const quote = response.data[0]; // Assuming the first quote is the one you want
    res.json(quote); // Send the quote back to the client
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).send('Error fetching quote');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
