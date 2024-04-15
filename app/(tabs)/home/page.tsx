import ProductList from "@/components/product-list";
import TabBar from "@/components/tab-bar";
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

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Product() {
  const initialProducts = await getInitialProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div className="max-w-screen-sm mx-auto">
      <Link href="/products/add" className="flex gap-5">
        <div className="flex w-full flex-col px-5 pt-5">
          <div className="flex w-full flex-col items-center justify-center rounded-md border-[1px] border-dashed border-neutral-400 pb-5 text-neutral-400 hover:border-neutral-600 hover:text-neutral-600">
            <PlusIcon className="h-12" />
            <div className="text-sm">신규 프로젝트를 추가해주세요.</div>
          </div>
        </div>
      </Link>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <TabBar />
    </div>
  );
}
