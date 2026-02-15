import { Check } from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

interface OnboardingChecklistProps {
  stepPrefix: string;
  items: ChecklistItem[];
}

export default function OnboardingChecklist({
  stepPrefix,
  items,
}: OnboardingChecklistProps) {
  const { checkedItems, toggleCheckItem } = useOnboarding();

  return (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const key = `${stepPrefix}-${item.id}`;
        const checked = !!checkedItems[key];
        return (
          <button
            key={key}
            onClick={() => toggleCheckItem(key)}
            className={cn(
              "w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 text-left group",
              checked
                ? "bg-success/10 border-success/30"
                : "bg-card border-border hover:border-primary/30 hover:bg-accent/50"
            )}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div
              className={cn(
                "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                checked
                  ? "bg-success border-success checklist-check"
                  : "border-muted-foreground/30 group-hover:border-primary/50"
              )}
            >
              {checked && <Check className="w-3 h-3 text-success-foreground" />}
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-medium transition-colors",
                  checked ? "text-muted-foreground line-through" : "text-foreground"
                )}
              >
                {item.label}
              </p>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function allChecked(
  stepPrefix: string,
  items: { id: string }[],
  checkedItems: Record<string, boolean>
) {
  return items.every((item) => !!checkedItems[`${stepPrefix}-${item.id}`]);
}
