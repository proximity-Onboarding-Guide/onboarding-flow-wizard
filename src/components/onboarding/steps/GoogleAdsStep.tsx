import { useOnboarding } from "@/context/OnboardingContext";
import StepActionButton from "../StepActionButton";
import { Copy, Check, Mail } from "lucide-react";
import { useState } from "react";

const INVITE_EMAIL = "info@proximityagency.ca";

export default function GoogleAdsStep() {
  const { planType, completeStep, setCurrentStep } = useOnboarding();
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(INVITE_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    completeStep("google-ads");
    if (planType === "ads") setCurrentStep("final");
    else setCurrentStep("sms");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Google Ads Access</h2>
        <p className="text-muted-foreground text-sm">
          Invite us as an Admin to your Google Ads account.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <p className="text-xs font-medium uppercase tracking-wider">
            Invite this email as Admin
          </p>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 text-base font-mono font-semibold text-foreground bg-muted px-3 py-2 rounded-lg">
            {INVITE_EMAIL}
          </code>
          <button
            onClick={copyEmail}
            className="p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
          className="w-4 h-4 rounded border-muted-foreground/30 accent-primary"
        />
        <span className="text-sm font-medium text-foreground">
          I've sent the invitation
        </span>
      </label>

      <StepActionButton onClick={handleNext} disabled={!confirmed}>
        Invitation Sent
      </StepActionButton>
    </div>
  );
}
