# Gary Visa staff appearance — 17 November 2026

## Root causes

The public website had a complete `gary-visa-theme` Light/Dark/System preference in `appearance-init.js`, including storage, system media-query updates and cross-tab updates. The authenticated portal did not load it, did not provide a theme selector and did not load the public presentation stylesheet. Public appearance therefore never reached staff content.

The sidebar independently decided its appearance using a different root attribute (`data-visa-staff-theme`) and an OS media query. It could turn dark while the header, main workspace, dashboards, CMS, forms and dialogs stayed light. Its help card inherited the old light background while its heading/link inherited the dark sidebar foreground. Other portal/component styles contained literal white/light backgrounds, slate text and scrollbar colors. The shared editor shell also received `--gw-surface:#fff` from its Visa host adapter. No portal-generated inline color styles were found; application inline styles control positioning/geometry only.

## Implementation

The portal now loads the **existing** `appearance-init.js` synchronously before its first stylesheet. It continues to own the single `gary-visa-theme` key and the existing `setGaryVisaTheme`/`gary:visual-preferences` interface. No second theme preference or provider was introduced. The initializer's only source change is its obsolete public-only comment.

`portal-theme-init.js` establishes the requested staff presentation before styles for `?area=staff`. `portal-theme.js` then follows the real body role, localizes an accessible Appearance select and synchronizes the host. A confirmed customer role retains the original customer appearance; this presentation scope does not grant staff access. The former `data-visa-staff-theme` attribute remains a resolved compatibility alias, with no independent preference or OS rules. Root `data-visa-theme` is authoritative. A `?area=staff` URL initializes dark appearance before rendering; a default customer entry that is subsequently identified as staff applies the staff palette after the existing role check.

`portal-theme.css` defines one staff-scoped semantic palette. Existing component declarations consume `--vp-*` roles for page/surface/raised/hover/control backgrounds, text, muted text, accents, borders, focus, statuses and overlays. Original light values remain the fallbacks, preserving the existing light layout and colors. Component files do not independently select dark mode. Portal base aliases (`--ink`, `--teal`, `--paper`, `--muted`, `--line`) bridge the current components to this interface.

Dark values include the requested page `#0D1924`, surface `#142838`, raised `#1E3545`, text `#F4F2ED` and cyan `#83CCD1`. Muted text is `#B2C3CF`; control borders use `#638193` so control boundaries retain at least 3:1 contrast on the control/elevated surface. Distinct success/warning/danger/info tokens retain readable status meaning. Button text is separate from normal text so a light cyan primary action never produces white-on-white content. Native text-link buttons, including Sign out, have a proper transparent button primitive rather than browser-default gray borders/backgrounds.

All themed elements inherit the same root palette immediately, including already-open native dialogs, shared CMS dialogs, resizable/fullscreen editors, file controls, custom select popovers and the Gary Apps switcher. Theme changes do not replace any form/editor nodes or write form values. Sidebar width, collapse/group preferences and editor geometry remain independent.

Covered components:

- Header, original grouped staff navigation, help/user cards, expanded/collapsed/mobile sidebar.
- Main workspace, application/CRM KPI cards, row tables, filters, pagination and statuses.
- Applications/case tabs, CRM details/editors/notes/activity, chat queue/thread/availability/messages.
- CMS collections, tables, editor fields/actions/findings/revisions, media library/upload UI.
- Trash, profile, loading/error/empty states, notifications, dialogs and confirmation presentation.
- Custom select dropdowns, file buttons/autofill surfaces, focus rings and theme-aware scrollbars.

Public CSS modules used by the portal retain their original values as fallbacks when the staff tokens are absent; no public-page theme behavior changes. The image-backed sign-in story remains an intentional fixed-color overlay.

## Modified files

| File | Responsibility |
| --- | --- |
| `dist/portal.html` | Before-style preference/scope initialization, stylesheet/module loading and labeled theme control. |
| `dist/appearance-init.js` | Correct comment: the same preference now serves public and portal hosts. |
| `dist/portal-theme-init.js` | Before-style staff presentation intent. |
| `dist/portal-theme.js` | Staff host, Light/Dark/System control, localization, role/area synchronization and theme-color metadata. |
| `dist/portal-theme.css` | Single semantic dark palette, base primitives, menu/editor bridge, scrollbar and responsive control styles. |
| `dist/portal.css`, `dist/workspace-tools.css` | Current portal/CRM/inbox/trash/profile declarations consume semantic colors with original light fallbacks. |
| `dist/portal-editors.css` | Current editor/action surfaces consume host tokens. |
| `dist/controls.css`, `dist/chat.css` | Existing controls/popovers/upload/chat component colors consume staff tokens when present. |
| `dist/staff-sidebar.css` | Consumes the same host palette; removes independent theme/OS decisions. |
| `dist/cms-foundation/styles.css`, `release.json` | Visa's pinned CMS styles consume the palette; vendored file hash and local application patch metadata updated. No shared canonical or other-app files changed. |
| `scripts/portal-theme.test.mjs`, `scripts/staff-sidebar.test.mjs`, `package.json` | Theme integration/contrast coverage and normal test inclusion. |
| `scripts/build-portal-theme-qa.mjs` | Reproducible local visual fixture using actual portal controllers and in-memory service data. |

`portal.js`, application/CRM/chat/CMS adapters, publishing workflow, authentication/authorization, APIs and database files remain unchanged. No migration, privilege or deployment is required by this change.

## Verification

- `npm test`: **95/95 passed**.
- `npm run test:cms`: **15/15 passed**.
- `npm run check`: **2 pages / 53 asset references passed**, including labels/links/translations/public-client configuration.
- JavaScript syntax checks for both new modules: passed.
- `git diff --check`: passed.

The new integration tests exercise every Light/Dark/System mode in both EN/VI, pre-style initialization, simulated OS changes, explicit preference precedence, cross-tab storage events, reload persistence and blocked storage. They cover all six staff route containers, desktop/mobile and expanded/collapsed navigation, and verify that an open maximized editor retains its original form, title, validation message, selected file, geometry and open state through changes. Existing real-portal tests continue to verify staff-only access, customer compatibility, application submission, CRM, chat, Trash and dirty-CMS navigation. CMS tests retain the existing review/translation/publication requirements.

Computed semantic palette checks confirm at least WCAG AA 4.5:1 for primary/muted/accent text on all defined dark surfaces and each status foreground/background pair, plus 3:1 control/focus contrast. This validates the defined color pairs, not every possible uploaded image or third-party/browser UI.

## Browser fixture and limitations

Run `node scripts/build-portal-theme-qa.mjs` and open:

`file:///private/tmp/gary-visa-theme-qa/visa.html?area=staff&theme=dark&view=applications`

Parameters: `theme=light|dark|system`, `lang=en|vi`, `view=applications|customers|inbox|cms|trash|profile`, optional `dialog=case`. The fixture bundles the actual current portal/CRM/inbox/CMS/trash/profile/sidebar/editor/form-control/theme modules. It only replaces service/auth/data adapters with in-memory demonstration data. The actual appearance initializer and preference mechanism are used unchanged. Theme controls, navigation, real case dialogs and CMS editors remain interactive.

Native Chrome desktop/mobile light/dark screenshot evidence is collected by the cross-platform task owner. The first dark browser review confirmed the main workspace, table and help card share the dark palette; its remaining native gray Sign out styling was corrected in the shared text-link primitive. The work is local, not deployed. Live authenticated sessions, network uploads, realtime connections and production publishing were not exercised for this appearance change. Native `window.confirm` and OS file pickers are browser-managed and follow `color-scheme`/platform presentation; their internals are not custom-styled.
