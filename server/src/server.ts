import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { brandTypeDefs } from './graphql/typedefs/brand.typedefs.ts';
import { brandResolvers } from './graphql/resolvers/brand.resolver.ts';
import { perfumeTypeDefs } from './graphql/typedefs/perfume.typedefs.ts';
import { PerfumeResolvers } from './graphql/resolvers/perfume.resolver.ts';

// import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";


const typeDefs = `
    type Query 
    type Mutation 
    ${perfumeTypeDefs}
    ${brandTypeDefs}
`;



const resolvers = {
    Query: {
      ...PerfumeResolvers.Query,
      ...brandResolvers.Query
    },
    Mutation: {
      ...PerfumeResolvers.Mutation,
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