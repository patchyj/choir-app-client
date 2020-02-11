import dotenv from 'dotenv';

dotenv.config();

const prod = process.env.NODE_ENV === 'production';

console.log(prod);

export default {
  API_URL: prod ? 'http://localhost:4000' : 'http://localhost:4000'
};
