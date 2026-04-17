import { brandService } from "../../services/brand.services.ts";

export const brandResolvers = {
  Mutation: {
    createBrand: async (_, {params}: {params: {name: string}}) => {      
        const newBrand = await brandService.createBrand(params.name)
        return newBrand
    }
  },
  Query: {
    getAllBrands: async () => {      
        return await brandService.getAllBrands()
    }
  } 
};



