const express = require('express');
const fetch = require('node-fetch');
const API_KEY = require('./src/keys');

const app = express();
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
})

app.get('/', (request, response) => {
  response.send('Hello from Express!')
});

app.get('/aws', (request, response) => {
  fetch('https://k6mlefa7p4.execute-api.us-east-1.amazonaws.com/default/helloWorld', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'x-api-key': API_KEY
    },
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch('alert');

  response.send('Hello from Express!')
});
