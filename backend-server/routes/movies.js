const express = require('express');
const router = express.Router();
const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

// Route to add a movie
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const response = await client.index({
      index: 'movies',
      body: body
    });
    res.json(response);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'An error occurred while adding the movie.' });
  }
});

// Route to search for movies
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await client.search({
      index: 'movies',
      body: {
        query: {
          match: {
            title: q
          }
        }
      }
    });
    res.json(response.hits.hits.map(hit => hit._source));
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'An error occurred while searching for movies.' });
  }
});

module.exports = router;
