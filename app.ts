const express = require('express');
const app = express();
const routes = require('./routes/UserRoutes.ts');
const bodyParser = require('body-parser')

app.use('/', routes);

app.use('/uploads', express.static(__dirname +'/uploads'));
// app.use(bodyParser.json())

const PORT = process.env.PORT || 8081;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));