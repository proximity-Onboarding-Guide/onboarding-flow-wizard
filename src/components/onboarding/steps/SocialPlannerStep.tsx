import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";

const items = [
  {
    id: "marketing",
    label: "Open Marketing section",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c025c1a94584b2e2e815a.png",
  },
  {
    id: "planner",
    label: "Start Social Planner onboarding",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c03e7660aba49558821d4.png",
  },
  {
    id: "facebook",
    label: "Select your Facebook Page",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c1f31575d67641c7103cc.png",
  },
  {
    id: "permissions",
    label: "Accept Facebook permissions",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c0ab3660aba967b882c17.png",
  },
  {
    id: "connect",
    label: "Connect the page",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c2d79660aba3044884908.png",
  },
  {
    id: "instagram",
    label: "Add Instagram account",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c22c5660abaa42a88435a.png",
  },
  {
    id: "select-ig",
    label: "Choose your Instagram account",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c2568b47850b3082dff60.png",
  },
  {
    id: "get-started",
    label: "Click Get Started",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c26d6b4785066df2dffc7.png",
  },
  {
    id: "dashboard",
    label: "Confirm dashboard is visible",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c2847660aba4d7b88463d.png",
  },
];

export default function SocialPlannerStep() {
  const { planType, completeStep, setCurrentStep, checkedItems } = useOnboarding();
  const done = allChecked("social", items, checkedItems);

  const handleNext = () => {
    completeStep("social");
    if (planType === "planner") setCurrentStep("final");
    else if (planType === "ads") setCurrentStep("business-manager");
    else setCurrentStep("google");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Connect Social Accounts</h2>
        <p className="text-muted-foreground text-sm">
          Link your Facebook and Instagram accounts to the social planner.
        </p>
      </div>

      <OnboardingChecklist stepPrefix="social" items={items} />

      <StepActionButton onClick={handleNext} disabled={!done}>
        Social Accounts Connected
      </StepActionButton>
    </div>
  );
}
