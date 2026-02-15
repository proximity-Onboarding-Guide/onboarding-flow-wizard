import { useOnboarding, PlanType } from "@/context/OnboardingContext";
import { Megaphone, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans: { type: PlanType; title: string; description: string; icon: React.ReactNode }[] = [
  {
    type: "planner",
    title: "Social Planner Only",
    description: "Content scheduling & social media management",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    type: "ads",
    title: "Content & Ads",
    description: "Social planner plus ad campaign management",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    type: "automation",
    title: "Content + Ads + Automation",
    description: "Full suite with CRM, calendar & SMS automation",
    icon: <Zap className="w-6 h-6" />,
  },
];

export default function WelcomeStep() {
  const { setPlanType, setCurrentStep, completeStep } = useOnboarding();

  const selectPlan = (plan: PlanType) => {
    setPlanType(plan);
    completeStep("welcome");
    setCurrentStep("login");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
          Welcome aboard
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Let's set up your account
        </h1>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          Select the service you've purchased to begin your personalized onboarding.
        </p>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <button
            key={plan.type}
            onClick={() => selectPlan(plan.type)}
            className={cn(
              "w-full flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 text-left group",
              "bg-card border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
              "hover:-translate-y-0.5 active:translate-y-0"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
              {plan.icon}
            </div>
            <div>
              <p className="font-semibold text-foreground">{plan.title}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
