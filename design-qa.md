# QMS Dashboard Design QA

final result: passed

## Checks Completed

- JavaScript parse check passed with `node --check app.js`.
- Local Chrome render succeeded.
- Fixed the hidden overlay issue by forcing `[hidden] { display: none !important; }`.
- Captured the verified dashboard at `qms-working-prototype-fixed.png`.
- Captured the cleaned layout at `qms-cleaned-layout.png` during the follow-up UI cleanup.

## Prototype Coverage

- Role switching: Student, Faculty, Content Team, Manager.
- Shared ticket state persisted in browser localStorage.
- Faculty: subject pool, claim, resolution, reference, voice note label, outside-subject return.
- Content: claim, status advance, internal note, assign to faculty, approve/revise faculty resolution, final student answer, engineering escalation, close ticket, mark escalation call resolved.
- Manager: team overview, profile drawer, period toggle, manual assignment, faculty pool and SLA urgency filters.
- Student: raise query, view tracker, thumbs up/down, follow-up note, call request, escalation rating.
- Teams-style notifications: content/general pings, unread count, notification modal, mark-read action.
- Follow-up layout cleanup: left rail removed, top nav trimmed to Learning/Assessment/Ticket, Export CSV removed, Faculty and Content Team workbench panel hidden, and query rows open the editable ticket details drawer directly.
- Second workflow pass: Student role removed, Faculty and Content queues expanded, Content view limited to content-routed plus escalated work, Manager keeps full visibility, and ticket details now include assign-to-me, priority/status controls, and next-step guidance.
- Third workflow pass: removed Teams Ping and Pin Columns controls, removed duplicate claim action, unclaimed tickets now start without priority, profile drawers are scoped to the selected person plus eligible unclaimed tickets, profile switching is available inside the drawer, and stale unclaimed tickets auto-assign after 24 hours using least-load with random tie break.
- Fourth workflow pass: added a profile selector beside the active profile, scoped Faculty and Content views to the selected person plus eligible unclaimed work, expanded filters for ticket ID/status/category/subcategory/subject/assignee/SLA/priority/score, clarified claim timeline timestamps, and replaced the manager-only manual action with working reassignment plus manager resolution controls.
- Fifth workflow pass: reduced visible filters to Ticket ID, Status, and Assignee, moved category/subcategory/subject/SLA/priority/score into two-state table sorting, removed visible notification cards/counts, and added Closed Today plus Overall Closed performance cards for Faculty, Content, and Manager views.
- Sixth workflow pass: restored Export CSV, added Raised From/Raised To date filters that scope the visible ticket table and tab counts, and verified the CSV download includes the selected date window with raised/resolved timestamps.
- Seventh workflow pass: restricted statuses to Unclaimed, Raised, Being reviewed, Worked on, Faculty, Faculty resolved, Escalation, Escalation resolved, and Closed; removed the manual status dropdown/advance action; and verified status transitions are driven by claim, assignment, faculty resolution, escalation, and close/feedback actions.
- Eighth workflow pass: made priority a one-time confirmed save after ticket ownership, moved the faculty resolution form below the student's query, and added a collapsible Student Device Detail card with app, device, location, network, renderer, API, and attachment context for engineering reference.
- Ninth workflow pass: expanded Student Device Detail into an engineering handoff panel with nested mock JSON payloads for session context, device runtime, and render diagnostics.
- Tenth workflow pass: added Question ID, Raised On, and Topic to the ticket table, made Question ID filterable, made question/topic/raised columns sortable, replaced ASC/DSC text with arrow indicators, and added absolute raised date-time to Student's Query.

## Notes

This is a frontend-only prototype. There is no backend, real auth, real Teams webhook, real microphone recording, or file upload service.
