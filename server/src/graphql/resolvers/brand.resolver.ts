import { brandService } from "../../services/brand.services.ts";

export const brandResolvers = {
  Mutation: {
    createBrand: async (_, {params}: {params: {name: string}}, context) => {
        console.log(context);
        
        console.log(params);
        
        const newBrand = await brandService.createBrand(params.name)
        return newBrand
    }
  },
  Query: {
    getBrands: async () => {
      // console.log(context);
      
        return await brandService.getBrands()
    }
  }
};


