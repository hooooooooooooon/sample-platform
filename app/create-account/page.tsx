import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">가입을 위해 아래의 내용을 입력해주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="성함" required errors={[]} />
        <FormInput type="email" placeholder="이메일" required errors={[]} />
        <FormInput
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호 재입력"
          required
          errors={[]}
        />
        <FormButton loading={false} text="회원가입하기" />
      </form>
      <SocialLogin />
    </div>
  );
}
