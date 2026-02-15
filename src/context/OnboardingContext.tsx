import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type PlanType = "planner" | "ads" | "automation" | null;

export type StepId =
  | "welcome"
  | "login"
  | "social"
  | "google"
  | "calendar"
  | "business-manager"
  | "google-ads"
  | "sms"
  | "final";

interface OnboardingState {
  planType: PlanType;
  completedSteps: StepId[];
  currentStep: StepId;
  checkedItems: Record<string, boolean>;
}

interface OnboardingContextValue extends OnboardingState {
  setPlanType: (plan: PlanType) => void;
  completeStep: (step: StepId) => void;
  setCurrentStep: (step: StepId) => void;
  toggleCheckItem: (key: string) => void;
  isStepCompleted: (step: StepId) => boolean;
  getStepsForPlan: () => StepId[];
  getProgress: () => number;
  reset: () => void;
}

const STORAGE_KEY = "proximity-onboarding";

const defaultState: OnboardingState = {
  planType: null,
  completedSteps: [],
  currentStep: "welcome",
  checkedItems: {},
};

function loadState(): OnboardingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultState;
}

function saveState(state: OnboardingState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setPlanType = useCallback((plan: PlanType) => {
    setState((s) => ({ ...s, planType: plan }));
  }, []);

  const completeStep = useCallback((step: StepId) => {
    setState((s) => ({
      ...s,
      completedSteps: s.completedSteps.includes(step)
        ? s.completedSteps
        : [...s.completedSteps, step],
    }));
  }, []);

  const setCurrentStep = useCallback((step: StepId) => {
    setState((s) => ({ ...s, currentStep: step }));
  }, []);

  const toggleCheckItem = useCallback((key: string) => {
    setState((s) => ({
      ...s,
      checkedItems: { ...s.checkedItems, [key]: !s.checkedItems[key] },
    }));
  }, []);

  const isStepCompleted = useCallback(
    (step: StepId) => state.completedSteps.includes(step),
    [state.completedSteps]
  );

  const getStepsForPlan = useCallback((): StepId[] => {
    const base: StepId[] = ["welcome", "login", "social"];
    if (state.planType === "planner") return [...base, "final"];
    if (state.planType === "ads")
      return [...base, "business-manager", "google-ads", "final"];
    if (state.planType === "automation")
      return [
        ...base,
        "google",
        "calendar",
        "business-manager",
        "google-ads",
        "sms",
        "final",
      ];
    return ["welcome"];
  }, [state.planType]);

  const getProgress = useCallback(() => {
    const steps = getStepsForPlan();
    if (steps.length <= 1) return 0;
    const currentIdx = steps.indexOf(state.currentStep);
    return Math.round((currentIdx / (steps.length - 1)) * 100);
  }, [getStepsForPlan, state.currentStep]);

  const reset = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        setPlanType,
        completeStep,
        setCurrentStep,
        toggleCheckItem,
        isStepCompleted,
        getStepsForPlan,
        getProgress,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
