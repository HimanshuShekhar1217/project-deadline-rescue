import { Sparkles, ChevronRight, RefreshCw } from "lucide-react";
import Card from "../common/Card";

const AIRecommendation = ({
  plan,
  onRegenerate,
  regenerating = false,
}) => {
  if (!plan) return null;

  return (
    <Card
      className="ai-rec fade-up d1"
      testId="ai-recommendation-card"
    >
      <div className="card-count" data-testid="ai-steps-count">{(plan.steps ?? []).length}</div>
      <div className="ai-hdr">
        <span className="pulse" />
        <Sparkles
          size={14}
          style={{ color: "var(--accent)" }}
        />
        <span>AI Rescue Plan</span>
      </div>

      <p
        className="ai-summary"
        data-testid="ai-summary"
      >
        {plan.summary}
      </p>

      <ol className="ai-steps">
        {(plan.steps ?? []).map((step, idx) => (
          <li
            key={step.id ?? idx}
            className="ai-step"
            data-testid={`ai-step-${idx + 1}`}
          >
            <span className="num">{idx + 1}</span>

            <div>
              <h6>{step.title}</h6>
              <p>{step.detail}</p>
            </div>

            <ChevronRight
              size={16}
              className="chev"
            />
          </li>
        ))}
      </ol>

      <div className="ai-foot">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onRegenerate}
          data-testid="ai-regenerate-btn"
        >
          <RefreshCw
            size={14}
            className={regenerating ? "spin" : ""}
          />
          Regenerate plan
        </button>

        <button
          type="button"
          className="btn btn-primary"
          data-testid="ai-apply-plan-btn"
        >
          Apply all steps
        </button>
      </div>
    </Card>
  );
};

export default AIRecommendation;