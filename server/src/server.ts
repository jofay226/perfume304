import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { brandTypeDefs } from './graphql/typedefs/brand.typedefs.ts';
import { brandResolvers } from './graphql/resolvers/brand.resolver.ts';




const typeDefs = `
    type Query 
    type Mutation 

    ${brandTypeDefs}
`;



const resolvers = {
    Query: {
      ...brandResolvers.Query
    },
    Mutation: {
      ...brandResolvers.Mutation
    },
};




const server = new ApolloServer({
  typeDefs,
  resolvers,
});




const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },

});

console.log(`🚀  Server ready at: ${url}`);