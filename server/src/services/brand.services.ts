import prisma from "../libs/prisma.ts"

export const brandService = {
    createBrand: async (brandName: string) => {
        const brand = await prisma.brand.create({
            data: {
               name:  brandName
            }
        })
    
        return brand
    }
}