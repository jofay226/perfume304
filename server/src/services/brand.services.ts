import prisma from "../libs/prisma.ts"

export const brandService = {
    createBrand: async (brandName: string) => {
        const brand = await prisma.brand.create({
            data: {
               name:  brandName
            }
        })
        return brand
    },
    getAllBrands: async () => await prisma.brand.findMany({}),
    deleteBrand: async (brandId: string) => {
        const deletedBrand = await prisma.brand.delete({
            where: {id:brandId }
        })

        return deletedBrand
    }
    
}