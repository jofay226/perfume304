import { perfumeService } from "../../services/perfume.services.ts";

export const PerfumeResolvers = {
  Query: {
    
  },
  Mutation: {
    createPerfume : async (_, args ) => {
      console.log(args);
      
      // const newPerfume = await perfumeService.createPerfume() 
      // console.log(newPerfume);

      return "success"
    }
  }
};
