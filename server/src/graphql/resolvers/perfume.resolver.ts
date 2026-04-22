import { perfumeService } from "../../services/perfume.services.ts";

export const PerfumeResolvers = {
  Query: {
    
  },
  Mutation: {
    createPerfume : async (_: any, {input} ) => {
      console.log(input.variants);
      
      const newPerfume = await perfumeService.createPerfume(input) 

      return newPerfume 
    }
  }
};
