import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const BUSINESS_ID = "125866307077121";

const items = [
  { id: "ads-manager", label: "Open Ads Manager" },
  { id: "settings", label: "Open Business Settings" },
  { id: "pages", label: "Go to Pages" },
  { id: "assign", label: "Click Assign Partner" },
  { id: "paste", label: "Paste the Business ID" },
  { id: "permissions", label: "Enable all permissions" },
  { id: "confirm", label: "Confirm assets added" },
];

export default function BusinessManagerStep() {
  const { completeStep, setCurrentStep, checkedItems } = useOnboarding();
  const [copied, setCopied] = useState(false);
  const done = allChecked("bm", items, checkedItems);

  const copyId = async () => {
    await navigator.clipboard.writeText(BUSINESS_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    completeStep("business-manager");
    setCurrentStep("google-ads");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Business Manager Setup</h2>
        <p className="text-muted-foreground text-sm">
          Grant partner access to your Facebook Business Manager.
        </p>
      </div>

      {/* Business ID card */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Business ID
        </p>
        <div className="flex items-center gap-3">
          <code className="flex-1 text-lg font-mono font-semibold text-foreground bg-muted px-3 py-2 rounded-lg">
            {BUSINESS_ID}
          </code>
          <button
            onClick={copyId}
            className="p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Assign this as a partner with full control, ads & content permissions.
        </p>
      </div>

      <OnboardingChecklist stepPrefix="bm" items={items} />

      <StepActionButton onClick={handleNext} disabled={!done}>
        Partner Added
      </StepActionButton>
    </div>
  );
}
