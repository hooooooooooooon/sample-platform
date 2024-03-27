import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  async function handleForm(formData: FormData) {
    "use server";
  }
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일을 통해 로그인해주세요.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
        <FormButton text="로그인하기" />
      </form>
      <SocialLogin />
    </div>
  );
}
