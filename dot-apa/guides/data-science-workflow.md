# Data Science & EDA Workflow in APA

Data Science is inherently **discovery-driven**. Unlike software engineering where you often know the "to-be" state, in Data Science, the **EDA (Exploratory Data Analysis)** defines the specification for the model.

This guide adapts the Spec-Kit/APA philosophy into a **Discovery-First** workflow.

---

## 1. The "Inverted" Workflow

In traditional software, you go `Spec → Plan → Implement`. 
In Data Science, you go `Research (EDA) → Spec (Findings) → Plan (Modeling) → Implement`.

### The Phases

| Phase | APA Command | Purpose |
|-------|-------------|---------|
| **Phase 0: Discovery** | `/apa.plan` (Research) | Perform EDA, check data quality, find correlations. |
| **Phase 1: Specification** | `/apa.specify` | Define the model requirements based on EDA findings. |
| **Phase 2: Implementation** | `/apa.implement` | Feature engineering, model training, and evaluation. |

---

## 2. Phase 0: The EDA as "Research"

In APA, you should treat EDA as a **Phase 0 Research Task**. You cannot write a specification for a model if you don't know if the features exist or if the data is clean.

### How to Plan an EDA Task:
```markdown
### Task 0.1: Exploratory Data Analysis
**Objective**: Identify predictive features and data quality issues.
**Guidance**:
- Check for missing values and outliers.
- Plot distributions of target variables.
- Calculate feature correlations.
- **Output**: Document findings in `research.md`.
```

**Key Insight**: The output of this research task **is the input** for your `/apa.specify` command.

---

## 3. Phase 1: The Data Science Specification

Once EDA is done, use `/apa.specify` to define the "Model Spec". 

### What a DS Spec looks like:
- **User Story**: "As a risk analyst, I need a model that predicts default with >0.8 AUC."
- **Functional Requirements**: 
  - "Must handle class imbalance found in EDA."
  - "Must use the top 5 correlated features identified in research.md."
- **Success Criteria**: 
  - "Inference latency < 100ms."
  - "Recall > 0.7 to minimize false negatives."

---

## 4. Phase 2: Adaptive Planning (The "Pivot")

Data Science requires frequent **Tactical Reassessments**. 

**Scenario**: You planned to use a Linear Regression, but Phase 0 research showed non-linear relationships.
**APA Action**: The Manager Agent uses the **Living Plan Philosophy** to update the subsequent tasks from "Linear Model" to "XGBoost/Random Forest" without needing a full restart.

---

## 5. Recommended Template: `eda-results-template.md`

When doing EDA, have your agents fill this out in the `apa/[branch]/research.md` file:

```markdown
## EDA Findings
- **Data Shape**: [Rows, Columns]
- **Target Distribution**: [Balanced/Imbalanced]
- **Key Correlations**: [Feature A -> Target (0.85)]
- **Data Issues**: [Missing values in Col X, Outliers in Col Y]
- **Proposed Approach**: [e.g., Random Forest due to non-linearity]
```

---

## Summary: How to approach it today

1.  **Start with `/apa.plan`**: Create a plan where **Phase 0** is purely EDA and Research.
2.  **Execute EDA**: Let the agents generate the `research.md` with data findings.
3.  **Run `/apa.specify`**: Use the findings to define the actual model requirements.
4.  **Update the Plan**: Refine the modeling tasks based on the new Spec.

This ensures your "Data Science" isn't just vibe-coding, but is grounded in the "Specification" provided by the data itself.
