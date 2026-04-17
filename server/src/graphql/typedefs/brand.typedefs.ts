export const brandTypeDefs = `
    input BrandInput {
        name: String!
    }

    type Brand {
       id: ID
       name: String 
    }

    extend type Mutation {
        createBrand(params:BrandInput): Brand
    }
    
    extend type Query {
        getAllBrands: [Brand]
    }
`;