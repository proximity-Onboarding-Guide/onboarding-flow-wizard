import { useOnboarding } from "@/context/OnboardingContext";
import OnboardingChecklist, { allChecked } from "../OnboardingChecklist";
import StepActionButton from "../StepActionButton";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const BUSINESS_ID = "125866307077121";

const items = [
  {
    id: "ads-manager",
    label: "Open Ads Manager",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d0547c82e00dcaeb74a71.jpeg",
  },
  {
    id: "settings",
    label: "Open Business Settings",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d0547863715056aa36116.jpeg",
  },
  {
    id: "pages",
    label: "Go to Pages",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d054787a5d30cf7d832ca.jpeg",
  },
  {
    id: "assign",
    label: "Click Assign Partner",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d054787a5d315ebd832c9.jpeg",
  },
  {
    id: "paste",
    label: "Paste the Business ID",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d0547863715ea86a36115.jpeg",
  },
  {
    id: "permissions",
    label: "Enable all permissions",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d054702dbb052f1d8b1e8.jpeg",
  },
  {
    id: "verify-page",
    label: "Verify page assignment",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d063bdf12361f816fbd0d.png",
  },
  {
    id: "ad-account",
    label: "Go to Ad Accounts section",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d125d1a57416cc27e3724.png",
  },
  {
    id: "assign-ad",
    label: "Assign partner to Ad Account",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d125d02dbb04087d8c543.png",
  },
  {
    id: "ad-permissions",
    label: "Enable ad account permissions",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d125ddf9bd140078ca10b.png",
  },
  {
    id: "confirm",
    label: "Confirm all assets added",
    image: "https://assets.cdn.filesafe.space/ssV8rkOt67ZLuYMc9myd/media/663d12ca86371548fda37355.png",
  },
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
