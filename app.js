const people = {
  faculty: [
    { name: "Dr. Meera Joshi", initials: "MJ", color: "#7c3aed", role: "Faculty", team: "Anatomy, Medical Surgical Nursing", subjects: ["Anatomy", "Medical Surgical Nursing"] },
    { name: "Dr. Arjun Rao", initials: "AR", color: "#2563eb", role: "Faculty", team: "Pharmacology", subjects: ["Pharmacology"] },
    { name: "Dr. Sunita Verma", initials: "SV", color: "#059669", role: "Faculty", team: "Anatomy, Pharmacology, Community Health Nursing", subjects: ["Anatomy", "Pharmacology", "Community Health Nursing"] },
  ],
  resolvers: [
    { name: "Priya S.", initials: "PS", color: "#7c3aed", role: "Resolver", team: "Content QA" },
    { name: "Rahul M.", initials: "RM", color: "#2563eb", role: "Resolver", team: "Engineering" },
    { name: "Sneha T.", initials: "ST", color: "#059669", role: "Resolver", team: "Support" },
    { name: "Amit K.", initials: "AK", color: "#d97706", role: "Resolver", team: "Ops Triage" },
  ],
};

const currentFaculty = "Dr. Meera Joshi";
const currentResolver = "Priya S.";

let tickets = [
  makeTicket("NP-00001", "Problem with the Answer", "The answer shown is wrong", "Anatomy", "faculty", null, "Raised", "Highest", 1.6, "Student says the official answer is option B, but the app marks option D.", "No attachment", null),
  makeTicket("NP-00002", "Can't See Something", "Image in the question is not loading", "Pharmacology", "content", null, "In Review", "High", 9.2, "The image area is blank on question 84294.", "Screenshot attached", "Priya S."),
  makeTicket("NP-00003", "I Have a Doubt", "I didn't understand the explanation", "Anatomy", "faculty", "Dr. Meera Joshi", "With Faculty", "High", 41.5, "The rationale says B is correct but I thought it should be C because both mention autonomic activity.", "Voice note 0:24", null),
  makeTicket("NP-00004", "Problem with this Question", "The question itself is wrong", "Community Health Nursing", "content", null, "Closed", "Medium", 0, "Question stem has two correct public health interventions.", "No attachment", "Priya S.", { score: 4.5, feedback: "thumbs_up", resolved: true }),
  makeTicket("NP-00005", "I Have a Doubt", "Why is this option wrong?", "Pharmacology", "faculty", "Dr. Arjun Rao", "Escalated", "Highest", 3.5, "I think option C should also be correct here.", "Voice note 0:18", null, { score: 1.5, feedback: "thumbs_down", escalationResolved: false }),
  makeTicket("NP-00006", "Problem with the Answer", "My book / teacher says something different", "Anatomy", "faculty", "Dr. Sunita Verma", "Closed", "Medium", 0, "Student reference differs from answer key.", "Reference: Nursing Foundation p. 119", null, { score: 3.5, feedback: "auto_closed", resolved: true }),
  makeTicket("NP-00007", "I Have a Doubt", "Why is this the correct answer?", "Medical Surgical Nursing", "faculty", "Dr. Meera Joshi", "Closed", "Low", 0, "Student needed a nursing-context explanation after a thumbs-down escalation.", "No attachment", null, { score: 4, feedback: "escalation_resolved", escalationResolved: true, rating: 4 }),
  makeTicket("NP-00008", "Problem with this Question", "Question is in the wrong language", "Community Health Nursing", "content", null, "Raised", "High", 6.7, "Question appears in Hindi in an English exam pack.", "Screenshot attached", null),
  makeTicket("NP-00009", "Can't See Something", "Explanation / table / formula is not showing", "Medical Surgical Nursing", "content", null, "Being Worked On", "Highest", 1.1, "Formula renders as symbols on Android.", "Screenshot attached", "Rahul M."),
];

function makeTicket(id, category, subOption, subject, routedTo, faculty, status, priority, hoursLeft, doubt, attachment, claimedBy, extras = {}) {
  const ageHours = Math.max(1, Math.round(48 - hoursLeft));
  return {
    id,
    questionId: 84290 + Number(id.slice(-2)),
    student: ["Ankit Rathore", "Riya Sharma", "Neha K.", "Mohit P."][Number(id.slice(-1)) % 4],
    category,
    subOption,
    subject,
    routedTo,
    faculty,
    status,
    priority,
    hoursLeft,
    doubt,
    attachment,
    claimedBy,
    channel: routedTo === "support" ? "Support" : routedTo === "faculty" ? "Faculty" : "Content",
    raisedAt: `${ageHours}h ago`,
    internalNote: extras.internalNote || "",
    resolution: extras.resolved ? "Final answer shared with supporting rationale and reference." : "",
    resolutionRef: extras.resolved ? "Reviewed source reference attached" : "",
    score: extras.score ?? null,
    feedback: extras.feedback ?? null,
    rating: extras.rating ?? null,
    escalationResolved: extras.escalationResolved ?? false,
    history: [
      ["SYSTEM", `${id} created from student query`],
      [claimedBy || faculty || "Content Queries", status === "Closed" ? "Resolution reviewed and closed" : `Status set to ${status}`],
    ],
  };
}

const columns = [
  ["id", "Ticket Id"],
  ["student", "Student"],
  ["status", "Current Status"],
  ["category", "Category"],
  ["subOption", "Sub Category"],
  ["subject", "Subject"],
  ["routedTo", "Team"],
  ["owner", "Assignee"],
  ["hoursLeft", "SLA"],
  ["priority", "Priority"],
  ["score", "Score"],
  ["channel", "Channel"],
];

let state = {
  role: "faculty",
  tab: "all",
  status: "all",
  sla: "all",
  subject: "all",
  search: "",
  selectedId: "NP-00003",
  visibleColumns: columns.map(([key]) => key),
  period: "week",
};

const el = {
  activeUser: document.querySelector("#activeUser"),
  roleToggle: document.querySelector("#roleToggle"),
  statsRow: document.querySelector("#statsRow"),
  searchInput: document.querySelector("#searchInput"),
  searchClear: document.querySelector("#searchClear"),
  statusFilter: document.querySelector("#statusFilter"),
  slaFilter: document.querySelector("#slaFilter"),
  subjectFilter: document.querySelector("#subjectFilter"),
  subjectFilterWrap: document.querySelector("#subjectFilterWrap"),
  ticketTabs: document.querySelector("#ticketTabs"),
  tableTitle: document.querySelector("#tableTitle"),
  tableSubtitle: document.querySelector("#tableSubtitle"),
  tableHead: document.querySelector("#tableHead"),
  ticketTable: document.querySelector("#ticketTable"),
  insightPanel: document.querySelector("#insightPanel"),
  drawer: document.querySelector("#ticketDrawer"),
  drawerScrim: document.querySelector("#drawerScrim"),
  modalScrim: document.querySelector("#modalScrim"),
  configModal: document.querySelector("#configModal"),
  toastStack: document.querySelector("#toastStack"),
};

function owner(ticket) {
  return ticket.faculty || ticket.claimedBy || "Unclaimed";
}

function statusClass(status) {
  if (status === "Closed") return "closed";
  if (status === "With Faculty") return "faculty";
  if (status === "Being Worked On") return "work";
  if (status === "Escalated") return "escalated";
  if (status === "In Review") return "review";
  return "open";
}

function slaClass(ticket) {
  if (ticket.status === "Closed") return "resolved";
  if (ticket.hoursLeft <= 2) return "critical";
  if (ticket.hoursLeft <= 12) return "warn";
  return "open";
}

function scoreClass(score) {
  if (score == null) return "";
  if (score >= 4) return "good";
  if (score >= 3) return "ok";
  return "bad";
}

function roleTickets() {
  if (state.role === "faculty") {
    const facultySubjects = people.faculty.find((person) => person.name === currentFaculty).subjects;
    return tickets.filter((ticket) => ticket.faculty === currentFaculty || (ticket.routedTo === "faculty" && !ticket.faculty && facultySubjects.includes(ticket.subject)));
  }
  if (state.role === "content") {
    return tickets.filter((ticket) => ticket.routedTo === "content" || ticket.routedTo === "faculty");
  }
  return tickets;
}

function tabsForRole(baseTickets) {
  if (state.role === "faculty") {
    return [
      ["all", "Total", baseTickets.length],
      ["my", "My Queries", baseTickets.filter((t) => t.faculty === currentFaculty && t.status !== "Closed").length],
      ["pool", "Subject Pool", baseTickets.filter((t) => !t.faculty && t.routedTo === "faculty").length],
      ["closed", "Closed", baseTickets.filter((t) => t.status === "Closed").length],
    ];
  }
  if (state.role === "content") {
    return [
      ["all", "Total", baseTickets.length],
      ["unclaimed", "Unclaimed", baseTickets.filter((t) => owner(t) === "Unclaimed").length],
      ["review", "In Review", baseTickets.filter((t) => t.status === "In Review").length],
      ["faculty", "With Faculty", baseTickets.filter((t) => t.faculty).length],
      ["escalated", "Escalated", baseTickets.filter((t) => t.status === "Escalated").length],
    ];
  }
  return [
    ["all", "All", baseTickets.length],
    ["unclaimed", "Unclaimed", baseTickets.filter((t) => owner(t) === "Unclaimed").length],
    ["content", "Content", baseTickets.filter((t) => t.routedTo === "content").length],
    ["facultyPool", "Faculty Pool", baseTickets.filter((t) => t.routedTo === "faculty" && !t.faculty).length],
    ["breaching", "Breaching Soon", baseTickets.filter((t) => t.status !== "Closed" && t.hoursLeft <= 2).length],
    ["escalated", "Escalated", baseTickets.filter((t) => t.feedback === "thumbs_down" && !t.escalationResolved).length],
  ];
}

function filteredTickets() {
  let rows = roleTickets();
  if (state.tab === "my") rows = rows.filter((t) => t.faculty === currentFaculty && t.status !== "Closed");
  if (state.tab === "pool") rows = rows.filter((t) => t.routedTo === "faculty" && !t.faculty);
  if (state.tab === "closed") rows = rows.filter((t) => t.status === "Closed");
  if (state.tab === "unclaimed") rows = rows.filter((t) => owner(t) === "Unclaimed");
  if (state.tab === "review") rows = rows.filter((t) => t.status === "In Review");
  if (state.tab === "faculty") rows = rows.filter((t) => t.faculty);
  if (state.tab === "facultyPool") rows = rows.filter((t) => t.routedTo === "faculty" && !t.faculty);
  if (state.tab === "content") rows = rows.filter((t) => t.routedTo === "content");
  if (state.tab === "breaching") rows = rows.filter((t) => t.status !== "Closed" && t.hoursLeft <= 2);
  if (state.tab === "escalated") rows = rows.filter((t) => t.status === "Escalated" || (t.feedback === "thumbs_down" && !t.escalationResolved));
  if (state.status !== "all") rows = rows.filter((t) => t.status === state.status);
  if (state.sla === "critical") rows = rows.filter((t) => t.status !== "Closed" && t.hoursLeft <= 2);
  if (state.sla === "warning") rows = rows.filter((t) => t.status !== "Closed" && t.hoursLeft > 2 && t.hoursLeft <= 12);
  if (state.sla === "healthy") rows = rows.filter((t) => t.status === "Closed" || t.hoursLeft > 12);
  if (state.subject !== "all") rows = rows.filter((t) => t.subject === state.subject);
  if (state.search) {
    const needle = state.search.toLowerCase();
    rows = rows.filter((t) => Object.values(t).join(" ").toLowerCase().includes(needle));
  }
  return rows.sort((a, b) => (a.status === "Closed") - (b.status === "Closed") || a.hoursLeft - b.hoursLeft);
}

function renderStats() {
  const base = roleTickets();
  const open = base.filter((t) => t.status !== "Closed");
  const closed = base.filter((t) => t.status === "Closed");
  const breaching = open.filter((t) => t.hoursLeft <= 2);
  const scores = base.map((t) => t.score).filter((score) => score != null);
  const avgScore = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "-";
  const escalated = base.filter((t) => t.feedback === "thumbs_down" && !t.escalationResolved);
  const data =
    state.role === "faculty"
      ? [
          ["My Open", open.filter((t) => t.faculty === currentFaculty).length, "Assigned to Dr. Meera", ""],
          ["Subject Pool", base.filter((t) => t.routedTo === "faculty" && !t.faculty).length, "Claim-first Anatomy/MSN queries", "amber"],
          ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
          ["Resolved", closed.length, "Closed faculty queries", "green"],
          ["Avg Score", avgScore, "Student satisfaction", Number(avgScore) >= 4 ? "green" : "amber"],
          ["Teams Pings", 3, "Content notifications", ""],
        ]
      : state.role === "content"
        ? [
            ["Queue", base.length, "Content and faculty-routed tickets", ""],
            ["Unclaimed", base.filter((t) => owner(t) === "Unclaimed").length, "Needs ownership", "amber"],
            ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
            ["With Faculty", base.filter((t) => t.faculty).length, "Expert explanation pending", ""],
            ["Resolved Today", closed.length, "Closed or auto-closed", "green"],
            ["Escalated", escalated.length, "Student not satisfied", escalated.length ? "red" : ""],
          ]
        : [
            ["Open", open.length, "Across content, support, faculty", ""],
            ["SLA Hit Rate", "78%", "Rolling team performance", "green"],
            ["Breaching Soon", breaching.length, "Within two hours", breaching.length ? "red" : "green"],
            ["Resolved Today", closed.length, "Team closure count", "green"],
            ["Avg Sat.", avgScore, "This week", Number(avgScore) >= 4 ? "green" : "amber"],
            ["Escalated Open", escalated.length, "Needs outreach", escalated.length ? "red" : ""],
          ];

  el.statsRow.innerHTML = data.map(([label, value, help, tone]) => `<article class="stat-card ${tone}"><span class="label">${label}</span><strong>${value}</strong><span>${help}</span></article>`).join("");
}

function renderFilters() {
  const statuses = ["all", ...new Set(roleTickets().map((ticket) => ticket.status))];
  el.statusFilter.innerHTML = statuses.map((status) => `<option value="${status}">${status === "all" ? "All statuses" : status}</option>`).join("");
  el.statusFilter.value = statuses.includes(state.status) ? state.status : "all";
  const subjects =
    state.role === "faculty"
      ? ["all", ...people.faculty.find((person) => person.name === currentFaculty).subjects]
      : ["all", ...new Set(tickets.map((ticket) => ticket.subject))];
  el.subjectFilter.innerHTML = subjects.map((subject) => `<option value="${subject}">${subject === "all" ? "All subjects" : subject}</option>`).join("");
  el.subjectFilter.value = subjects.includes(state.subject) ? state.subject : "all";
}

function renderTabs() {
  const base = roleTickets();
  const validTabs = tabsForRole(base).map(([key]) => key);
  if (!validTabs.includes(state.tab)) state.tab = "all";
  el.ticketTabs.innerHTML = tabsForRole(base)
    .map(([key, label, count]) => `<button class="${state.tab === key ? "active" : ""}" data-tab="${key}">${label}<span class="count">${count}</span></button>`)
    .join("");
}

function renderTable() {
  const visible = columns.filter(([key]) => state.visibleColumns.includes(key));
  const rows = filteredTickets();
  el.tableTitle.textContent = state.role === "manager" ? "Team Ticket Queue" : state.role === "content" ? "Content Queries Queue" : "Faculty Queries";
  el.tableSubtitle.textContent = `${rows.length} ticket${rows.length === 1 ? "" : "s"} shown`;
  el.tableHead.innerHTML = visible.map(([, label]) => `<th>${label}</th>`).join("");
  el.ticketTable.innerHTML = rows
    .map((ticket) => {
      return `<tr class="${state.selectedId === ticket.id ? "selected" : ""}" data-id="${ticket.id}">
        ${visible.map(([key]) => `<td>${cellValue(ticket, key)}</td>`).join("")}
      </tr>`;
    })
    .join("");
}

function cellValue(ticket, key) {
  const values = {
    id: `<button class="ticket-link" data-open="${ticket.id}">#${ticket.id}</button>`,
    student: ticket.student,
    status: `<span class="badge ${statusClass(ticket.status)}">${ticket.status}</span>`,
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    routedTo: ticket.routedTo === "faculty" ? "Faculty" : ticket.routedTo === "support" ? "Support" : "Content",
    owner: owner(ticket),
    hoursLeft: ticket.status === "Closed" ? `<span class="badge resolved">Closed</span>` : `<span class="badge ${slaClass(ticket)}">${ticket.hoursLeft.toFixed(1)}h left</span>`,
    priority: `<span class="priority ${ticket.priority.toLowerCase()}">${ticket.priority}</span>`,
    score: ticket.score == null ? `<span class="muted">--</span>` : `<strong class="score ${scoreClass(ticket.score)}">${ticket.score.toFixed(1)}</strong>`,
    channel: ticket.channel,
  };
  return values[key] ?? "";
}

function renderInsightPanel() {
  if (state.role === "manager") {
    const agents = [...people.resolvers, ...people.faculty];
    el.insightPanel.innerHTML = `<span class="label">Team Overview</span>
      <div class="segmented" id="periodToggle"><button data-period="today">Today</button><button class="active" data-period="week">This Week</button><button data-period="month">This Month</button></div>
      <div class="agent-list">${agents.map(renderAgentRow).join("")}</div>`;
    document.querySelectorAll("[data-period]").forEach((button) => button.classList.toggle("active", button.dataset.period === state.period));
    return;
  }
  if (state.role === "content") {
    const unclaimed = tickets.filter((ticket) => owner(ticket) === "Unclaimed" && ticket.routedTo !== "support");
    el.insightPanel.innerHTML = `<span class="label">Resolver Focus</span>
      <div class="insight-card"><span class="label">Teams Channel</span><strong>Content Queries</strong><p>New query, faculty resolution, returned-by-faculty, and escalation pings land here.</p></div>
      <div class="mini-list">${unclaimed.slice(0, 4).map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.category}</p></div><button class="ghost" data-claim="${ticket.id}">Claim</button></div>`).join("")}</div>`;
    return;
  }
  const facultyRows = roleTickets().filter((ticket) => ticket.routedTo === "faculty");
  el.insightPanel.innerHTML = `<span class="label">Faculty Workbench</span>
    <div class="insight-card"><span class="label">Logged in as</span><strong>${currentFaculty}</strong><p>Anatomy and Medical Surgical Nursing queries are visible here.</p></div>
    <div class="insight-card"><span class="label">Voice Notes</span><strong>${facultyRows.filter((ticket) => ticket.attachment.includes("Voice")).length}</strong><p>Student voice notes and faculty resolution voice notes can be attached in the ticket drawer.</p></div>
    <div class="mini-list">${facultyRows.slice(0, 4).map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.subject} - ${ticket.status}</p></div><span class="badge ${slaClass(ticket)}">${ticket.status === "Closed" ? "Closed" : `${ticket.hoursLeft.toFixed(1)}h`}</span></div>`).join("")}</div>`;
}

function renderAgentRow(person) {
  const owned = tickets.filter((ticket) => ticket.faculty === person.name || ticket.claimedBy === person.name);
  const open = owned.filter((ticket) => ticket.status !== "Closed").length;
  const scores = owned.map((ticket) => ticket.score).filter((score) => score != null);
  const avg = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
  return `<div class="agent-row">
    <div class="person"><span class="avatar" style="background:${person.color}">${person.initials}</span><div><button data-profile="${person.name}">${person.name}</button><p class="muted">${person.team}</p></div></div>
    <div><strong>${open}</strong><p class="muted">${avg} score</p></div>
  </div>`;
}

function openTicket(id) {
  state.selectedId = id;
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) return;
  el.drawerScrim.hidden = false;
  el.drawer.classList.add("open");
  el.drawer.setAttribute("aria-hidden", "false");
  el.drawer.innerHTML = ticketDrawer(ticket);
  renderTable();
}

function ticketDrawer(ticket) {
  const canClaimFaculty = state.role === "faculty" && ticket.routedTo === "faculty" && !ticket.faculty;
  const canResolveFaculty = state.role === "faculty" && ticket.faculty === currentFaculty && ticket.status !== "Closed";
  const canClaimContent = state.role === "content" && !ticket.claimedBy && ticket.routedTo === "content";
  const canAssignFaculty = state.role === "content" && ticket.routedTo === "faculty" && !ticket.faculty;
  const managerAssign = state.role === "manager" && ticket.status !== "Closed";
  return `<div class="drawer-head"><strong>Ticket Details</strong><button data-close-drawer>x</button></div>
    <div class="drawer-body">
      <section>
        <div class="drawer-title"><h2>#${ticket.id}</h2><span class="badge ${statusClass(ticket.status)}">${ticket.status}</span><span class="badge ${slaClass(ticket)}">${ticket.status === "Closed" ? "Closed" : `${ticket.hoursLeft.toFixed(1)}h left`}</span></div>
        <p class="muted">${ticket.category} - ${ticket.subOption}</p>
      </section>
      <div class="drawer-actions">
        ${canClaimFaculty ? `<button class="primary" data-faculty-claim="${ticket.id}">Claim Query</button>` : ""}
        ${canResolveFaculty ? `<button class="primary" data-show-resolution="${ticket.id}">Submit Resolution</button><button class="danger" data-outside-subject="${ticket.id}">Mark Outside My Subject</button>` : ""}
        ${canClaimContent ? `<button class="primary" data-claim="${ticket.id}">Claim Ownership</button>` : ""}
        ${canAssignFaculty ? `<button class="primary" data-assign-faculty="${ticket.id}">Assign to Faculty</button>` : ""}
        ${state.role === "content" && ticket.faculty ? `<button class="ghost" data-recall="${ticket.id}">Recall from Faculty</button>` : ""}
        ${managerAssign ? `<button class="primary" data-manager-assign="${ticket.id}">Assign Manually</button>` : ""}
        ${state.role === "content" ? `<button class="ghost" data-add-note="${ticket.id}">Add Internal Note</button>` : ""}
      </div>
      <section class="drawer-card hidden" id="resolutionPanel">
        <h3>Your Resolution</h3>
        <div class="resolution-form">
          <textarea id="resolutionText" placeholder="Write your explanation here..."></textarea>
          <input class="text-input" id="resolutionRef" placeholder="Textbook page, diagram note, or link" />
          <input class="text-input" id="resolutionVoice" placeholder="Voice note label, optional" />
          <div class="form-actions"><button class="primary" data-submit-resolution="${ticket.id}">Submit Resolution</button><span class="muted">Minimum 30 characters</span></div>
        </div>
      </section>
      <section class="drawer-card">
        <h3>Student's Query</h3>
        <dl class="detail-grid">
          <dt>Student</dt><dd>${ticket.student}</dd>
          <dt>Subject</dt><dd>${ticket.subject}</dd>
          <dt>Question ID</dt><dd>#${ticket.questionId}</dd>
          <dt>Raised</dt><dd>${ticket.raisedAt}</dd>
          <dt>Doubt</dt><dd>${ticket.doubt}</dd>
          <dt>Attachment</dt><dd>${ticket.attachment}</dd>
          <dt>Owner</dt><dd>${owner(ticket)}</dd>
        </dl>
      </section>
      ${ticket.resolution ? `<section class="drawer-card"><h3>Resolution</h3><p>${ticket.resolution}</p><p class="muted">${ticket.resolutionRef}</p>${ticket.rating ? `<p class="score ${scoreClass(ticket.rating)}">${ticket.rating.toFixed(1)} student rating</p>` : ""}</section>` : ""}
      <section class="drawer-card">
        <h3>Comment</h3>
        <div class="timeline">${ticket.history.map(([actor, text]) => `<div class="timeline-item"><span class="timeline-dot">${actor.slice(0, 1)}</span><div><strong>${actor}</strong><p>${text}</p></div></div>`).join("")}</div>
      </section>
      <section class="drawer-card">
        <h3>${state.role === "faculty" ? "Your Stats" : state.role === "manager" ? "Team SLA Snapshot" : "Resolver Notes"} - This Week</h3>
        <p class="muted">${state.role === "faculty" ? "Resolved: 8 - Avg resolution time: 6.2h - Satisfaction: 4.3" : state.role === "manager" ? "Breaching soon tickets are highlighted in red and can be reassigned manually." : "Internal notes are visible to content team and manager only."}</p>
      </section>
    </div>`;
}

function openProfile(name) {
  const person = [...people.faculty, ...people.resolvers].find((item) => item.name === name);
  if (!person) return;
  const owned = tickets.filter((ticket) => ticket.faculty === name || ticket.claimedBy === name);
  const open = owned.filter((ticket) => ticket.status !== "Closed");
  const resolved = owned.filter((ticket) => ticket.status === "Closed");
  const scores = resolved.map((ticket) => ticket.score).filter((score) => score != null);
  const avg = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
  el.drawerScrim.hidden = false;
  el.drawer.classList.add("open");
  el.drawer.setAttribute("aria-hidden", "false");
  el.drawer.innerHTML = `<div class="drawer-head"><strong>Profile</strong><button data-close-drawer>x</button></div>
    <div class="drawer-body">
      <section class="person"><span class="avatar" style="background:${person.color}">${person.initials}</span><div><h2>${person.name}</h2><p class="muted">${person.team}</p><span class="badge faculty">${person.role}</span></div></section>
      <section class="drawer-card"><h3>Performance - ${state.period === "today" ? "Today" : state.period === "month" ? "This Month" : "This Week"}</h3>
        <dl class="detail-grid"><dt>Resolved</dt><dd>${resolved.length}</dd><dt>Open</dt><dd>${open.length}</dd><dt>Avg Sat. Score</dt><dd>${avg}</dd><dt>Avg Res. Time</dt><dd>6.2 hours</dd><dt>Thumbs Down</dt><dd>${owned.filter((ticket) => ticket.feedback === "thumbs_down").length}</dd><dt>Escalated</dt><dd>${owned.filter((ticket) => ticket.feedback === "thumbs_down" && !ticket.escalationResolved).length}</dd></dl>
      </section>
      <section class="drawer-card"><h3>Open Tickets</h3><div class="mini-list">${open.length ? open.map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.subject} - ${ticket.hoursLeft.toFixed(1)}h left</p></div><button class="ghost" data-open="${ticket.id}">Open</button></div>`).join("") : `<p class="muted">No open tickets.</p>`}</div></section>
      <section class="drawer-card"><h3>Assign New Ticket</h3><select id="profileAssignSelect">${tickets.filter((ticket) => owner(ticket) === "Unclaimed").map((ticket) => `<option value="${ticket.id}">#${ticket.id} - ${ticket.subject}</option>`).join("")}</select><div class="form-actions"><button class="primary" data-profile-assign="${name}">Assign</button></div></section>
    </div>`;
}

function closeDrawer() {
  el.drawer.classList.remove("open");
  el.drawer.setAttribute("aria-hidden", "true");
  el.drawerScrim.hidden = true;
}

function toast(message) {
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  el.toastStack.appendChild(item);
  setTimeout(() => item.remove(), 3200);
}

function claimTicket(id, assignee = currentResolver) {
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) return;
  ticket.claimedBy = assignee;
  if (ticket.status === "Raised") ticket.status = "In Review";
  ticket.history.push([assignee, "Claimed ownership"]);
  toast(`${assignee} claimed #${id}`);
  render();
  openTicket(id);
}

function facultyClaim(id) {
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) return;
  ticket.faculty = currentFaculty;
  ticket.status = "With Faculty";
  ticket.history.push([currentFaculty, "Claimed from Subject Pool"]);
  toast(`Content Queries: ${currentFaculty} claimed #${id}`);
  render();
  openTicket(id);
}

function assignFaculty(id) {
  const ticket = tickets.find((item) => item.id === id);
  const eligible = people.faculty.filter((faculty) => faculty.subjects.includes(ticket.subject));
  if (!eligible.length) {
    toast(`General: No faculty for ${ticket.subject}. Manager action needed.`);
    return;
  }
  const loads = eligible.map((faculty) => ({
    faculty,
    open: tickets.filter((item) => item.faculty === faculty.name && item.status !== "Closed").length,
  }));
  loads.sort((a, b) => a.open - b.open);
  if (loads[0].open === loads[1]?.open) {
    ticket.faculty = null;
    ticket.status = "Raised";
    ticket.history.push(["Content Queries", "Added to Subject Pool due to equal faculty load"]);
    toast(`#${id} added to Subject Pool - ${ticket.subject}`);
  } else {
    ticket.faculty = loads[0].faculty.name;
    ticket.status = "With Faculty";
    ticket.history.push(["Content Queries", `Auto-assigned to ${loads[0].faculty.name}`]);
    toast(`Auto-assigned to ${loads[0].faculty.name}: #${id}`);
  }
  render();
  openTicket(id);
}

function submitResolution(id) {
  const ticket = tickets.find((item) => item.id === id);
  const text = document.querySelector("#resolutionText")?.value.trim() || "";
  const ref = document.querySelector("#resolutionRef")?.value.trim() || "";
  if (text.length < 30) {
    toast("Resolution needs at least 30 characters.");
    return;
  }
  ticket.resolution = text;
  ticket.resolutionRef = ref || "No extra reference attached";
  ticket.status = "Closed";
  ticket.score = ticket.score ?? 4.5;
  ticket.feedback = ticket.feedback ?? "thumbs_up";
  ticket.history.push([currentFaculty, "Submitted faculty resolution"]);
  toast(`Content Queries: Faculty resolved #${id}`);
  render();
  openTicket(id);
}

function outsideSubject(id) {
  const ticket = tickets.find((item) => item.id === id);
  ticket.faculty = null;
  ticket.routedTo = "content";
  ticket.status = "In Review";
  ticket.history.push([currentFaculty, "Returned by faculty as outside subject area"]);
  toast(`Returned by Faculty: #${id}`);
  render();
  openTicket(id);
}

function managerAssign(id) {
  const ticket = tickets.find((item) => item.id === id);
  if (ticket.routedTo === "faculty") {
    ticket.faculty = "Dr. Sunita Verma";
    ticket.status = "With Faculty";
    ticket.history.push(["Manager", "Assigned to Dr. Sunita Verma based on bandwidth"]);
  } else {
    ticket.claimedBy = "Amit K.";
    ticket.status = "Being Worked On";
    ticket.history.push(["Manager", "Assigned to Amit K. based on bandwidth"]);
  }
  toast(`Manager assigned #${id}`);
  render();
  openTicket(id);
}

function openColumnModal() {
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.innerHTML = `<div class="modal-head"><strong>Column Display and Order Configuration</strong><button data-close-modal>x</button></div>
    <div class="modal-body">
      <div class="column-picker">${columns.map(([key, label]) => `<label><input type="checkbox" value="${key}" ${state.visibleColumns.includes(key) ? "checked" : ""}> ${label}</label>`).join("")}</div>
      <div class="form-actions"><button class="primary" data-save-columns>Save</button></div>
    </div>`;
}

function openPinModal() {
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.innerHTML = `<div class="modal-head"><strong>Miscellaneous Configurations</strong><button data-close-modal>x</button></div>
    <div class="modal-body"><span class="label">Pin Column(s)</span><div class="pin-list">${columns.slice(0, 10).map(([, label]) => `<button class="pin-chip">${label}</button>`).join("")}</div></div>`;
}

function closeModal() {
  el.modalScrim.hidden = true;
  el.configModal.removeAttribute("open");
}

function render() {
  el.activeUser.textContent = state.role === "faculty" ? currentFaculty : state.role === "content" ? currentResolver : "Harshit";
  document.querySelectorAll("#roleToggle button").forEach((button) => button.classList.toggle("active", button.dataset.role === state.role));
  renderStats();
  renderFilters();
  renderTabs();
  renderTable();
  renderInsightPanel();
}

el.roleToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) return;
  state.role = button.dataset.role;
  state.tab = "all";
  state.status = "all";
  state.subject = "all";
  closeDrawer();
  render();
});

el.ticketTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  state.tab = button.dataset.tab;
  render();
});

el.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderTable();
});
el.searchClear.addEventListener("click", () => {
  state.search = "";
  el.searchInput.value = "";
  renderTable();
});
el.statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  renderTable();
});
el.slaFilter.addEventListener("change", (event) => {
  state.sla = event.target.value;
  renderTable();
});
el.subjectFilter.addEventListener("change", (event) => {
  state.subject = event.target.value;
  renderTable();
});

document.addEventListener("click", (event) => {
  const open = event.target.closest("[data-open]");
  const close = event.target.closest("[data-close-drawer]");
  const claim = event.target.closest("[data-claim]");
  const facultyClaimButton = event.target.closest("[data-faculty-claim]");
  const assignFacultyButton = event.target.closest("[data-assign-faculty]");
  const resolutionButton = event.target.closest("[data-show-resolution]");
  const submitButton = event.target.closest("[data-submit-resolution]");
  const outsideButton = event.target.closest("[data-outside-subject]");
  const managerAssignButton = event.target.closest("[data-manager-assign]");
  const profile = event.target.closest("[data-profile]");
  const addNote = event.target.closest("[data-add-note]");
  const recall = event.target.closest("[data-recall]");
  const period = event.target.closest("[data-period]");
  const profileAssign = event.target.closest("[data-profile-assign]");
  if (open) openTicket(open.dataset.open);
  if (close) closeDrawer();
  if (claim) claimTicket(claim.dataset.claim);
  if (facultyClaimButton) facultyClaim(facultyClaimButton.dataset.facultyClaim);
  if (assignFacultyButton) assignFaculty(assignFacultyButton.dataset.assignFaculty);
  if (resolutionButton) document.querySelector("#resolutionPanel")?.classList.remove("hidden");
  if (submitButton) submitResolution(submitButton.dataset.submitResolution);
  if (outsideButton && window.confirm("This will return the query to the content team. Continue?")) outsideSubject(outsideButton.dataset.outsideSubject);
  if (managerAssignButton) managerAssign(managerAssignButton.dataset.managerAssign);
  if (profile) openProfile(profile.dataset.profile);
  if (addNote) {
    const ticket = tickets.find((item) => item.id === addNote.dataset.addNote);
    ticket.internalNote = "Needs final content-team wording before student closure.";
    ticket.history.push([currentResolver, "Added internal note"]);
    toast(`Internal note added to #${ticket.id}`);
    openTicket(ticket.id);
  }
  if (recall) {
    const ticket = tickets.find((item) => item.id === recall.dataset.recall);
    ticket.faculty = null;
    ticket.status = "In Review";
    ticket.history.push([currentResolver, "Recalled from faculty"]);
    toast(`#${ticket.id} recalled from faculty`);
    render();
    openTicket(ticket.id);
  }
  if (period) {
    state.period = period.dataset.period;
    renderInsightPanel();
  }
  if (profileAssign) {
    const select = document.querySelector("#profileAssignSelect");
    const ticket = tickets.find((item) => item.id === select?.value);
    if (ticket) {
      const assignee = profileAssign.dataset.profileAssign;
      if (people.faculty.some((person) => person.name === assignee)) ticket.faculty = assignee;
      else ticket.claimedBy = assignee;
      ticket.status = ticket.faculty ? "With Faculty" : "Being Worked On";
      toast(`Assigned #${ticket.id} to ${assignee}`);
      render();
      openProfile(assignee);
    }
  }
});

el.drawerScrim.addEventListener("click", closeDrawer);
document.querySelector("#columnsButton").addEventListener("click", openColumnModal);
document.querySelector("#pinButton").addEventListener("click", openPinModal);
document.querySelector("#teamsPingButton").addEventListener("click", () => toast("Teams: Content Queries channel has 4 unread QMS pings."));
document.querySelector("#exportButton").addEventListener("click", () => toast("CSV export prepared for the current filtered queue."));
el.modalScrim.addEventListener("click", (event) => {
  if (event.target === el.modalScrim || event.target.closest("[data-close-modal]")) closeModal();
  if (event.target.closest("[data-save-columns]")) {
    state.visibleColumns = [...el.configModal.querySelectorAll("input:checked")].map((input) => input.value);
    closeModal();
    renderTable();
  }
});

render();
