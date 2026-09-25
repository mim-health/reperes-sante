# MACA Question Graph V0

## Scope
Passive collection only. No public UI, retrieval, grounding, safety, ranking or response changes.

Each accepted Assistant V2 question may create one record containing only:
- timestamp
- minimized question
- theme/intention (existing V2 category; otherwise non_classe/gap_corpus)
- result: answer or abstain
- MACA card IDs actually used

Explicitly excluded: IP, rate-limit key/hash, user/account/device identity, inferred age/sex/profile, channel/referrer, answer text, selected-but-unused cards.

## Privacy/minimization
Before storage, the logger removes common email addresses, French phone numbers, street-address patterns and 5-digit postal codes. The stored question is capped at the same 600-character limit as Assistant V2. This is minimization, not a guarantee that arbitrary free text can never contain identifying information; review before production remains required.

## Failure isolation / kill switch
Logging is fail-open and runs via waitUntil: storage errors never change the Assistant V2 response.
It is disabled unless BOTH conditions are true:
1. QUESTION_GRAPH_ENABLED="1"
2. env.QUESTION_GRAPH exposes put()

Turning QUESTION_GRAPH_ENABLED off disables collection without changing Assistant V2.

## Cloudflare step still required
Create a dedicated storage namespace compatible with Worker KV put(), bind it as QUESTION_GRAPH, then set QUESTION_GRAPH_ENABLED="1".
Do not reuse RATE_LIMITER or any existing analytics storage.

## Acceptance test before 1,000-question run
Run through the real public Assistant V2 path:
1. one straightforward answer
2. one ambiguous/general question
3. one corpus abstention

Verify:
- Assistant responses are unchanged;
- exactly one Question Graph record per accepted question;
- records contain only the five V0 fields;
- answer rows contain only actually used card IDs;
- abstentions contain no card IDs;
- no IP/hash/profile/channel/response text is present.

Only after this test passes: GO for the 1,000-question batch.
