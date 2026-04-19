export const perfumeTypeDefs = `#graphql
  
  type Query {
    _empty: String
  }

  input VariantInput {
    price: Int
    size: Int 
    concentrate: String
  }

  input PerfumeInput {
    name: String
    decription: String
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