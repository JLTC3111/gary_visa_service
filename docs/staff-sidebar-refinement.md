# Visa staff sidebar refinement

Implemented locally for the Gary Group staff-workspace task. The existing Visa sidebar is retained and enhanced only when the page has a server-confirmed staff role. Customer navigation is restored to its original ungrouped structure when staff mode ends.

## Destinations

| Group | Existing destinations |
| --- | --- |
| Operations | Applications (existing overview and case list) |
| CRM | Customers & leads, Chat inbox |
| Content & Media | Content management (including its existing media library), Trash |
| Account | My profile |

No routes or capabilities were added. The implementation moves the original navigation buttons, preserving their `data-view`, IDs, event handlers, permission-dependent `hidden` state, translations, and active-selection logic. Groups with no visible permitted destinations are hidden. CMS dirty-leave protection and existing view transitions continue to run through the original handlers.

## Behavior

- Desktop sidebar width is 220–380px, additionally bounded so the content workspace retains at least 520px. Drag the right edge or use Left/Right, Shift for larger steps, Home, or End on the separator.
- A collapse control switches to a 76px icon rail. Every permitted destination remains reachable with a localized accessible name and tooltip. Group disclosure settings are independent of whole-sidebar collapse.
- Width, collapsed state, and group disclosures persist under `gary-visa:staff-sidebar:v1`. Only presentation preferences are stored; no form or customer data is serialized.
- At widths ≤900px, the staff navigation becomes a compact disclosure above the workspace. Opening it exposes all permitted grouped navigation in an independently scrolling region. Mobile does not overwrite desktop width/collapse preferences.
- Sidebar geometry changes only the sidebar/grid variables. Shared Visa CMS, application, CRM, and case editor shells retain their original resize/maximize controller, dimensions, form nodes, selected files, validation, and unsaved state.
- Existing light styling remains the default. Sidebar dark tokens follow the OS when no explicit staff theme is supplied; `html[data-visa-staff-theme=light|dark]` gives the staff host an explicit override. Public-site appearance storage and animation preferences are not imported into the staff portal. This does not restyle unrelated portal content or editor shells.
- Mobile destination selection closes the disclosure and moves focus to the selected content; shrinking to the compact mode returns sidebar focus to its toggle. Nonessential help/user decoration hides on short desktop viewports so navigation retains a scrolling area.
- Native buttons provide keyboard disclosure operation; active routes use `aria-current=page`, resizing uses a labelled vertical separator, and reduced-motion preferences disable transitions/scroll animation in the sidebar.

## Files

- `dist/staff-sidebar.js`: scoped controller, role/language/navigation observers, grouping, independent sizing and preferences.
- `dist/staff-sidebar.css`: staff-only layout, grouped/rail/mobile presentation and light/dark tokens.
- `dist/portal.html`: module and stylesheet imports.
- `scripts/staff-sidebar.test.mjs`: six meaningful integration/regression checks.
- `scripts/site.test.mjs`: existing customer/staff/dirty-CMS tests mount the real enhancement.
- `package.json`: includes the new tests in the normal test command.

`portal.js`, backend APIs, authentication, database schemas, permissions, validation, publishing, and the modal implementation are unchanged by this sidebar task.

## Verification

Full Visa `npm test`: **90/90 passed**. Static check passed: 2 pages, 49 asset references. Targeted sidebar plus existing site integration: 15/15 passed; the final six sidebar tests also pass after keyboard-focus refinements. Tests cover original-node identity/listeners, hidden permission controls, active route state, customer-mode restoration, group localization/persistence, pointer/keyboard limits, sidebar/modal independence with unsaved text and a selected upload, rail reachability, mobile disclosure and saved desktop-state restoration, and blocked storage.

Full suite/static verification and browser screenshot evidence are reported by the parent cross-platform task owner.
