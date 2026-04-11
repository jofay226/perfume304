const typeDefs = `
    input BrandInput {
        name: String!
    }

    type Brand {
       id: ID
       name String 
    }

    extend type Mutation {
        createBrand(params:BrandInput): Brand
    }
`;