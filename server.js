const express = require('express');
const apiRoutes = require('./routes/apiRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes)
app.use('/', userRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});