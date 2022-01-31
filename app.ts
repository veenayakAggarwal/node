import express from "express";
import routes from './routes/routes';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { userSchema } from './graphql/UserSchema';
import * as graphqlResolver from './graphql/UserResolver';
import helmet from 'helmet';

import './database'

let exp = express();
exp.disable("x-powered-by");

let app = express(); 
app.use(helmet.hidePoweredBy());

app.use(bodyParser.json());

app.use('/', routes);

app.use('/graphql', graphqlHTTP({
    schema: userSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) { 
        return err
    }
}));

const PORT = process.env.PORT || 8081;
  
app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`);
});

app.use((error, req, res, next) => { 
    res.send(error.message);
})