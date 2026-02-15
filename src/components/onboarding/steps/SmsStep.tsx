import { useOnboarding } from "@/context/OnboardingContext";
import StepActionButton from "../StepActionButton";
import { useState } from "react";

const FORM_URL = "https://lien.proximityagency.ca/widget/form/iC8tyTk1Oq0GDwJAue4K";

export default function SmsStep() {
  const { completeStep, setCurrentStep } = useOnboarding();
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    completeStep("sms");
    setCurrentStep("final");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">SMS Registration</h2>
        <p className="text-muted-foreground text-sm">
          Complete the form below to set up SMS automation for your account.
        </p>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <iframe
          src={FORM_URL}
          className="w-full border-0"
          style={{ height: "500px" }}
          title="SMS Registration Form"
        />
      </div>

      <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
          className="w-4 h-4 rounded border-muted-foreground/30 accent-primary"
        />
        <span className="text-sm font-medium text-foreground">
          I've completed the form
        </span>
      </label>

      <StepActionButton onClick={handleNext} disabled={!confirmed}>
        Form Completed
      </StepActionButton>
    </div>
  );
}
