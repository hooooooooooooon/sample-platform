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

export default async function LandOverview({
  params,
}: {
  params: { id: string };
}) {
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
                Property Overview
              </h3>
              <h4 className="pt-1 text-3xl font-semibold">토지현황</h4>
            </div>
            <div className="text-sm font-semibold text-[#4169E1]">
              Alpha.K.A
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(640px,_1fr))] gap-12 pt-10">
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                토지 기본 정보
              </h5>
              <p className="pt-2 text-base font-normal text-neutral-600">
                학성동 1023-70 일원에 위치한 사옥부지는 총 2개 필지로 구성되어
                있으며, 대지면적은 약 5,650py 규모입니다. 부지 남측면으로 도로와
                접하고 있는 부지로 개발사업 진행 시 사업자의 선호에 맞는
                효율적인 부지 활용이 가능합니다.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                토지 이용계획 확인원
              </h5>
              <div className="pt-2">
                <table className="h-32 w-full table-auto border-y-2 border-neutral-400">
                  <thead className="border-b-[1px] border-neutral-300 bg-neutral-100">
                    <tr>
                      <th className="w-1/2 border-r-[1px] border-neutral-300 px-8">
                        국토의 이용 및 계획에 관한 법률에 따른 지역·지구 등
                      </th>
                      <th>다른 법령 등에 따른 지역·지구 등</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-600 *:text-sm">
                    <tr>
                      <td className="border-r-[1px] border-neutral-300 text-center font-normal">
                        제2종 일반주거지역
                      </td>
                      <td className="text-center font-normal">
                        가축사육제한구역, 상대보호구역, 절대보호구역
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                토지조서
              </h5>
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
                        ㎡
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
            <div>
              <h5 className="text-lg font-semibold text-neutral-800">
                지적편집도
              </h5>
              <div className="pt-2">
                <div className="relative h-[28rem] w-full bg-neutral-200">
                  <Map />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContentTab
        id={id}
        prevUrl=""
        postUrl="/properties/building"
        prevKey="사업개요"
        postKey="건축물현황"
      />
    </>
  );
}
