import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import WelcomeStep from "@/components/onboarding/steps/WelcomeStep";
import LoginStep from "@/components/onboarding/steps/LoginStep";
import SocialPlannerStep from "@/components/onboarding/steps/SocialPlannerStep";
import GoogleIntegrationStep from "@/components/onboarding/steps/GoogleIntegrationStep";
import CalendarStep from "@/components/onboarding/steps/CalendarStep";
import BusinessManagerStep from "@/components/onboarding/steps/BusinessManagerStep";
import GoogleAdsStep from "@/components/onboarding/steps/GoogleAdsStep";
import SmsStep from "@/components/onboarding/steps/SmsStep";
import FinalStep from "@/components/onboarding/steps/FinalStep";

function StepRouter() {
  const { currentStep } = useOnboarding();

  const steps: Record<string, React.ReactNode> = {
    welcome: <WelcomeStep />,
    login: <LoginStep />,
    social: <SocialPlannerStep />,
    google: <GoogleIntegrationStep />,
    calendar: <CalendarStep />,
    "business-manager": <BusinessManagerStep />,
    "google-ads": <GoogleAdsStep />,
    sms: <SmsStep />,
    final: <FinalStep />,
  };

  return <>{steps[currentStep] || <WelcomeStep />}</>;
}

export default function Index() {
  return (
    <OnboardingProvider>
      <OnboardingLayout>
        <StepRouter />
      </OnboardingLayout>
    </OnboardingProvider>
  );
}
