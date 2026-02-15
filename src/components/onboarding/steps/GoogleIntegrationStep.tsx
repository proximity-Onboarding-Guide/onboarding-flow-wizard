import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";

const items = [
  { id: "signin", label: "Sign in to Google" },
  { id: "account", label: "Choose your Google account" },
  { id: "continue", label: "Continue to LeadConnector" },
  { id: "authorize", label: "Authorize permissions" },
  { id: "analytics", label: "Select analytics property" },
  { id: "gbp", label: "Choose your GBP page" },
  { id: "confirm", label: "Confirm connection" },
];

export default function GoogleIntegrationStep() {
  const { completeStep, setCurrentStep, checkedItems } = useOnboarding();
  const done = allChecked("google", items, checkedItems);

  const handleNext = () => {
    completeStep("google");
    setCurrentStep("calendar");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Connect Google & GBP</h2>
        <p className="text-muted-foreground text-sm">
          Link your Google account for analytics and Google Business Profile.
        </p>
      </div>

      <OnboardingChecklist stepPrefix="google" items={items} />

      <StepActionButton onClick={handleNext} disabled={!done}>
        Google Connected
      </StepActionButton>
    </div>
  );
}
