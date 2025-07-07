const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

// console.log('database :', process.env.DATABASE);

// console.log('server loaded');

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
