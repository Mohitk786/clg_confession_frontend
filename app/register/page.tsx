import { getColleges } from "@/actions/getColleges";
import RegisterForm from "@/components/onboarding/register";
import { useSearchParams } from "next/navigation";

const page = async () => {
  const { colleges } = await getColleges();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div>
      <RegisterForm colleges={colleges} email={email} />
    </div>
  );
};

export default page;
