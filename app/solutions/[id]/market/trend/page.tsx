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
              <h4 className="pt-1 text-3xl font-semibold">시장분석-2</h4>
            </div>
            <div className="text-sm font-semibold text-[#4169E1]">
              Alpha.K.A
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 pt-10">
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                매매/전세가격 추이
              </h5>
              <p className="pt-2 text-base font-normal text-neutral-600">
                원주는 과거 강원원주혁신도시 계획과 함께 분양물량이 대규모로
                공급되어 한동안 시장 가격에 영향이 있었으나, 최근 시장 가격은
                전국적인 흐름과 유사한 추세를 보이고 있습니다.
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  매매/전세가격 증감률 (2019.09~2022.03)
                </h5>
              </div>
              <div className="pt-2">
                <div className="h-96 w-full bg-neutral-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentTab
        id={id}
        prevUrl="/market/overview"
        postUrl="/market/subscription"
        prevKey="시장분석-1"
        postKey="분양가 분석"
      />
    </>
  );
}
