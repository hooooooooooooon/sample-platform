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
              <h4 className="pt-1 text-3xl font-semibold">수요분석-2</h4>
            </div>
            <div className="text-sm font-semibold text-[#4169E1]">
              Alpha.K.A
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 pt-10">
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                인구 현황
              </h5>
              <p className="pt-2 text-base font-normal text-neutral-600">
                원주시의 인구 수는 2022년 7월 기준으로 약 36만명이며, 매년
                지속적으로 증가하는 추세를 보입니다.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                인구 이동 추세
              </h5>
              <p className="pt-2 text-base font-normal text-neutral-600">
                원주시는 지속적으로 매 분기 인구가 유입되고 있습니다.
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  인구변동추이 (2016~2020)
                </h5>
                <span className="text-xs">(단위: 명)</span>
              </div>
              <div className="pt-2">
                <div className="h-[28rem] w-full bg-neutral-200"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  원주시 분기별 순이동 추이 (전입~전출)
                </h5>
                <span className="text-xs">(단위: 명)</span>
              </div>
              <div className="pt-2">
                <div className="h-[28rem] w-full bg-neutral-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentTab
        id={id}
        prevUrl="/population/overview"
        postUrl="/market/overview"
        prevKey="수요분석-1"
        postKey="시장분석-1"
      />
    </>
  );
}
