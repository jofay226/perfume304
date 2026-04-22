import prisma from "../libs/prisma.ts"

export const perfumeService = {
    createPerfume: async ({name, description, brandId, variants}) => {
        const newPerfume = await prisma.perfume.create({
            data: {
                name,
                description,
                brandId,
                variant: {
                    create: variants
                }
            }
        })

        return newPerfume
    } 
}

