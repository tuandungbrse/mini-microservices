const { request } = require('express');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {});

app.listen(8040, () => console.log(`service is running on port 8040!`));
