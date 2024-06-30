import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

const instance = axios.create({
  httpsAgent: agent
});

instance.get('https://localhost:8081/api/records/')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
