import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";

const items = [
  {
    id: "signin",
    label: "Sign in to Google",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c2b68575d673994711132.png",
  },
  {
    id: "account",
    label: "Choose your Google account",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c30dd575d673eda7113b4.png",
  },
  {
    id: "continue",
    label: "Continue to LeadConnector",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c31a9660abaf675884b19.png",
  },
  {
    id: "authorize",
    label: "Authorize permissions",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c3a3b7bf79300f6c33405.png",
  },
  {
    id: "analytics",
    label: "Select analytics property",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c3fc902dbb0edebd79a6c.png",
  },
  {
    id: "gbp",
    label: "Choose your GBP page",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c449c86371520cea25776.png",
  },
  {
    id: "connect",
    label: "Confirm Google connection",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c410002dbb0b84dd79aa7.png",
  },
  {
    id: "confirm",
    label: "Verify integration is active",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c44c0863715c7aba2578b.png",
  },
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
