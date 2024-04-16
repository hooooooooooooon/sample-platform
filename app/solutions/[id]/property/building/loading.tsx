import ContentTab from "@/components/content-tab";
import Loader from "@/components/loader";

export default function BuildingLoading() {
  return <>
    <Loader />
    <ContentTab
      id={0}
      prevUrl=""
      postUrl=""
      prevKey="토지현황"
      postKey="수요분석-1"
    />;
  </>
}
