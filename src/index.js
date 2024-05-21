const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Retry Fetch Example</title>
    </head>
    <body>
      <h1>Retry Fetch Example</h1>
      <label for="attempts">Number of Attempts:</label>
      <input type="number" id="attempts" value="3">
      <br><br>
      <button onclick="makeRequest('/status200', 'GET')">Request /status200</button>
      <button onclick="makeRequest('/status500', 'GET')">Request /status500</button>
      <button onclick="makeRequest('/status500', 'PUT')">Request /status500 (PUT)</button>
      <button onclick="makeRequest('/status401', 'GET')">Request /status401</button>

      <script>
        function retryFetch(url, options, attempts = 0) {
            return fetch(url, options)
                .then((response) => {
                    if (response.status === 401 || response.status === 403) {
                        throw response;
                    }
        
                    if (response.status >= 400) {
                        if (attempts > 0 && options.method !== 'PUT') {
                            return retryFetch(url, options, attempts - 1, response);
                        } else {
                            throw response;
                        }
                    }
        
                    return response;            
                })
                .catch((error) => {
                    if (attempts > 0 && options.method !== 'PUT') {
                        return retryFetch(url, options, attempts - 1);
                    }
        
                    throw error;
                });
        }

        function makeRequest(endpoint, method) {
          const attempts = parseInt(document.getElementById('attempts').value);
          const options = {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }
          };

          retryFetch(endpoint, options, attempts)
            .then(response => response.text())
            .then(data => {
              alert('Response: ' + data);
            })
            .catch(error => {
              alert('Error: ' + error.statusText);
            });
        }
      </script>
    </body>
    </html>
  `);
});


app.get('/status200', (req, res) => {
    res.status(200).send('Status 200: OK');
});


app.get('/status500', (req, res) => {
    res.status(500).send('Status 500: Internal Server Error');
});

app.put('/status500', (req, res) => {
    res.status(500).send('Status 500: Internal Server Error (PUT)');
});

app.get('/status401', (req, res) => {
    res.status(401).send('Status 401: Unauthorized');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
