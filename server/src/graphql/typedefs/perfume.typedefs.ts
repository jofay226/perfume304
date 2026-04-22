export const perfumeTypeDefs = `#graphql
  
  type Query {
    _empty: String
  }

  input VariantInput {
    price: Int
    size: Int 
    concentration: String
  }

  input PerfumeInput {
    name: String
    description: String
    brandId: ID
    variants: [VariantInput]
  }

  type Perfume {
    id: ID 
    name: String
  }

  type Mutation {
    createPerfume(input: PerfumeInput): Perfume
  }

`;