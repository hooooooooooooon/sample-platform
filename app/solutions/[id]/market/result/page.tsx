import ContentTab from "@/components/content-tab";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

async function getIsOwner(userId: number) {
  return false;
}

async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  return product;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
  revalidate: 60,
  tags: ["product-detail"],
});

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function BuildingOverview({
  params,
}: {
  params: { id: string };
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getCachedProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  return (
    <>
      <div className="mx-auto max-w-screen-2xl">
        <div className="mx-12 mt-5 mb-32">
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#4169E1]">
                Market Analysis
              </h3>
              <h4 className="pt-1 text-3xl font-semibold">분양가 산출</h4>
            </div>
            <div className="text-sm font-semibold text-[#4169E1]">
              Alpha.K.A
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 pt-10">
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  분양가
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentTab
        id={id}
        prevUrl="/market/sale"
        postUrl=""
        prevKey="실거래가 분석"
        postKey="사업개요"
      />
    </>
  );
}
