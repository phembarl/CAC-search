const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Welcome brah!</h1>');
});

app.post('/cac-search', async (req, res) => {
  const { searchTerm } = req.body;

  const search_api =
    'https://searchapp.cac.gov.ng/searchapp/api/public-search/company-business-name-it';

  const response = await fetch(search_api, {
    method: 'POST',
    body: JSON.stringify({ searchTerm }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return res.json(data);
});

// app.get('/find-business/:businessId', async (req, res) => {
//   const { businessId } = req.params;

//   const biz_api = `https://searchapp.cac.gov.ng/searchapp/api/status-report/find/company/${businessId}`;

//   const response = await fetch(biz_api, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   });

//   const data = await response.json();
//   console.log('data >>>>>>', data);
//   return res.json(data);
// });

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
