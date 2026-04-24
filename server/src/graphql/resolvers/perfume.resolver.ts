import { perfumeService } from "../../services/perfume.services.ts";

export const PerfumeResolvers = {
  Query: {
    
  },
  Mutation: {
    createPerfume : async (_: any, {input} ) => {
      
      const newPerfume = await perfumeService.createPerfume(input) 

      return newPerfume 
    }
  }
};


