import { useOnboarding, StepId } from "@/context/OnboardingContext";
import { ArrowLeft, RotateCcw } from "lucide-react";

const stepLabels: Record<StepId, string> = {
  welcome: "Welcome",
  login: "Login",
  social: "Social Accounts",
  google: "Google",
  calendar: "Calendar",
  "business-manager": "Business Manager",
  "google-ads": "Google Ads",
  sms: "SMS Setup",
  final: "Complete",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentStep, getStepsForPlan, getProgress, setCurrentStep, reset } =
    useOnboarding();
  const steps = getStepsForPlan();
  const currentIdx = steps.indexOf(currentStep);
  const showProgress = currentStep !== "welcome";

  const goBack = () => {
    if (currentIdx > 0) {
      setCurrentStep(steps[currentIdx - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showProgress && currentIdx > 0 && (
              <button
                onClick={goBack}
                className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Proximity
            </span>
          </div>
          <div className="flex items-center gap-2">
            {showProgress && (
              <span className="text-xs text-muted-foreground font-medium">
                {stepLabels[currentStep]}
              </span>
            )}
            <button
              onClick={reset}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              title="Reset onboarding"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="h-1 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-r-full"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl step-enter">{children}</div>
      </main>
    </div>
  );
}
