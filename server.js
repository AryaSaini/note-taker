const express = require('express');
const apiRoutes = require('./routes/apiRoutes')
const userRoutes = require('./routes/htmlRoutes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes)
app.use('/', userRoutes)

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});