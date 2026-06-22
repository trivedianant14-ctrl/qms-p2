# QMS Dashboard Design QA

final result: passed

## Checks Completed

- JavaScript parse check passed with `node --check app.js`.
- Local Chrome render succeeded.
- Fixed the hidden overlay issue by forcing `[hidden] { display: none !important; }`.
- Captured the latest report dashboard verifications at `qms-report-dashboard-v13.png` and `qms-manager-report-dashboard-v13.png`.

## Prototype Coverage

- Role switching: Team Queue, Manager, Manager Report, Product Team.
- Shared ticket state persisted in browser localStorage.
- Faculty: subject pool, claim, resolution, reference, and voice note label.
- Content: claim, status advance, internal note, assign to faculty, approve/revise faculty resolution, final student answer, engineering escalation, close ticket, mark escalation call resolved.
- Manager: team overview, profile drawer, period toggle, manual assignment, faculty pool and SLA urgency filters.
- Product Team: intake quality dashboard, category/suboption mix, SLA/CSAT signals, engineering/render issue signals, and downloadable report.
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
- Eleventh workflow pass: removed Channel from the table/export surface, kept wide tables horizontally scrollable, added engineering escalation labels inside Current Status, added a Manager Report section with subject/topic/question/agent-load metrics plus report download, and added a Product Team dashboard with category, suboption, SLA, CSAT, technical signal, recommendation, and report download coverage.
- Twelfth workflow pass: moved reporting into a top-level Report nav item beside Learning, Assessment, and Ticket; removed Product Team from ticket-role queues; made Manager Report and Product Team separate full-width report dashboards; and replaced the Product Intake Tickets table with canvas-based pie, line, and bar charts plus analytical cards and report downloads.
- Thirteenth workflow pass: gated Content ticket drawer actions so unclaimed tickets show only Assign to Me, then reveal internal note, student resolution, and engineering escalation after the resolver claims ownership; the engineering escalation action now becomes an Escalated to Engineering state chip after use.
- Fourteenth workflow pass: replaced the faculty resolution voice-note text field with a mock voice recorder interface that supports record/stop, waveform feedback, duration, play mock, clear, and attaches the generated voice label on submit.
- Fifteenth workflow pass: merged Faculty and Content Team into one Team Queue view, moved both faculty and content agents into the same profile selector, scoped each profile to owned plus unclaimed tickets, and kept Manager as the only full-ticket visibility role.
- Sixteenth workflow pass: removed Team as a visible queue column/segment after merging Faculty and Content into one department, and clarified the Engineering escalation timeline entry after a claimed ticket is escalated.
- Seventeenth workflow pass: applied the faculty-style claim and resolution flow to Team Queue so every claimed team ticket opens the explanation/reference/voice-note resolution path, with Engineering escalation still locked until after ownership.
- Eighteenth workflow pass: normalized the mock people database into a single resolver pool, removing separate faculty/resolver collections while preserving subject expertise for routing and assignment.
- Nineteenth workflow pass: added View Attachment for student screenshots/references and image upload with preview/clear/save behavior inside the resolver resolution reference area.

## Notes

This is a frontend-only prototype. There is no backend, real auth, real Teams webhook, real microphone recording, or file upload service.
