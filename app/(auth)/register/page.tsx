
import { getColleges } from "@/actions/getColleges";
import RegisterForm from "@/components/onboarding/register";
import { useSearchParams } from "next/navigation";

const page = async() => {
  const { colleges } = await getColleges();

  return <RegisterForm colleges={colleges} />
};

export default page;
