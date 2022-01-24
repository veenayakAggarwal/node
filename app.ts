const express = require('express');
const app = express();
const routes = require('./routes/UserRoutes.ts');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/userSchema.ts');
const graphqlResolver = require('./graphql/userResolver.ts');

app.use(bodyParser.json());

app.use('/', routes);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver
}));

app.use('/uploads', express.static(__dirname + '/uploads'));

const PORT = process.env.PORT || 8081;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));