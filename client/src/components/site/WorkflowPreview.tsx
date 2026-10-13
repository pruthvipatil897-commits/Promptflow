import { Check, CircleDot, GitBranch, Sparkles, UserRound } from "lucide-react";
import type { WorkflowStep } from "./siteContent";

type WorkflowPreviewProps = {
  steps: WorkflowStep[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

const stepMeta = {
  trigger: { label: "Trigger", Icon: CircleDot },
  ai: { label: "AI step", Icon: Sparkles },
  human: { label: "Human review", Icon: UserRound },
  result: { label: "Result", Icon: Check },
} as const;

export default function WorkflowPreview({
  steps,
  title = "Support workflow",
  subtitle = "Draft · ready to review",
  compact = false,
}: WorkflowPreviewProps) {
  return (
    <div className={`workflow-card${compact ? " workflow-card--compact" : ""}`}>
      <div className="workflow-card__head">
        <div className="workflow-card__title-wrap">
          <span className="workflow-card__glyph" aria-hidden="true"><GitBranch size={16} /></span>
          <div>
            <p className="workflow-card__title">{title}</p>
            <p className="workflow-card__subtitle">{subtitle}</p>
          </div>
        </div>
        <span className="workflow-status"><span /> Draft</span>
      </div>
      <ol className="workflow-list" aria-label={`${title} steps`}>
        {steps.map((step, index) => {
          const meta = stepMeta[step.kind];
          const Icon = meta.Icon;
          return (
            <li className={`workflow-step workflow-step--${step.kind}`} key={`${step.label}-${index}`}>
              <span className="workflow-step__marker" aria-hidden="true"><Icon size={15} strokeWidth={2.1} /></span>
              <div className="workflow-step__copy">
                <div className="workflow-step__topline">
                  <span className="workflow-step__kind">{meta.label}</span>
                  <span className="workflow-step__index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="workflow-step__label">{step.label}</p>
                {!compact && <p className="workflow-step__detail">{step.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="workflow-card__foot">
        <span className="workflow-card__foot-dot" /> Nothing goes live until you review it
      </div>
    </div>
  );
}
