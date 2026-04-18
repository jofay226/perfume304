import { brandService } from "../../services/brand.services.ts";

export const brandResolvers = {
  Mutation: {
    createBrand: async (_, {params}: {params: {name: string}}) => {      
        const newBrand = await brandService.createBrand(params.name)
        return newBrand
    },
    deleteBrand: async (_, args: {id: string}) => {
      const deletedBrand = await brandService.deleteBrand(args.id)
      return deletedBrand
    }
  },
  Query: {
    getAllBrands: async () => {      
        return await brandService.getAllBrands()
    }
  } 
};



