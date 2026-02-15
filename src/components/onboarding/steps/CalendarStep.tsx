import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";
import ZoomableImage from "../ZoomableImage";

const items = [
  {
    id: "open",
    label: "Open calendar settings",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c2a87863715a158a24659.png",
  },
  {
    id: "main",
    label: "Select your main calendar",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c4df0b4785080d12e15f0.png",
  },
  {
    id: "conflict",
    label: "Enable conflict calendars",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c4ead660abaecac885d71.png",
  },
  {
    id: "configure",
    label: "Configure availability",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c51b002dbb0cbc6d7a800.png",
  },
  {
    id: "confirm",
    label: "Confirm calendar sync",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c5311660abaeea988601d.png",
  },
  {
    id: "save",
    label: "Save settings",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663c53f4699c7e7c0323d94d.png",
  },
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
