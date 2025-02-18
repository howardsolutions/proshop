'use server'

import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get latest product
export async function getLatestProducts() {

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' }
    });

    return convertToPlainObject(data);
}

// Get single product by its slug
export async function getProductBySlug(slug: string) {

    const productBySlug = await prisma.product.findFirst({
        where: {
            slug: slug
        }
    });

    return productBySlug
}
