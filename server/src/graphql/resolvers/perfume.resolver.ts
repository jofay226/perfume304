import { perfumeService } from "../../services/perfume.services.ts";

export const PerfumeResolvers = {
  Query: {
    getPerfumes: async (_, {input}) => {
      console.log(input);
      
      const perfumes = await perfumeService.getPerfumes(input)
      console.log(perfumes);  
      return perfumes
    }
  },
  Mutation: {
    createPerfume : async (_: any, {input} ) => {
      
      const newPerfume = await perfumeService.createPerfume(input) 

      return newPerfume 
    }
  }
};


