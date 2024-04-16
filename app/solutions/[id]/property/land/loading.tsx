import ContentTab from "@/components/content-tab";
import Loader from "@/components/loader";

export default function LandLoading() {
  return <>
    <Loader />
    <ContentTab
      id={0}
      prevUrl=""
      postUrl=""
      prevKey="사업개요"
      postKey="건축물현황"
    />;
  </>
}
