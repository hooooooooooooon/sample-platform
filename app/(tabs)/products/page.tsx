import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Product() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <Link href="/products/add" className="flex gap-5">
        <div className="pt-5 px-5 flex flex-col w-full">
          <div className="border-neutral-600 text-neutral-600 border-2 border-dashed rounded-md flex justify-center items-center w-full hover:border-neutral-500 hover:text-neutral-500">
            <PlusIcon className="h-28" />
          </div>
        </div>
      </Link>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
