# Gary Visa Trash activation

Production inspection found zero active protected Visa Owners and zero configured Trash policies. The existing staff membership and protected Visa Owner marker are distinct. The retention RPC requires the active protected Owner marker. A missing policy blocks permanent deletion with `AGENCY_PURGE_POLICY_MISSING`.

## Manual protected Owner enrollment

1. Verify the intended person's approval to act as Gary Visa Owner. In the live Supabase project `duyiihsmaqfgwezmsnjs`, use Authentication to match the approved account to its exact Auth UUID. Confirm the UUID already has active staff membership in Gary Visa and meets the existing auth eligibility rules. Record the approval outside the repository.
2. Run the prepared enrollment script as the existing database operator using the approved TLS-verified service. Substitute that exact Auth UUID. The script reports the protected marker and current roles. It aborts if the UUID lacks active, eligible Visa membership.

   ```sh
   cd /Users/skycastle3/Desktop/gary_group/gary_visa_service/website
   export PGSERVICE=gary-home-media  # Use your approved service name for the shared production database.
   psql -X -w -d "service=$PGSERVICE sslmode=verify-full" -v ON_ERROR_STOP=1 \
     -v approved_visa_owner_uuid='<approved Auth UUID>' \
     -f supabase/ops/enroll-protected-visa-owner.sql
   ```

3. Sign back into the Gary Visa staff portal as the enrolled account. Its existing `gary_my_access` response should have `member: true` and `site_owner: true`. Confirm the recorded Operations and CMS roles. Operations Admin authorizes permanent application deletion. CMS Admin authorizes permanent article deletion. Owner enrollment sets the protected marker only.
4. Set the approved minimum retention days independently for Applications and Articles. The Owner form appears under missing-policy entries in the applicable Trash category. For an empty category, the same signed-in Owner can configure its policy through the existing authenticated RPC when the approved values are available.

   ```js
   await visaOwnerClient.rpc('gary_set_trash_retention', {
     p_kind: 'case', // Use 'article' for News & Guides.
     p_minimum_days: approvedMinimumDays,
   })
   ```

5. Refresh Trash. An eligible record's action becomes available to its category Admin after the retention period. A protected hold, a dependency, or an unresolved document removal still blocks completion. Verify using an approved eligible test record and confirm both the record deletion and absence of its reserved exclusive Storage paths. The article purge removes its entry and revision history. CMS library assets follow their own shared-media lifecycle.
