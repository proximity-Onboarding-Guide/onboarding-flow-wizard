import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";

const items = [
  { id: "marketing", label: "Open Marketing section" },
  { id: "planner", label: "Start Social Planner" },
  { id: "facebook", label: "Select your Facebook Page" },
  { id: "permissions", label: "Accept permissions" },
  { id: "connect", label: "Connect the page" },
  { id: "instagram", label: "Add Instagram account" },
  { id: "select-ig", label: "Select your IG account" },
  { id: "get-started", label: "Click Get Started" },
  { id: "dashboard", label: "Confirm dashboard is visible" },
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
