import OnboardingPage from '@/components/onboarding/Index'
import { getColleges } from '@/actions/getColleges'

const page = async () => {
  const { colleges } = await getColleges();
  return <OnboardingPage colleges={colleges} />
}

export default page