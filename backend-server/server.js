const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const http = require('http');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

// Enable CORS
app.use(cors()); // Add this line

// Disable certificate validation (for development purposes only)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Create an HTTP agent for HTTP/1.1
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 50,
  keepAliveMsecs: 1000,
});

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    apiKey: 'VHFvRzE0MEJoM21na3ZfWWp3QTk6RkpGNjhiVjBUOVNOM0p5VUtjaGVDZw=='
  },
  agent: {
    http: agent // Use the custom HTTP agent
  }
});

// Middleware
app.use(bodyParser.json());

// Route to add a movie
app.post('/movies', async (req, res) => {
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
app.get('/movies/search', async (req, res) => {
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

// Route to get all movies
app.get('/movies', async (req, res) => {
  try {
    const response = await client.search({
      index: 'movies',
      body: {
        size:1000,
        query: {
          match_all: {}
        }
      }
    });
    res.json(response.hits.hits.map(hit => hit._source));
  } catch (error) {
    console.error('Error getting all movies:', error);
    res.status(500).json({ error: 'An error occurred while getting all movies.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
