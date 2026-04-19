import prisma from "../libs/prisma.ts"

export const perfumeService = {
    createPerfume: async (payload) => {
        const newPerfume = prisma.perfume.create({
            data: {
                name: "Sport",
                description: 'Sport Sport Sport Sport',
                brandId: "fa4b2a28-800b-4070-8845-87ca2a46140a",
                variant: {
                    create: [
                        {
                            size: 50,
                            price: 55,
                            concentration: "Toilette"
                        },
                        {
                            size: 100,
                            price: 155,
                            concentration: "EAU DE PERFUMEE"
                        },
                        {
                            size: 150,
                            price: 200,
                            concentration: "Parfume"
                        },
                    ]
                }
            }
        })

        return newPerfume
    } 
}