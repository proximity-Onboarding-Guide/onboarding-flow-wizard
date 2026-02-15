import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  ExternalLink,
  Smartphone,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const IOS_LINK = "https://apps.apple.com/in/app/lead-connector/id1564302502";
const ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.LeadConnector";

export default function FinalStep() {
  const { planType, completedSteps } = useOnboarding();

  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#e85d3a", "#f59e0b", "#10b981", "#3b82f6"],
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const checkItems = [
    { label: "Social accounts connected", done: completedSteps.includes("social") },
    ...(planType === "ads" || planType === "automation"
      ? [
          { label: "Business Manager access granted", done: completedSteps.includes("business-manager") },
          { label: "Google Ads invitation sent", done: completedSteps.includes("google-ads") },
        ]
      : []),
    ...(planType === "automation"
      ? [
          { label: "Google & GBP connected", done: completedSteps.includes("google") },
          { label: "Calendar configured", done: completedSteps.includes("calendar") },
          { label: "SMS registration complete", done: completedSteps.includes("sms") },
        ]
      : []),
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">You're all set!</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Your onboarding is complete. Here's a summary of everything configured.
        </p>
      </div>

      {/* Summary checklist */}
      <div className="space-y-2">
        {checkItems.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border",
              item.done
                ? "bg-success/10 border-success/30"
                : "bg-card border-border"
            )}
          >
            <CheckCircle2
              className={cn(
                "w-5 h-5 shrink-0",
                item.done ? "text-success" : "text-muted-foreground/30"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                item.done ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Action links */}
      <div className="space-y-3">
        <a
          href={IOS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors group"
        >
          <Smartphone className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          <span className="text-sm font-medium text-foreground flex-1">
            Download iOS App
          </span>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
        <a
          href={ANDROID_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors group"
        >
          <Smartphone className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          <span className="text-sm font-medium text-foreground flex-1">
            Download Android App
          </span>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
      </div>

      {/* Support */}
      <div className="rounded-xl border border-border bg-card p-5 text-center space-y-2">
        <MessageCircle className="w-5 h-5 text-muted-foreground mx-auto" />
        <p className="text-sm text-muted-foreground">
          Need help? Contact your client manager.
        </p>
        <a
          href="mailto:info@proximityagency.ca"
          className="text-sm font-semibold text-primary hover:underline"
        >
          info@proximityagency.ca
        </a>
      </div>
    </div>
  );
}
