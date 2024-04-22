import Input from "@/components/input";
import Link from "next/link";
import { useFormState } from "react-dom";

interface AddressProps {
  id: number;
  address: {
    zipcode: string;
    category: string;
    road: string;
    parcel: string;
    bldnm: string;
  };
  point: { x: number; y: number };
}

async function getAddress({ query }: { query: string }) {
  const size = 10;
  const page = 1;
  const category = "parcel";
  const API_URL = `https://api.vworld.kr/req/search?service=search&request=search&version=2.0&size=${size}&page=${page}&query=${query}&type=address&category=${category}&format=json&errorformat=json&key=${process.env.VWORLD_KEY}`;
  const response = await fetch(API_URL);
  const result = await response.json();
  if (result.response.status === "OK") {
    const res = result.response.result;
    return res;
  }
}

export default async function Intro() { }
//   const query = "성북구 삼선동2가 88";
//   const [addressResults] = await Promise.all([getAddress({ query })]);
//   console.log(addressResults);
//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen p-6 max-w-screen-sm mx-auto">
//       <div className="w-full my-auto flex flex-col items-center gap-2 *:font-medium">
//         <form className="w-full">
//           <Input
//             name="address"
//             type="text"
//             placeholder="지번 주소를 입력하세요."
//             required
//           />
//         </form>
//       </div>
//       <div className="flex flex-col items-center gap-3 w-full">
//         <Link href="/sign-up" className="primary-btn text-lg py-2.5">
//           회원가입하고 시작하기
//         </Link>
//       </div>
//     </div>
//   );
// }
