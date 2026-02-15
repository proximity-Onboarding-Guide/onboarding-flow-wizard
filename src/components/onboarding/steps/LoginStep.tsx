import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";

const items = [
  { id: "login", label: "Go to the login page", description: "Open the platform and navigate to login" },
  { id: "otp", label: "Request OTP code", description: "Enter your email to receive a one-time code" },
  { id: "inbox", label: "Check your inbox", description: "Find the email with your verification code" },
  { id: "copy", label: "Copy the code", description: "Copy the 6-digit code from the email" },
  { id: "enter", label: "Enter the code & log in", description: "Paste the code to complete login" },
];

export default function LoginStep() {
  const { completeStep, setCurrentStep, checkedItems } = useOnboarding();
  const done = allChecked("login", items, checkedItems);

  const handleNext = () => {
    completeStep("login");
    setCurrentStep("social");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Log into the platform</h2>
        <p className="text-muted-foreground text-sm">
          Follow each step below. Check them off as you go.
        </p>
      </div>

      <OnboardingChecklist stepPrefix="login" items={items} />

      <StepActionButton onClick={handleNext} disabled={!done}>
        I'm logged in
      </StepActionButton>
    </div>
  );
}
