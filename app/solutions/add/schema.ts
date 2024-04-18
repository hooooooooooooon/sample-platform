import { z } from "zod";

export const solutionSchema = z.object({
  photo: z.string({
    required_error: "사진을 추가해주세오.",
  }),
  title: z.string({
    required_error: "제목을 작성하십시오.",
  }),
  description: z.string({
    required_error: "내용을 작성하십시오.",
  }),
  price: z.coerce.number({
    required_error: "가격을 기입하십시오.",
  }),
});

export type SolutionType = z.infer<typeof solutionSchema>;
