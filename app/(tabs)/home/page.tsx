import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache as nextCache } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  revalidate: 60,
});

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Home",
};

export default async function Product() {
  const initialProducts = await getCachedProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div>
      <Link href="/products/add" className="flex gap-5">
        <div className="pt-5 px-5 flex flex-col w-full">
          <div className="pb-5 flex flex-col border-neutral-600 text-neutral-600 border-2 border-dashed rounded-md justify-center items-center w-full hover:border-neutral-500 hover:text-neutral-500">
            <PlusIcon className="h-16" />
            <div className="text-sm">신규 프로젝트를 추가해주세요.</div>
          </div>
        </div>
      </Link>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
    </div>
  );
}
