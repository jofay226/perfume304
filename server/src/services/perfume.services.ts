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
    },
    getPerfumes: async (filters) => {
        const perfumes = await prisma.perfume.findMany({
            where: {
                ...(filters.brandId && {brandId: filters.brandId}),
                variant: {
                    some: {
                        ...(filters.size && {size: filters.size}),
                        ...(filters.concentration && {concentration: filters.concentration})
                    }
                }
            }
        })  

        return perfumes 
    }
}

