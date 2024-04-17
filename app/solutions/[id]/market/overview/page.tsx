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
              <h4 className="pt-1 text-3xl font-semibold">시장분석-1</h4>
            </div>
            <div className="text-sm font-semibold text-[#4169E1]">
              Alpha.K.A
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 pt-10">
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                구축 위주의 원주 구도심 APT 공급 시장
              </h5>
              <p className="pt-2 text-base font-normal text-neutral-600">
                본 사업부지가 입지하고 있는 원주 학성동을 포함한 중앙동, 일산동,
                원인동 구도심 내에는 인근 신도시 대비 현저하게 부족한
                수준입니다. 노후화된 빌라 및 나홀로 아파트, 소규모 단지형
                아파트가 혼재되어 있는 주거 시장입니다.
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  APT 공급 추이 (2013~2019)
                </h5>
                <span className="text-xs">(단위: 세대)</span>
              </div>
              <div className="pt-2">
                <div className="h-72 w-full bg-neutral-200"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  공급 분포
                </h5>
              </div>
              <div className="pt-2">
                <div className="h-96 w-full bg-neutral-200"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold text-neutral-800">
                  원주시 학성동 일대 아파트 공급 현황 (2020~)
                </h5>
              </div>
              <div className="pt-2">
                <table className="h-[28rem] w-full table-auto border-y-2 border-neutral-400">
                  <thead className="border-b-[1px] border-neutral-300 bg-neutral-100">
                    <tr>
                      <th
                        rowSpan={2}
                        className="w-[10%] border-r-[1px] border-neutral-300"
                      >
                        구분
                      </th>
                      <th
                        rowSpan={2}
                        className="border-r-[1px] border-neutral-300"
                      >
                        소재지
                      </th>
                      <th
                        rowSpan={2}
                        className="w-[10%] border-r-[1px] border-neutral-300"
                      >
                        지목
                      </th>
                      <th
                        colSpan={2}
                        className="border-b-[1px] border-neutral-300"
                      >
                        면적
                      </th>
                    </tr>
                    <tr>
                      <th className="w-[15%] border-r-[1px] border-neutral-300">
                        sqm
                      </th>
                      <th className="w-[15%]">평</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-600 *:text-sm">
                    {[1, 1, 1, 1, 1].map((_, idx) => (
                      <tr key={idx} className="border-b-[1px] last:border-b-0">
                        <td className="w-[10%] border-r-[1px] border-neutral-300 text-center font-normal">
                          1
                        </td>
                        <td className="border-r-[1px] border-neutral-300 text-center font-normal">
                          강원도 원주시 학성동 1023-70
                        </td>
                        <td className="w-[10%] border-r-[1px] border-neutral-300 text-center font-normal">
                          대
                        </td>
                        <td className="w-[15%] border-r-[1px] border-neutral-300 text-center font-normal">
                          18,067
                        </td>
                        <td className="w-[15%] text-center font-normal">
                          5,465
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentTab
        id={id}
        prevUrl="/population/trend"
        postUrl="/market/trend"
        prevKey="수요분석-2"
        postKey="시장분석-2"
      />
    </>
  );
}
