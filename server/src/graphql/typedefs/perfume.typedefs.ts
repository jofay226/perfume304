export const perfumeTypeDefs = `#graphql


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


  input PerfumeFilters {
    size: Int 
    brandId: String 
    concentration: String
  }

    
  type Query {
    getPerfumes(input: PerfumeFilters): String
  }

  type Mutation {
    createPerfume(input: PerfumeInput): Perfume
  }

`;

