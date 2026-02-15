import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";

const items = [
  { id: "main", label: "Select your main calendar" },
  { id: "conflict", label: "Enable conflict calendars" },
  { id: "save", label: "Save settings" },
];

export default function CalendarStep() {
  const { completeStep, setCurrentStep, checkedItems } = useOnboarding();
  const done = allChecked("calendar", items, checkedItems);

  const handleNext = () => {
    completeStep("calendar");
    setCurrentStep("business-manager");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Calendar Setup</h2>
        <p className="text-muted-foreground text-sm">
          Configure your calendar integration for scheduling.
        </p>
      </div>

      <OnboardingChecklist stepPrefix="calendar" items={items} />

      <StepActionButton onClick={handleNext} disabled={!done}>
        Calendar Connected
      </StepActionButton>
    </div>
  );
}
