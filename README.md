# Gary Agency — Vietnam services and secure portals

A responsive English/Vietnamese redesign of the supplied Gary Agency service page, plus a Supabase-backed customer and staff workspace, contact CRM and on-site support chat.

## Run locally

```sh
npm ci
npm run build
npm run dev
```

Open http://127.0.0.1:4173 for the website, `/portal.html` for customers, and `/portal.html?area=staff` for staff. The staff chat inbox is `/portal.html?area=staff&view=inbox`.

## Activate the live backend

For an existing portal database, run **[`supabase/install-live-chat.sql`](supabase/install-live-chat.sql)** as one complete query. It creates missing CRM/chat objects, repairs an incomplete earlier setup and preserves existing records. It can be run again safely. Individual migration files remain the source for normal CLI migration history; the installer is the repair path for SQL Editor setup.
The browser is configured for project `duyiihsmaqfgwezmsnjs` using the supplied **publishable** key. It contains no service-role or secret key. The management connector could not access this project, so the owner ran the installer through the SQL editor. A direct API check now returns `ready: true` for live chat. Auth account setup and staff grants remain owner-controlled.

1. Open [this project's SQL editor](https://supabase.com/dashboard/project/duyiihsmaqfgwezmsnjs/sql/new).
2. On this existing portal project, copy **all** of [`supabase/install-live-chat.sql`](supabase/install-live-chat.sql) into the editor, replacing any older query. Run the whole script, including `BEGIN` and `COMMIT`; do not run a selection. The final result should contain `"version": 2` and `"ready": true`. For a completely fresh database, install [`supabase/migrations/20261022180819_gary_customer_staff_portal.sql`](supabase/migrations/20261022180819_gary_customer_staff_portal.sql) first.
3. In [Authentication → URL Configuration](https://supabase.com/dashboard/project/duyiihsmaqfgwezmsnjs/auth/url-configuration), add the following allowed redirects:

   ```text
   https://gary-visa-vietnam.lsd99999999.chatgpt.site/portal.html
   https://gary-visa-vietnam.lsd99999999.chatgpt.site/portal.html?flow=recovery
   http://127.0.0.1:4173/portal.html
   http://127.0.0.1:4173/portal.html?flow=recovery
   ```

   Set Site URL to the final hosted portal URL when the site is deployed. Update the redirects if the hosting address changes. This is necessary for confirmation and password recovery links.
4. Keep email confirmation enabled. Match the UI password policy in [Auth settings](https://supabase.com/dashboard/project/duyiihsmaqfgwezmsnjs/auth/providers): at least 12 characters with letters and numbers. Verify confirmation and password-reset email delivery; configure a production email provider if the project is still using Supabase's restricted built-in mail service.
5. Create the first staff login in [Authentication → Users](https://supabase.com/dashboard/project/duyiihsmaqfgwezmsnjs/auth/users), using **Add user → Create new user**, your chosen email/password and **Auto Confirm User**. This lets the first staff member sign in without relying on email delivery. Replace every `staff@example.com` in [`supabase/setup-first-staff.sql`](supabase/setup-first-staff.sql) with the registered staff email, then run the script; it validates the exact account, grants staff membership and creates a profile without adding a new customer contact. The result must show the selected email and `website_role = staff`. Additional staff accounts can use the generic [`supabase/promote-staff.sql`](supabase/promote-staff.sql), after replacing its placeholder with the registered account's email.

Staff membership cannot be changed through the website, an account profile or editable Auth metadata. A staff registration link is deliberately not exposed. Existing customer accounts remain customers until the owner explicitly adds their user ID to the private membership table.

Run `npm run check:backend` to check API availability and whether the portal/CRM/chat tables and chat read API have been installed. It uses the publishable key only, requests zero rows and never reads customer records. A protected table returning permission denied is expected for a signed-out visitor.

## Customer workflow

- Create an email/password account, confirm email, sign in, recover a password and sign out.
- Maintain a name, contact email, phone, optional nationality and language preference.
- Create visa, work permit, residence card or document requests.
- Edit or cancel a submitted request, or edit one awaiting additional documents. Once staff starts processing, further changes go through the conversation.
- Follow an immutable status timeline, message staff and upload private documents.
- Open documents through short-lived, authorized signed links.

## Staff workflow

- Sign in using an owner-approved staff account.
- Search and paginate customer applications and filter their status.
- Assign a case to yourself, edit application details, update progress, exchange customer-visible messages and access case documents.
- Add separate private notes that customers cannot read or write.
- Create and edit CRM contacts with name, email, phone, company, service interest and tags.
- Track new lead → contacted → qualified → customer stages, or archive a record without deleting its history.
- Assign staff, schedule follow-ups, filter due tasks and see active-contact summaries.
- Read private relationship notes, a contact activity history and related applications/conversations.
- Reply in the website chat inbox, assign conversations, mark them resolved or reopen them. A visitor reply reopens a resolved thread. Unread indicators reflect whether the team has read the latest visitor message.

## Live staff chat

Visitors type their first message immediately in the website or customer-portal widget. Name, email and service are optional, inside a collapsed details panel. Empty emails stay empty in CRM. Press Enter to send or Shift+Enter for a new line. A guest creates a separate CRM lead; an unverified email never merges into a registered account. Signed-in chats link to the matching profile.

Staff open `/portal.html?area=staff&view=inbox` and choose **Go online**. This records their actual availability while the inbox is open and connected. Staff can switch to another browser window without going away. Leaving the inbox view, closing it or signing out pauses availability. Heartbeats expire after 45 seconds if the browser disappears. Visitors see online/away/reconnecting status, typing indicators and seen receipts. Staff see visitor typing and connection state too. Typing automatically expires after six seconds.

If the live connection is still starting, **Go online** queues the request until the channel connects. A failed connection shows **Retry connection** and expandable **Connection details**, with tokens redacted. Retrying replaces the failed channel without clearing drafts. The inbox advertises online only after the channel connects and the availability API succeeds. After a local code update, hard-refresh an already-open tab with Cmd+Shift+R. A read-only WebSocket probe confirmed this project's public support channel accepts joins. The owner has also confirmed live staff chat works on the local site.

Messages persist in Supabase and deliver through WebSocket invalidations. Database triggers broadcast **empty objects only**, on `gary-chat:<conversation UUID>` and `gary-support:v2`. Those notifications contain no messages, names, emails or guest tokens. Clients ignore notification payloads and fetch authoritative data using the existing Auth/capability-checked RPCs. Knowing a topic, or publishing a forged notification, cannot grant access or inject a message. Anonymous Auth sign-ins, secret keys and external chat providers are not required. Message recovery polls only while a socket is reconnecting, and a successful reconnect immediately catches up from stored history.

Guest access uses a browser-generated 256-bit token whose SHA-256 hash stays in a private table. The browser stores the token only in this tab's `sessionStorage`, never a URL. Authenticated threads also require the matching logged-in account. Clearing a chat removes local access; changing accounts clears the previous account's cached transcript. Send retries reuse UUIDs so an interrupted request cannot duplicate messages.

The widget checks API readiness before sending. Missing backend setup shows a clear unavailable state, rather than offering a submit button that cannot work. Transient send failures preserve the message and mark it unsent. Private CRM notes remain separate from customer-visible replies. There is no AI agent, automatic email notification or promise that staff are online when nobody has chosen Go online.

## Form controls

All forms share thin sage borders and a one-pixel focus indicator. Selects use a site-styled popup with arrow-key navigation, type-ahead, Enter/Space/Tab selection and Escape cancellation. The original controls retain form values, required validation, translated labels and dynamically loaded staff options. The live-chat launcher uses a terracotta background with readable white text.

## Verification

```sh
npm run build
npm test
npm run test:db
npm run check:backend
```

The build checks local assets, fragment links, input labels, duplicate IDs, translation completeness and public configuration. DOM interaction tests cover service filtering, language switching, enquiry escaping and copying, signup, customer application submission, staff gating, CRM create/edit/filter/notes, inbox replies and cleanup, widget session restoration, safe text rendering, retry drafts, automatic delivery between two clients, availability, typing, seen receipts, forged-notification handling, reconnect catch-up and setup preflight. The database suite runs the **actual migrations** in an isolated PostgreSQL instance via PGlite, with minimal Supabase Auth/Storage fixtures, and verifies both allowed and denied requests for two customers, staff and anonymous access. CRM/chat tests also verify token isolation, authenticated ownership, guest identity separation, private notes, idempotent retries, rate limits, keyset message history, profile sync, staff revocation preservation of unrelated Realtime publication entries, repair of existing presence tables with missing chat tables, and data preservation across installer re-runs. It does not replace testing Auth email delivery and Storage on the live Supabase project.

The development environment did not grant browser/computer-use access. No claim of visual browser verification is made; the responsive CSS, DOM behavior, static assets and HTTP responses were checked programmatically.

## Architecture

### Shared Gary apps menu

The website and portal load the Gary Apps menu from the shared runtime published by Gary Home at `https://garyhome.vn/shared/gary-apps/v1/manifest.json`. After the initial integration is deployed on all sites, publishing a shared release there updates Visa, Jobs and Home without rebuilding each consumer. New visits load the latest release. Visible open pages check every 60 seconds and when becoming visible again; replacements wait while a menu is open or focused.

The source of truth is the Gary Home repository's `shared/gary-apps/` directory. Edit its catalogue, React components and shared styles there, then use its release build and publishing workflow. Do not edit `dist/gary-apps-client.js` here: it is the identical protocol client copied from Gary Home. It validates the manifest and loads a matching immutable JavaScript/CSS pair.

`dist/gary-apps.js` is the small Visa adapter plus the local offline snapshot. It supplies `currentApp: 'visa'`, follows the website/portal's `gary:language` event and keeps the local menu visible until the central menu and styles have loaded successfully. Initial network, manifest or asset errors leave the local menu usable; subsequent refresh failures retain the last working shared release. `dist/gary-apps.css` contains Visa header, mobile and portal layout rules; these remain local to the site. Both HTML pages allow only the exact `https://garyhome.vn` origin in their script, style and connection policies for this integration.

Keep the local snapshot for outage resilience. Routine shared content/design changes belong in Gary Home; changing the loader protocol requires updating the copied client in each consuming repository.

- `dist/`: deployable, static website and portal. The marketing content works without the backend; login, CRM and chat require Supabase.
- `dist/crm.js`, `dist/inbox.js`: staff contact management and chat workflows.
- `dist/chat-widget.js`: reusable bilingual visitor/customer chat.
- `dist/live-chat.js`: WebSocket notifications, reconnect catch-up and conversation activity.
- `supabase/install-live-chat.sql`: generated, repeatable installer/repair query.
- `dist/backend.js`: public-key Supabase client and shared portal helpers. Authorization resides in database RLS and Storage policies.
- `supabase/migrations/`: repeatable, owner-reviewable database source.
- `supabase/setup-first-staff.sql`: staff bootstrap template; replace its placeholder with a registered email before running.
- `supabase/promote-staff.sql`: generic owner-controlled grants for additional staff.
- `scripts/`: local server, SDK bundling and verification.
- `.openai/hosting.json`: Sites identity and static deployment configuration. Preserve its project ID.

The public enquiry builder prepares a message for the visitor to copy to the published Zalo contact. It never pretends a request has been submitted. Customers wanting persistent tracking use the customer portal. There are no fabricated reviews, approval rates, processing guarantees or prices.

Private document storage accepts PDF, JPEG, PNG and WebP files up to 10 MB each. Application ownership is immutable through the customer API. Customer data, staff notes, audit history and file access each have separate policies. Role checks use an owner-controlled database table, not JWT user metadata. All browser dependencies are pinned in `package-lock.json`.

## References and assets

- [Original service page](https://garyagency.com/en/visa-work-permit-services-in-vietnam/) and [published contact details](https://garyagency.com/en/contact/).
- Original brand artwork downloaded from [Gary Agency](https://garyagency.com/wp-content/uploads/2025/02/LOGOgary.png); retained in the footer alongside the redesigned wordmark.
- [Ho Chi Minh City photograph](https://images.unsplash.com/photo-1583417319070-4a69db38a482) from Unsplash, served locally.
- [Ha Long Bay photograph](https://images.unsplash.com/photo-1528127269322-539801943592) from Unsplash, served locally.
- DM Sans from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/dmsans), with its OFL license included in `dist/assets/`.
- [Supabase Auth](https://supabase.com/docs/guides/auth/passwords), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) and [private Storage](https://supabase.com/docs/guides/storage/security/access-control), [Realtime database changes](https://supabase.com/docs/guides/realtime/subscribing-to-database-changes).
