import express from "express";
import routes from './routes/UserRoutes';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { userSchema } from './graphql/userSchema';
import * as graphqlResolver from './graphql/userResolver';
import helmet from 'helmet';

// import csurf from 'csurf';

import './database'

let exp = express();
exp.disable("x-powered-by");

let app = express(); // Compliant
app.use(helmet.hidePoweredBy());
    
// const csrf = csurf();
// app.use(csrf);

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