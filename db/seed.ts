import { PrismaClient } from "@prisma/client"
import sampleData from "./sample-data"

async function main() {
    const prismaClient = new PrismaClient();
    // clear every existing db records
    await prismaClient.product.deleteMany();
    await prismaClient.user.deleteMany();
    // insert new db data
    await prismaClient.product.createMany({
        data: sampleData.products
    });

    await prismaClient.user.createMany({
        data: sampleData.users
    })

    console.log("Database seed successfully")
}

main();