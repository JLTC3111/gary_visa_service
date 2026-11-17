# Gary Group — Codex Operating Rules

These instructions apply to all work under `gary_group/`, including Gary Home, Gary Visa, Teaching Jobs, shared components, and `access_management_portal/`. Apply more specific project instructions only when they do not conflict with the safety and cost rules below.

## 1. Absolute rule: NO screenshots

- **Never take, generate, save, download, or attach screenshots or screen recordings** during tasks. This includes browser screenshots, full-page captures, automated visual snapshots, Playwright screenshots, computer-use captures, image-to-image visual diffs, and screenshot-based tests.
- Do not launch a browser or computer-use workflow that captures screenshots implicitly. Do not use a visual agent as a workaround.
- You may inspect images or screenshots **already provided by the user**. Do not create new captures yourself.
- Verify UI changes through focused source inspection, DOM/CSS reasoning, component assertions, accessibility checks, and targeted nonvisual tests. Clearly label visual appearance **not visually verified** when no user-supplied evidence confirms it.
- Never claim that a screenshot was reviewed, a visual bug is fixed, or desktop/mobile appearance is verified when you have only inspected code. Request specific user feedback only when genuinely needed.

## 2. Credit, token, and tool discipline

- Treat compute, tokens, credits, and tool calls as scarce. Prefer a small, correct patch over long autonomous exploration.
- **Do not spawn subagents, parallel agents, multi-agent/Ultra workflows, or additional model calls** unless the user explicitly authorizes them for the current task. Do not change the selected model or reasoning mode on your own.
- Start by reading the explicit request, relevant instruction files, and only the files likely involved. Use targeted searches and narrow diffs; avoid entire-repository dumps, repeated re-reading, or exhaustive speculative audits.
- Give a short plan for nontrivial tasks. Make the smallest scope of changes that satisfies it. Do not extend a task into unrelated improvements.
- Run the cheapest relevant checks first. Do not repeatedly retry a failing command without a changed hypothesis or a corrective action. No polling loops or long-running exploratory sessions.
- **Do not run repository-wide builds, full test suites, browser automation, or dependency installs by default.** Run them only when the user specifically requests them or they are strictly necessary and proportionate to the change. Prefer narrow tests for touched modules.
- Do not claim or report `npm run build passes` as a generic completion statement. Report only actual, relevant checks performed and their precise results.
- If a task becomes unexpectedly large, requires broad repo changes, major dependencies, costly validation, or security-sensitive actions, **stop and present a concise scope/cost tradeoff** instead of spending more credits without approval.
- Do not guess the user's remaining credit balance. There is no guaranteed mapping from these instructions to billed usage; keep work economical regardless of model.

## 3. Scope and change control

- Preserve the user's named scope. Changes to one platform do not authorize edits to the others.
- Treat Gary Home, Gary Visa, and Teaching Jobs as distinct products with independent designs and operational workflows. Shared UI patterns do not imply identical appearance or an automatic shared refactor.
- Preserve working behavior, routing, EN/VI localization, SEO, accessibility, form state, file uploads, publishing workflows, and existing light/dark theme support.
- Never silently remove form fields, permissions, features, test coverage, or historical data while refactoring.
- Inspect relevant Git history when specifically asked to restore an earlier component. Recover presentation/interaction without blindly reverting subsequent bug fixes or features.
- Never commit, push, deploy, change domains, modify production configuration, run migrations, alter permissions, or perform credential operations unless the user has explicitly authorized that action.

## 4. Authentication and access management: special restrictions

- The Gary Group Central Access Portal Revision 2 architecture is **design-only until independently approved for implementation**.
- Keep identity authentication, application membership, central administration, staff suspension, and identity-wide credential security separate.
- Do not grant cross-app access through a Home role, infer authority from labels/email, bypass RLS, or introduce legacy-or-central permission fallbacks.
- Treat AUTH-003 (Home-derived shared credential authority), protected Group Owner safeguards, historical roster/FK preservation, and permission compatibility as release blockers per the approved security plan.
- Avoid printing secrets, tokens, password-reset links, private documents, or service-role keys in logs or responses. Use mocks/fixtures for security tests unless a separately authorized environment is supplied.

## 5. UI implementation quality without screenshots

- Prefer semantic theme tokens and existing design systems over scattered hardcoded overrides.
- Inspect all affected states: light/dark/system, loading, empty, error, success, hover/focus, dialogs, editors, resize/fullscreen, and mobile breakpoints through code and targeted checks.
- Ensure controls remain keyboard accessible and that CSS contrast and layout behavior are testable without visual capture.
- If visual precision remains uncertain, describe the uncertainty and offer a small set of specific, user-checkable things to look at. Do not claim pixel-perfect fidelity.

## 6. Required completion format

Keep the final report brief and factual:

1. **Changed:** files/components and behavior, grouped by platform.
2. **Verified:** exact targeted checks actually executed; distinguish passing, failing, and not run.
3. **Unverified:** visual appearance and any scenarios not checked. Never substitute screenshots or invented browser observations.
4. **Risks / follow-up:** only genuine blockers or next actions; no unrelated proposals.

Default objective: **minimum sufficient work, zero screenshots, no surprise credit burn, no exaggerated verification claims.**
