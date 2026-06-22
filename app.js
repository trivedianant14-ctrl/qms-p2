const STORE_KEY = "nprep-qms-phase2-prototype-v9";

const FACULTY_ROUTED = {
  "Problem with the Answer": [
    "The answer shown is wrong",
    "My book / teacher says something different",
    "More than 1 option looks correct",
  ],
  "I Have a Doubt": [
    "Why is this the correct answer?",
    "I didn't understand the explanation",
    "Why is this option wrong?",
  ],
};

const CONTENT_ROUTED = {
  "Problem with the Answer": [
    "Explanation / rationale doesn't match the answer",
    "I answered this but it shows unattempted",
    "I selected the right answer but it's marked wrong",
  ],
  "Can't See Something": [
    "Image in the question is not loading",
    "Option text is missing or has symbols",
    "Explanation / table / formula is not showing",
    "Question is cut off or incomplete",
  ],
  "Problem with this Question": [
    "The question itself is wrong",
    "I've already seen this question",
    "Question is in the wrong language",
    "This is not in my syllabus",
    "This belongs to a different topic or chapter",
  ],
};

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

const current = {
  student: "Riya Sharma",
  faculty: "Dr. Meera Joshi",
  resolver: "Priya S.",
  manager: "Harshit",
};

const STATUSES = [
  "Unclaimed",
  "Raised",
  "Being reviewed",
  "Worked on",
  "Faculty",
  "Faculty resolved",
  "Escalation",
  "Escalation resolved",
  "Closed",
];

const STATUS_ALIASES = {
  "In Review": "Being reviewed",
  "Being Worked On": "Worked on",
  "With Faculty": "Faculty",
  "Faculty Resolved": "Faculty resolved",
  Escalated: "Escalation",
  "Escalation Resolved": "Escalation resolved",
};

const columns = [
  ["id", "Ticket ID"],
  ["student", "Student"],
  ["status", "Current Status"],
  ["category", "Category"],
  ["subOption", "Sub Category"],
  ["subject", "Subject"],
  ["routedTo", "Team"],
  ["owner", "Assignee"],
  ["sla", "SLA"],
  ["priority", "Priority"],
  ["score", "Score"],
  ["channel", "Channel"],
];

const sortableColumns = new Set(["id", "status", "category", "subOption", "subject", "owner", "sla", "priority", "score"]);

const state = {
  role: "faculty",
  tab: "all",
  status: "all",
  assignee: "all",
  dateFrom: "",
  dateTo: "",
  search: "",
  period: "week",
  selectedId: "NP-00003",
  sortKey: "sla",
  sortDir: "asc",
  visibleColumns: columns.map(([key]) => key),
};

let db = loadDb();

const el = {
  activeUser: document.querySelector("#activeUser"),
  roleToggle: document.querySelector("#roleToggle"),
  profileSelect: document.querySelector("#profileViewSelect"),
  statsRow: document.querySelector("#statsRow"),
  searchInput: document.querySelector("#searchInput"),
  searchClear: document.querySelector("#searchClear"),
  statusFilter: document.querySelector("#statusFilter"),
  assigneeFilter: document.querySelector("#assigneeFilter"),
  dateFromFilter: document.querySelector("#dateFromFilter"),
  dateToFilter: document.querySelector("#dateToFilter"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
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

function deriveRouting(category, subOption) {
  if (FACULTY_ROUTED[category]?.includes(subOption)) return "faculty";
  if (CONTENT_ROUTED[category]?.includes(subOption)) return "content";
  if (category === "Others") return "support";
  return "content";
}

function deriveSubject(questionId) {
  const lastDigit = Number(String(questionId).slice(-1));
  if (lastDigit <= 3) return "Anatomy";
  if (lastDigit <= 5) return "Pharmacology";
  if (lastDigit <= 7) return "Medical Surgical Nursing";
  return "Community Health Nursing";
}

function satisfactionScore(feedbackType, rating) {
  if (feedbackType === "thumbs_up") return 4.5;
  if (feedbackType === "auto_closed") return 3.5;
  if (feedbackType === "thumbs_down") return 1.5;
  if (feedbackType === "escalation_resolved") return rating || 3.5;
  return null;
}

function normalizeStatus(status) {
  const next = STATUS_ALIASES[status] || status || "Raised";
  return STATUSES.includes(next) ? next : "Raised";
}

function buildSessionDetails(input, raisedAt) {
  const seed = Number(String(input.questionId || input.id || 0).replace(/\D/g, "")) || 1;
  const devices = ["Samsung Galaxy M34", "Redmi Note 12", "iPhone 13", "Pixel 7a", "OnePlus Nord CE"];
  const platforms = ["Android 14", "Android 13", "iOS 17.5", "Android 14", "Android 13"];
  const appVersions = ["4.18.2", "4.18.1", "4.17.9", "4.18.2", "4.17.8"];
  const locations = ["Delhi, IN", "Jaipur, IN", "Lucknow, IN", "Patna, IN", "Pune, IN"];
  const networks = ["4G - Jio", "Wi-Fi - home", "5G - Airtel", "Wi-Fi - campus", "4G - Vi"];
  const hasRenderConcern = input.technicalEscalation || input.category === "Can't See Something";
  return {
    sessionId: `SES-${String(seed).slice(-6).padStart(6, "0")}`,
    appVersion: appVersions[seed % appVersions.length],
    device: devices[seed % devices.length],
    osVersion: platforms[seed % platforms.length],
    location: locations[seed % locations.length],
    network: networks[seed % networks.length],
    lastActive: raisedAt,
    questionRenderEngine: hasRenderConcern ? "Content renderer flagged" : "Content renderer healthy",
    apiTrace: hasRenderConcern ? "Last asset request timed out" : "All content APIs returned 200",
    attachmentCount: Number(Boolean(input.studentReference)) + Number(Boolean(input.studentVoiceNote)),
    engineeringSignal: hasRenderConcern ? "Check asset payload, WebView cache, and rendering logs." : "No active technical signal.",
  };
}

function createTicket(input) {
  const subject = input.subject || deriveSubject(input.questionId);
  const routedTo = input.routedTo || deriveRouting(input.category, input.subOption);
  const feedbackType = input.feedbackType || null;
  const now = Date.now();
  const raisedAt = input.raisedAt || new Date(now - (input.ageHours || 1) * 3600000).toISOString();
  const normalizedStatus = normalizeStatus(input.status);
  const initialPriority = input.facultyAssigned || input.claimedBy || normalizedStatus === "Closed" ? input.priority ?? null : null;
  return {
    id: input.id,
    questionId: input.questionId,
    student: input.student || current.student,
    category: input.category,
    subOption: input.subOption,
    queryText: input.queryText,
    studentDoubt: input.studentDoubt || input.queryText,
    subject,
    routedTo,
    facultyAssigned: input.facultyAssigned || null,
    facultyAssignedAt: input.facultyAssigned ? new Date(now - 4 * 3600000).toISOString() : null,
    claimedBy: input.claimedBy || null,
    status: normalizedStatus,
    timelineStatus: input.timelineStatus || "raised",
    priority: initialPriority,
    prioritySetAt: input.prioritySetAt || (initialPriority ? raisedAt : null),
    prioritySetBy: input.prioritySetBy || (initialPriority ? "Content Queries" : null),
    slaHours: input.slaHours || 48,
    raisedAt,
    resolvedAt: input.resolvedAt || null,
    resolutionText: input.resolutionText || "",
    finalResolutionText: input.finalResolutionText || "",
    resolutionReference: input.resolutionReference || "",
    facultyVoiceNote: input.facultyVoiceNote || "",
    studentVoiceNote: input.studentVoiceNote || "",
    studentReference: input.studentReference || "",
    internalNotes: input.internalNotes || [],
    resolutionCode: input.resolutionCode || null,
    satisfactionScore: input.satisfactionScore ?? satisfactionScore(feedbackType, input.escalationRating),
    feedbackType,
    escalationRating: input.escalationRating || null,
    escalationReview: input.escalationReview || "",
    escalationResolved: input.escalationResolved || false,
    callRequested: input.callRequested || false,
    followupText: input.followupText || "",
    returnedByFaculty: input.returnedByFaculty || false,
    revisionRequested: input.revisionRequested || false,
    technicalEscalation: input.technicalEscalation || false,
    studentConfirmed: input.studentConfirmed || false,
    sessionDetails: input.sessionDetails || buildSessionDetails(input, raisedAt),
    history: input.history || [
      eventLine("SYSTEM", "Ticket created from student query"),
      eventLine(routedTo === "faculty" ? "Content Queries" : "Content Queries", `Routed to ${routedTo}`),
    ],
  };
}

function eventLine(actor, text, at = new Date().toISOString()) {
  return { actor, text, at };
}

function seedDb() {
  const tickets = [
    createTicket({
      id: "NP-00001",
      questionId: 84291,
      student: "Riya Sharma",
      category: "Problem with the Answer",
      subOption: "The answer shown is wrong",
      queryText: "The answer key shows option D, but my book says option B is correct.",
      studentDoubt: "I checked the explanation twice. The final marked option and rationale do not match.",
      priority: "Highest",
      ageHours: 46.4,
      status: "Raised",
      timelineStatus: "raised",
      studentReference: "Screenshot of answer key",
    }),
    createTicket({
      id: "NP-00002",
      questionId: 84294,
      student: "Ankit Rathore",
      category: "Can't See Something",
      subOption: "Image in the question is not loading",
      queryText: "The image area is blank in question 84294.",
      priority: "High",
      ageHours: 8,
      status: "Being reviewed",
      timelineStatus: "in_review",
      claimedBy: "Priya S.",
      studentReference: "Screenshot attached",
    }),
    createTicket({
      id: "NP-00003",
      questionId: 84293,
      student: "Mohit P.",
      category: "I Have a Doubt",
      subOption: "I didn't understand the explanation",
      queryText: "The rationale says B is correct but I thought it should be C because both mention autonomic activity.",
      priority: "High",
      ageHours: 6,
      status: "Faculty",
      timelineStatus: "assigned",
      facultyAssigned: "Dr. Meera Joshi",
      studentVoiceNote: "0:24 voice note",
      history: [eventLine("SYSTEM", "Ticket created from student query"), eventLine("Content Queries", "Auto-assigned to Dr. Meera Joshi")],
    }),
    createTicket({
      id: "NP-00004",
      questionId: 84298,
      student: "Riya Sharma",
      category: "Problem with this Question",
      subOption: "The question itself is wrong",
      queryText: "Question stem has two correct public health interventions.",
      priority: "Medium",
      ageHours: 28,
      status: "Closed",
      timelineStatus: "resolved",
      claimedBy: "Priya S.",
      resolvedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
      resolutionText: "Question reviewed. Option B is the best answer because it addresses the first-line intervention.",
      finalResolutionText: "Thanks for flagging this. The item has been reviewed and the explanation has been clarified.",
      resolutionCode: "Content corrected",
      feedbackType: "thumbs_up",
      satisfactionScore: 4.5,
    }),
    createTicket({
      id: "NP-00005",
      questionId: 84295,
      student: "Neha K.",
      category: "I Have a Doubt",
      subOption: "Why is this option wrong?",
      queryText: "I think option C should also be correct here.",
      priority: "Highest",
      ageHours: 20,
      status: "Escalation",
      timelineStatus: "assigned",
      facultyAssigned: "Dr. Arjun Rao",
      resolvedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
      resolutionText: "Option C is incorrect because it describes an adverse-effect management step, not the priority intervention.",
      feedbackType: "thumbs_down",
      satisfactionScore: 1.5,
      escalationResolved: false,
      callRequested: true,
      followupText: "I still do not understand why priority changes here.",
    }),
    createTicket({
      id: "NP-00006",
      questionId: 84292,
      student: "Riya Sharma",
      category: "Problem with the Answer",
      subOption: "My book / teacher says something different",
      queryText: "My teacher's note says another answer is acceptable.",
      priority: "Medium",
      ageHours: 18,
      status: "Closed",
      timelineStatus: "resolved",
      facultyAssigned: "Dr. Sunita Verma",
      resolvedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
      resolutionText: "Both sources use different wording, but the NPrep answer follows the exam-specific nursing context.",
      resolutionReference: "Textbook reference page 119",
      feedbackType: "auto_closed",
      satisfactionScore: 3.5,
    }),
    createTicket({
      id: "NP-00007",
      questionId: 84296,
      student: "Mohit P.",
      category: "I Have a Doubt",
      subOption: "Why is this the correct answer?",
      queryText: "I need a stepwise explanation of the priority order.",
      priority: "Low",
      ageHours: 22,
      status: "Closed",
      timelineStatus: "resolved",
      facultyAssigned: "Dr. Meera Joshi",
      resolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      resolutionText: "Priority is decided by airway and immediate risk. Option A is correct because it prevents deterioration first.",
      feedbackType: "escalation_resolved",
      escalationRating: 4,
      escalationReview: "Sir explained it very clearly on the call.",
      escalationResolved: true,
      satisfactionScore: 4,
    }),
    createTicket({
      id: "NP-00008",
      questionId: 84299,
      student: "Ankit Rathore",
      category: "Problem with this Question",
      subOption: "Question is in the wrong language",
      queryText: "Question appears in Hindi in an English exam pack.",
      priority: "High",
      ageHours: 41,
      status: "Raised",
      timelineStatus: "raised",
    }),
    createTicket({
      id: "NP-00009",
      questionId: 84297,
      student: "Neha K.",
      category: "Can't See Something",
      subOption: "Explanation / table / formula is not showing",
      queryText: "Formula renders as symbols on Android.",
      priority: "Highest",
      ageHours: 47,
      status: "Worked on",
      timelineStatus: "being_worked_on",
      claimedBy: "Rahul M.",
      technicalEscalation: true,
      studentReference: "Screenshot attached",
    }),
  ];

  const studentNames = ["Riya Sharma", "Mohit P.", "Ankit Rathore", "Neha K.", "Sana Ali", "Harsh V.", "Kavya N.", "Dev S."];
  const facultySubjects = ["Anatomy", "Pharmacology", "Medical Surgical Nursing", "Community Health Nursing"];
  const facultySubOptions = [
    ["Problem with the Answer", "The answer shown is wrong"],
    ["Problem with the Answer", "My book / teacher says something different"],
    ["I Have a Doubt", "Why is this the correct answer?"],
    ["I Have a Doubt", "I didn't understand the explanation"],
    ["I Have a Doubt", "Why is this option wrong?"],
  ];
  const facultyOwners = [current.faculty, null, "Dr. Arjun Rao", "Dr. Sunita Verma", null];
  for (let index = 0; index < 20; index += 1) {
    const [category, subOption] = facultySubOptions[index % facultySubOptions.length];
    const ownerName = facultyOwners[index % facultyOwners.length];
    const subject = facultySubjects[index % facultySubjects.length];
    const isClosed = index % 9 === 0;
    tickets.push(createTicket({
      id: `NF-${String(index + 1).padStart(4, "0")}`,
      questionId: 85001 + index,
      student: studentNames[index % studentNames.length],
      category,
      subOption,
      subject,
      routedTo: "faculty",
      facultyAssigned: isClosed ? people.faculty[index % people.faculty.length].name : ownerName,
      status: isClosed ? "Closed" : ownerName ? "Faculty" : "Unclaimed",
      timelineStatus: isClosed ? "resolved" : ownerName ? "assigned" : "raised",
      priority: index % 5 === 0 ? "Highest" : index % 3 === 0 ? "Medium" : "High",
      ageHours: 2 + ((index * 2.25) % 46),
      queryText: `Faculty-routed doubt ${index + 1}: student needs expert explanation for ${subject}.`,
      studentDoubt: `Please explain the reasoning for this ${subject} question in simple steps.`,
      studentVoiceNote: index % 4 === 0 ? "0:18 voice note" : "",
      studentReference: index % 6 === 0 ? "Textbook page photo attached" : "",
      resolvedAt: isClosed ? new Date(Date.now() - (index + 1) * 1800000).toISOString() : null,
      resolutionText: isClosed ? "Faculty clarified the concept and added a supporting reference." : "",
      feedbackType: isClosed ? (index % 2 === 0 ? "thumbs_up" : "auto_closed") : null,
      satisfactionScore: isClosed ? (index % 2 === 0 ? 4.5 : 3.5) : null,
    }));
  }

  const contentCategories = [
    ["Can't See Something", "Image in the question is not loading"],
    ["Can't See Something", "Option text is missing or has symbols"],
    ["Can't See Something", "Explanation / table / formula is not showing"],
    ["Problem with this Question", "The question itself is wrong"],
    ["Problem with this Question", "Question is in the wrong language"],
    ["Problem with the Answer", "Explanation / rationale doesn't match the answer"],
  ];
  const contentOwners = [null, current.resolver, "Rahul M.", null, "Amit K."];
  for (let index = 0; index < 20; index += 1) {
    const [category, subOption] = contentCategories[index % contentCategories.length];
    const ownerName = contentOwners[index % contentOwners.length];
    const isClosed = index % 10 === 0;
    tickets.push(createTicket({
      id: `NC-${String(index + 1).padStart(4, "0")}`,
      questionId: 86001 + index,
      student: studentNames[(index + 2) % studentNames.length],
      category,
      subOption,
      subject: facultySubjects[(index + 1) % facultySubjects.length],
      routedTo: "content",
      claimedBy: isClosed ? current.resolver : ownerName,
      status: isClosed ? "Closed" : ownerName ? (index % 4 === 0 ? "Worked on" : "Being reviewed") : "Unclaimed",
      timelineStatus: isClosed ? "resolved" : ownerName ? "in_review" : "raised",
      priority: index % 4 === 0 ? "Highest" : index % 3 === 0 ? "Medium" : "High",
      ageHours: 1 + ((index * 1.85) % 47),
      queryText: `Content-routed issue ${index + 1}: ${subOption}.`,
      studentDoubt: `The student reported: ${subOption}. Please review and correct if needed.`,
      studentReference: index % 3 === 0 ? "Screenshot attached" : "",
      resolvedAt: isClosed ? new Date(Date.now() - (index + 2) * 2400000).toISOString() : null,
      resolutionText: isClosed ? "Content team reviewed and corrected the visible issue." : "",
      finalResolutionText: isClosed ? "This has been checked and corrected. Please reload the question." : "",
      feedbackType: isClosed ? "thumbs_up" : null,
      satisfactionScore: isClosed ? 4.5 : null,
      technicalEscalation: index % 8 === 0,
    }));
  }

  return {
    tickets,
    notifications: [
      note("Content Queries", "Auto-assigned to Dr. Meera Joshi: #NP-00003 - Anatomy", "NP-00003"),
      note("General", "Escalation needed: #NP-00005 - Student not satisfied", "NP-00005"),
      note("Content Queries", "New query landed: #NP-00001 - The answer shown is wrong", "NP-00001"),
      note("General", "Ticket unclaimed for 4 hours: #NP-00008", "NP-00008"),
    ],
  };
}

function note(channel, message, ticketId) {
  return { id: `N-${Date.now()}-${Math.random().toString(16).slice(2)}`, channel, message, ticketId, read: false, at: new Date().toISOString() };
}

function loadDb() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      normalizeTicketStatuses(parsed);
      normalizeTimeline(parsed);
      applyAutoAssignments(parsed, false, false);
      return parsed;
    }
  } catch (error) {
    console.warn(error);
  }
  const seeded = seedDb();
  normalizeTicketStatuses(seeded);
  normalizeTimeline(seeded);
  applyAutoAssignments(seeded, false, false);
  localStorage.setItem(STORE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveDb() {
  localStorage.setItem(STORE_KEY, JSON.stringify(db));
}

function ticketAgeHours(ticket) {
  return (Date.now() - new Date(ticket.raisedAt).getTime()) / 3600000;
}

function hoursLeft(ticket) {
  if (ticket.status === "Closed") return 0;
  return Math.max(0, ticket.slaHours - ticketAgeHours(ticket));
}

function owner(ticket) {
  return ticket.facultyAssigned || ticket.claimedBy || "Unclaimed";
}

function ticketById(id) {
  return db.tickets.find((ticket) => ticket.id === id);
}

function pushNotification(channel, message, ticketId) {
  db.notifications.unshift(note(channel, message, ticketId));
  toast(`${channel}: ${message}`);
}

function applyAutoAssignments(targetDb = db, shouldNotify = true, shouldPersist = true) {
  let changed = false;
  targetDb.tickets.forEach((ticket) => {
    if (ticket.status === "Closed" || owner(ticket) !== "Unclaimed" || ticketAgeHours(ticket) < 24) return;
    const assignee = leastLoadedAssignee(ticket, targetDb.tickets);
    if (!assignee) return;
    if (people.faculty.some((person) => person.name === assignee)) {
      ticket.facultyAssigned = assignee;
      ticket.facultyAssignedAt = new Date().toISOString();
      ticket.status = "Faculty";
      ticket.timelineStatus = "assigned";
    } else {
      ticket.claimedBy = assignee;
      ticket.status = "Being reviewed";
      ticket.timelineStatus = "in_review";
    }
    ticket.history.unshift(eventLine("SYSTEM", `Auto-assigned after 24h unclaimed SLA to ${assignee}`));
    targetDb.notifications.unshift(note("General", `Auto-assigned after 24h: #${ticket.id} to ${assignee}`, ticket.id));
    changed = true;
    if (shouldNotify) toast(`Auto-assigned #${ticket.id} to ${assignee}`);
  });
  if (changed && shouldPersist) saveDb();
  return changed;
}

function leastLoadedAssignee(ticket, allTickets = db.tickets) {
  const candidates =
    ticket.routedTo === "faculty"
      ? people.faculty.filter((person) => person.subjects.includes(ticket.subject))
      : people.resolvers;
  if (!candidates.length) return null;
  const loads = candidates.map((person) => ({
    person,
    load: allTickets.filter((item) => item.status !== "Closed" && (item.facultyAssigned === person.name || item.claimedBy === person.name)).length,
  }));
  const min = Math.min(...loads.map((item) => item.load));
  const tied = loads.filter((item) => item.load === min);
  return tied[Math.floor(Math.random() * tied.length)].person.name;
}

function addHistory(ticket, actor, text) {
  ticket.history.unshift(eventLine(actor, text));
}

function normalizeTicketStatuses(targetDb) {
  targetDb.tickets.forEach((ticket) => {
    ticket.status = normalizeStatus(ticket.status);
  });
}

function normalizeTimeline(targetDb) {
  targetDb.tickets.forEach((ticket) => {
    ticket.history = ticket.history || [];
    const hasOwnerEvent = ticket.history.some((item) => /claimed|assigned/i.test(item.text || "") && (item.actor === ticket.facultyAssigned || item.actor === ticket.claimedBy || item.text.includes(ticket.facultyAssigned || ticket.claimedBy || "__none__")));
    const claimAt = ticket.facultyAssignedAt || new Date(new Date(ticket.raisedAt).getTime() + 30 * 60000).toISOString();
    if (ticket.facultyAssigned && !hasOwnerEvent) {
      ticket.history.unshift(eventLine(ticket.facultyAssigned, `Claimed this ticket as faculty owner`, claimAt));
    }
    if (ticket.claimedBy && !hasOwnerEvent) {
      ticket.history.unshift(eventLine(ticket.claimedBy, `Claimed this ticket as resolver owner`, claimAt));
    }
  });
}

function roleName() {
  if (state.role === "faculty") return current.faculty;
  if (state.role === "content") return current.resolver;
  return current.manager;
}

function roleTickets() {
  if (state.role === "faculty") {
    const subjects = people.faculty.find((person) => person.name === current.faculty).subjects;
    return db.tickets.filter((ticket) => ticket.routedTo === "faculty" && (ticket.facultyAssigned === current.faculty || (!ticket.facultyAssigned && subjects.includes(ticket.subject))));
  }
  if (state.role === "content") {
    return db.tickets.filter((ticket) => {
      const eligible = ticket.routedTo === "content" || ticket.returnedByFaculty || ticket.feedbackType === "thumbs_down" || ticket.status === "Escalation resolved";
      return eligible && (ticket.claimedBy === current.resolver || owner(ticket) === "Unclaimed");
    });
  }
  return db.tickets;
}

function tabsForRole(base) {
  if (state.role === "faculty") {
    return [
      ["all", "Total", base.length],
      ["my", "My Queries", base.filter((t) => t.facultyAssigned === current.faculty && t.status !== "Closed").length],
      ["pool", "Subject Pool", base.filter((t) => t.routedTo === "faculty" && !t.facultyAssigned).length],
      ["closed", "Closed", base.filter((t) => t.status === "Closed").length],
    ];
  }
  if (state.role === "content") {
    return [
      ["all", "Total", base.length],
      ["unclaimed", "Unclaimed", base.filter((t) => owner(t) === "Unclaimed").length],
      ["review", "Being reviewed", base.filter((t) => t.status === "Being reviewed").length],
      ["faculty", "Faculty", base.filter((t) => t.facultyAssigned).length],
      ["returned", "Returned", base.filter((t) => t.returnedByFaculty).length],
      ["escalated", "Escalation", base.filter((t) => t.status === "Escalation").length],
    ];
  }
  return [
    ["all", "All", base.length],
    ["own", "My Resolver Queue", base.filter((t) => t.claimedBy === current.resolver).length],
    ["unclaimed", "Unclaimed", base.filter((t) => owner(t) === "Unclaimed").length],
    ["facultyPool", "Faculty Pool", base.filter((t) => t.routedTo === "faculty" && !t.facultyAssigned).length],
    ["breaching", "Breaching Soon", base.filter((t) => t.status !== "Closed" && hoursLeft(t) <= 2).length],
    ["escalated", "Escalation", base.filter((t) => t.status === "Escalation").length],
  ];
}

function filteredTickets() {
  let rows = [...roleTickets()];
  if (state.tab === "open") rows = rows.filter((t) => t.status !== "Closed");
  if (state.tab === "rating") rows = rows.filter((t) => t.escalationResolved && t.feedbackType === "escalation_resolved" && !t.escalationRating);
  if (state.tab === "closed") rows = rows.filter((t) => t.status === "Closed");
  if (state.tab === "my") rows = rows.filter((t) => t.facultyAssigned === current.faculty && t.status !== "Closed");
  if (state.tab === "pool" || state.tab === "facultyPool") rows = rows.filter((t) => t.routedTo === "faculty" && !t.facultyAssigned);
  if (state.tab === "unclaimed") rows = rows.filter((t) => owner(t) === "Unclaimed");
  if (state.tab === "review") rows = rows.filter((t) => t.status === "Being reviewed");
  if (state.tab === "faculty") rows = rows.filter((t) => t.facultyAssigned);
  if (state.tab === "returned") rows = rows.filter((t) => t.returnedByFaculty);
  if (state.tab === "breaching") rows = rows.filter((t) => t.status !== "Closed" && hoursLeft(t) <= 2);
  if (state.tab === "escalated") rows = rows.filter((t) => t.status === "Escalation");
  if (state.tab === "own") rows = rows.filter((t) => t.claimedBy === current.resolver);
  if (state.status !== "all") rows = rows.filter((t) => t.status === state.status);
  if (state.assignee !== "all") rows = rows.filter((t) => owner(t) === state.assignee);
  rows = rows.filter((ticket) => inDateRange(ticket.raisedAt));
  if (state.search) {
    const needle = state.search.toLowerCase();
    rows = rows.filter((ticket) => ticket.id.toLowerCase().includes(needle));
  }
  return sortTickets(rows);
}

function render() {
  applyAutoAssignments(db, false, true);
  renderProfileSelect();
  el.activeUser.textContent = roleName();
  document.querySelectorAll("#roleToggle button").forEach((button) => button.classList.toggle("active", button.dataset.role === state.role));
  document.querySelector(".main-grid")?.classList.toggle("no-side", state.role === "faculty" || state.role === "content");
  renderStats();
  renderFilters();
  renderTabs();
  renderTable();
  renderSidePanel();
}

function renderProfileSelect() {
  if (state.role === "manager") {
    el.profileSelect.hidden = true;
    el.profileSelect.innerHTML = "";
    return;
  }
  const options = state.role === "faculty" ? people.faculty : people.resolvers;
  const activeName = state.role === "faculty" ? current.faculty : current.resolver;
  el.profileSelect.hidden = false;
  el.profileSelect.innerHTML = options.map((person) => `<option value="${person.name}" ${person.name === activeName ? "selected" : ""}>${person.name}</option>`).join("");
}

function renderStats() {
  const base = roleTickets();
  const open = base.filter((ticket) => ticket.status !== "Closed");
  const closed = base.filter((ticket) => ticket.status === "Closed");
  const closedToday = closed.filter((ticket) => isToday(ticket.resolvedAt));
  const breaching = open.filter((ticket) => hoursLeft(ticket) <= 2);
  const scores = base.map((ticket) => ticket.satisfactionScore).filter((score) => score != null);
  const avgScore = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
  const activeFaculty = people.faculty.find((person) => person.name === current.faculty);
  const facultySubjects = activeFaculty?.subjects || [];
  const pool = db.tickets.filter((ticket) => ticket.routedTo === "faculty" && !ticket.facultyAssigned);
  const statSets = {
    faculty: [
      ["My Open", open.filter((t) => t.facultyAssigned === current.faculty).length, `Assigned to ${current.faculty}`, ""],
      ["Subject Pool", pool.filter((t) => facultySubjects.includes(t.subject)).length, "Claim-first subject queries", "amber"],
      ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
      ["Closed Today", closedToday.length, "Tickets closed today", "green"],
      ["Overall Closed", closed.length, "All closed faculty tickets", "green"],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 4 ? "green" : "amber"],
    ],
    content: [
      ["Queue", base.length, "Content and faculty-routed tickets", ""],
      ["Unclaimed", base.filter((t) => owner(t) === "Unclaimed").length, "Needs ownership", "amber"],
      ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
      ["Closed Today", closedToday.length, "Tickets closed today", "green"],
      ["Overall Closed", closed.length, "All closed content tickets", "green"],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 4 ? "green" : "amber"],
    ],
    manager: [
      ["Open", open.length, "Across content, support, faculty", ""],
      ["SLA Hit Rate", "78%", "Rolling team performance", "green"],
      ["SLA Risk", breaching.length, "Within two hours", breaching.length ? "red" : "green"],
      ["Closed Today", closedToday.length, "Team closures today", "green"],
      ["Overall Closed", closed.length, "All closed tickets", "green"],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 4 ? "green" : "amber"],
    ],
  };
  el.statsRow.innerHTML = statSets[state.role].map(([label, value, help, tone]) => `<article class="stat-card ${tone}"><span class="label">${label}</span><strong>${value}</strong><span>${help}</span></article>`).join("");
}

function renderFilters() {
  const scoped = roleTickets();
  const statuses = ["all", ...STATUSES];
  el.statusFilter.innerHTML = statuses.map((status) => `<option value="${status}">${status === "all" ? "All statuses" : status}</option>`).join("");
  el.statusFilter.value = statuses.includes(state.status) ? state.status : "all";
  renderSelectFilter(el.assigneeFilter, ["all", ...new Set(scoped.map((ticket) => owner(ticket)))], state.assignee, "All assignees");
  el.dateFromFilter.value = state.dateFrom;
  el.dateToFilter.value = state.dateTo;
}

function renderSelectFilter(select, options, selected, allLabel, labels = {}) {
  select.innerHTML = options.map((option) => `<option value="${option}">${option === "all" ? allLabel : labels[option] || option}</option>`).join("");
  select.value = options.includes(selected) ? selected : "all";
}

function sortTickets(rows) {
  const direction = state.sortDir === "desc" ? -1 : 1;
  return rows.sort((a, b) => {
    const primary = compareValues(sortValue(a, state.sortKey), sortValue(b, state.sortKey));
    if (primary !== 0) return primary * direction;
    return compareValues(sortValue(a, "id"), sortValue(b, "id"));
  });
}

function sortValue(ticket, key) {
  const priorityRank = { Highest: 1, High: 2, Medium: 3, Low: 4 };
  const statusRank = {
    Unclaimed: 1,
    Raised: 2,
    "Being reviewed": 3,
    "Worked on": 4,
    Faculty: 5,
    "Faculty resolved": 6,
    Escalation: 7,
    "Escalation resolved": 8,
    Closed: 9,
  };
  const values = {
    id: Number(ticket.id.replace(/\D/g, "")),
    status: statusRank[ticket.status] || 99,
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    owner: owner(ticket),
    sla: ticket.status === "Closed" ? Number.POSITIVE_INFINITY : hoursLeft(ticket),
    priority: owner(ticket) === "Unclaimed" || !ticket.priority ? 99 : priorityRank[ticket.priority] || 99,
    score: ticket.satisfactionScore == null ? -1 : ticket.satisfactionScore,
  };
  return values[key] ?? "";
}

function compareValues(a, b) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function toggleSort(key) {
  if (!sortableColumns.has(key)) return;
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = key;
    state.sortDir = "asc";
  }
  renderTable();
}

function renderTabs() {
  const tabs = tabsForRole(roleTickets().filter((ticket) => inDateRange(ticket.raisedAt)));
  if (!tabs.some(([key]) => key === state.tab)) state.tab = "all";
  el.ticketTabs.innerHTML = tabs.map(([key, label, count]) => `<button class="${state.tab === key ? "active" : ""}" data-tab="${key}">${label}<span class="count">${count}</span></button>`).join("");
}

function renderTable() {
  const rows = filteredTickets();
  const visible = columns.filter(([key]) => state.visibleColumns.includes(key));
  el.tableTitle.textContent = state.role === "faculty" ? "Faculty Queries" : state.role === "content" ? "Content Queries Queue" : "Team Ticket Queue";
  el.tableSubtitle.textContent = `${rows.length} ticket${rows.length === 1 ? "" : "s"} shown${dateRangeLabel()}`;
  el.tableHead.innerHTML = visible.map(([key, label]) => headerCell(key, label)).join("");
  el.ticketTable.innerHTML = rows.map((ticket) => `<tr class="${state.selectedId === ticket.id ? "selected" : ""}" data-row-open="${ticket.id}" tabindex="0">${visible.map(([key]) => `<td>${cell(ticket, key)}</td>`).join("")}</tr>`).join("");
}

function headerCell(key, label) {
  if (!sortableColumns.has(key)) return `<th>${label}</th>`;
  const active = state.sortKey === key;
  const direction = active ? state.sortDir : "none";
  const marker = active ? state.sortDir.toUpperCase() : "";
  return `<th aria-sort="${direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}"><button class="sort-header ${active ? "active" : ""}" data-sort="${key}" title="Sort ${label}">${label}<span>${marker}</span></button></th>`;
}

function cell(ticket, key) {
  const value = {
    id: `<button class="ticket-link" data-open="${ticket.id}">#${ticket.id}</button>`,
    student: ticket.student,
    status: `<span class="badge ${statusClass(ticket.status)}">${ticket.status}</span>`,
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    routedTo: titleCase(ticket.routedTo),
    owner: owner(ticket),
    sla: ticket.status === "Closed" ? `<span class="badge resolved">Closed</span>` : `<span class="badge ${slaClass(ticket)}">${hoursLeft(ticket).toFixed(1)}h left</span>`,
    priority: owner(ticket) === "Unclaimed" || !ticket.priority ? `<span class="muted">--</span>` : `<span class="priority ${priorityClass(ticket.priority)}">${ticket.priority}</span>`,
    score: ticket.satisfactionScore == null ? `<span class="muted">--</span>` : `<strong class="score ${scoreClass(ticket.satisfactionScore)}">${ticket.satisfactionScore.toFixed(1)}</strong>`,
    channel: ticket.routedTo === "support" ? "Support" : ticket.routedTo === "faculty" ? "Faculty" : "Content",
  };
  return value[key] || "";
}

function rawCell(ticket, key) {
  const value = {
    id: ticket.id,
    student: ticket.student,
    status: ticket.status,
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    routedTo: titleCase(ticket.routedTo),
    owner: owner(ticket),
    sla: ticket.status === "Closed" ? "Closed" : `${hoursLeft(ticket).toFixed(1)}h left`,
    priority: owner(ticket) === "Unclaimed" || !ticket.priority ? "" : ticket.priority,
    score: ticket.satisfactionScore == null ? "" : ticket.satisfactionScore.toFixed(1),
    channel: ticket.routedTo === "support" ? "Support" : ticket.routedTo === "faculty" ? "Faculty" : "Content",
  };
  return value[key] ?? "";
}

function exportCsv() {
  if (dateRangeInvalid()) {
    toast("Choose a From Date that is before the To Date.");
    return;
  }
  const rows = filteredTickets();
  if (!rows.length) {
    toast("No tickets match this date range.");
    return;
  }
  const visible = columns.filter(([key]) => state.visibleColumns.includes(key));
  const headers = [...visible.map(([, label]) => label), "Raised At", "Resolved At"];
  const csvRows = [
    headers.map(csvEscape).join(","),
    ...rows.map((ticket) => [
      ...visible.map(([key]) => rawCell(ticket, key)),
      absoluteDate(ticket.raisedAt),
      ticket.resolvedAt ? absoluteDate(ticket.resolvedAt) : "",
    ].map(csvEscape).join(",")),
  ];
  const blob = new Blob([csvRows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = csvFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast(`Exported ${rows.length} ticket${rows.length === 1 ? "" : "s"} to CSV.`);
}

function csvFileName() {
  const role = state.role === "content" ? "content-team" : state.role;
  const from = state.dateFrom || "all";
  const to = state.dateTo || "all";
  return `qms-${role}-tickets-${from}-to-${to}.csv`;
}

function dateRangeInvalid() {
  return Boolean(state.dateFrom && state.dateTo && new Date(state.dateFrom) > new Date(state.dateTo));
}

function dateRangeLabel() {
  if (state.dateFrom && state.dateTo) return ` raised from ${state.dateFrom} to ${state.dateTo}`;
  if (state.dateFrom) return ` raised from ${state.dateFrom}`;
  if (state.dateTo) return ` raised until ${state.dateTo}`;
  return "";
}

function renderSidePanel() {
  if (state.role === "faculty" || state.role === "content") {
    el.insightPanel.innerHTML = "";
    return;
  }
  if (state.role === "faculty") {
    const rows = roleTickets().filter((ticket) => ticket.routedTo === "faculty");
    el.insightPanel.innerHTML = `<span class="label">Faculty Workbench</span>
      <div class="insight-card"><span class="label">Logged in as</span><strong>${current.faculty}</strong><p>Anatomy and Medical Surgical Nursing queries are visible here.</p></div>
      <div class="insight-card"><span class="label">Resolution Tools</span><strong>Text + Reference + Voice</strong><p>Submit explanations with textbook pages, links, diagrams, or voice notes.</p></div>
      <div class="mini-list">${rows.slice(0, 5).map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.subject} - ${ticket.status}</p></div><button class="ghost" data-open="${ticket.id}">Open</button></div>`).join("")}</div>`;
    return;
  }
  if (state.role === "content") {
    const unclaimed = roleTickets().filter((ticket) => owner(ticket) === "Unclaimed");
    el.insightPanel.innerHTML = `<span class="label">Resolver Focus</span>
      <div class="insight-card"><span class="label">Content Queue</span><strong>${unclaimed.length} unclaimed</strong><p>Claim eligible content-routed issues or send expert cases to faculty.</p></div>
      <div class="mini-list">${unclaimed.slice(0, 5).map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.category}</p></div><button class="ghost" data-claim="${ticket.id}">Claim</button></div>`).join("")}</div>`;
    return;
  }
  const agents = [...people.resolvers, ...people.faculty];
  el.insightPanel.innerHTML = `<span class="label">Team Overview</span>
    <div class="segmented" id="periodToggle"><button data-period="today">Today</button><button data-period="week">This Week</button><button data-period="month">This Month</button></div>
    <div class="agent-list">${agents.map(renderAgentRow).join("")}</div>`;
  document.querySelectorAll("[data-period]").forEach((button) => button.classList.toggle("active", button.dataset.period === state.period));
}

function renderAgentRow(person) {
  const owned = db.tickets.filter((ticket) => ticket.facultyAssigned === person.name || ticket.claimedBy === person.name);
  const open = owned.filter((ticket) => ticket.status !== "Closed").length;
  const scores = owned.map((ticket) => ticket.satisfactionScore).filter((score) => score != null);
  const avg = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
  return `<div class="agent-row">
    <div class="person"><span class="avatar" style="background:${person.color}">${person.initials}</span><div><button data-profile="${person.name}">${person.name}</button><p class="muted">${person.team}</p></div></div>
    <div><strong>${open}</strong><p class="muted">${avg} score</p></div>
  </div>`;
}

function openTicket(id) {
  const ticket = ticketById(id);
  if (!ticket) return;
  state.selectedId = id;
  el.drawerScrim.hidden = false;
  el.drawer.classList.add("open");
  el.drawer.setAttribute("aria-hidden", "false");
  el.drawer.innerHTML = drawerHtml(ticket);
  renderTable();
}

function drawerHtml(ticket) {
  return `<div class="drawer-head"><strong>Ticket Details</strong><button data-close-drawer>x</button></div>
    <div class="drawer-body">
      <section>
        <div class="drawer-title"><h2>#${ticket.id}</h2><span class="badge ${statusClass(ticket.status)}">${ticket.status}</span><span class="badge ${slaClass(ticket)}">${ticket.status === "Closed" ? "Closed" : `${hoursLeft(ticket).toFixed(1)}h left`}</span></div>
        <p class="muted">${ticket.category} - ${ticket.subOption}</p>
      </section>
      ${drawerActions(ticket)}
      ${workflowPanel(ticket)}
      ${state.role === "content" ? contentPanel(ticket) : ""}
      ${state.role === "manager" ? managerPanel(ticket) : ""}
      <section class="drawer-card"><h3>Student's Query</h3>${detailGrid([
        ["Student", ticket.student],
        ["Subject", ticket.subject],
        ["Question ID", `#${ticket.questionId}`],
        ["Raised", relativeTime(ticket.raisedAt)],
        ["Doubt", ticket.studentDoubt],
        ["Voice Note", ticket.studentVoiceNote || "None"],
        ["Reference", ticket.studentReference || "None"],
        ["Owner", owner(ticket)],
      ])}</section>
      ${state.role === "faculty" ? facultyPanel(ticket) : ""}
      ${sessionDetailPanel(ticket)}
      ${escalationPanel(ticket)}
      ${resolutionPanel(ticket)}
      <section class="drawer-card"><h3>Timeline</h3><div class="timeline">${ticket.history.map((item) => `<div class="timeline-item"><span class="timeline-dot">${item.actor.slice(0, 1)}</span><div><strong>${item.actor}</strong><p class="timeline-text">${item.text}</p><p class="timeline-meta">${absoluteDate(item.at)} - ${relativeTime(item.at)}</p></div></div>`).join("")}</div></section>
    </div>`;
}

function drawerActions(ticket) {
  const actions = [];
  if (canAssignToMe(ticket)) actions.push(`<button class="primary" data-assign-self="${ticket.id}">Assign to Me</button>`);
  if (state.role === "faculty" && ticket.facultyAssigned === current.faculty && ticket.status === "Faculty") actions.push(`<button class="danger" data-outside-subject="${ticket.id}">Mark Outside My Subject</button>`);
  if (state.role === "content" && ticket.status !== "Closed") actions.push(`<button class="ghost" data-show-panel="internalNote">Add Internal Note</button>`);
  if (state.role === "content" && ticket.routedTo === "faculty" && !ticket.facultyAssigned) actions.push(`<button class="primary" data-assign-faculty="${ticket.id}">Assign to Faculty</button>`);
  if (state.role === "content" && ticket.facultyAssigned && ticket.status !== "Closed") actions.push(`<button class="ghost" data-recall="${ticket.id}">Recall from Faculty</button>`);
  if (state.role === "content" && ticket.resolutionText && ticket.status === "Faculty resolved") actions.push(`<button class="primary" data-approve-resolution="${ticket.id}">Approve Faculty Resolution</button>`, `<button class="ghost" data-send-revision="${ticket.id}">Send Back for Revision</button>`);
  if (state.role === "content" && ticket.status !== "Closed") actions.push(`<button class="ghost" data-show-panel="finalResolution">Finalize Student Resolution</button>`, `<button class="danger" data-escalate-engineering="${ticket.id}">Escalate to Engineering</button>`);
  if (state.role === "content" && ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) actions.push(`<button class="primary" data-mark-escalation-resolved="${ticket.id}">Mark Call Resolved</button>`);
  if (state.role === "manager" && ticket.status !== "Closed" && owner(ticket) === "Unclaimed") actions.push(`<button class="primary" data-manager-claim="${ticket.id}">Claim as Manager</button>`);
  return `<div class="drawer-actions">${actions.join("") || `<span class="muted">No primary action available in this state.</span>`}</div>`;
}

function workflowPanel(ticket) {
  const priorityLocked = Boolean(ticket.priority);
  const unclaimed = owner(ticket) === "Unclaimed";
  const priorityControl = priorityLocked
    ? `<div class="readonly-status"><span class="label">Priority</span><span class="priority ${priorityClass(ticket.priority)}">${ticket.priority}</span><small>Locked after first save. It cannot be changed later.</small></div>`
    : unclaimed
      ? `<div class="readonly-status"><span class="label">Priority</span><span class="muted">Not set</span><small>Claim or assign the ticket before setting priority.</small></div>`
    : `<label>Priority<select id="prioritySelect"><option value="">Set priority</option>${["Highest", "High", "Medium", "Low"].map((priority) => `<option value="${priority}">${priority}</option>`).join("")}</select><small class="field-warning">One-time save. Confirm carefully.</small></label>`;
  return `<section class="drawer-card">
    <h3>Workflow Control</h3>
    <div class="workflow-grid">
      ${priorityControl}
      <div class="readonly-status"><span class="label">Status</span><span class="badge ${statusClass(ticket.status)}">${ticket.status}</span><small>Updated automatically by workflow actions.</small></div>
    </div>
    ${priorityLocked || unclaimed ? "" : `<div class="form-actions"><button class="primary" data-save-workflow="${ticket.id}">Save Priority</button></div>`}
    <div class="next-step"><span class="label">Next Step</span><p>${nextStepText(ticket)}</p></div>
  </section>`;
}

function facultyPanel(ticket) {
  if (ticket.facultyAssigned !== current.faculty || ticket.status !== "Faculty") return "";
  return `<section class="drawer-card" id="facultyResolution"><h3>Submit Resolution</h3><div class="resolution-form"><textarea id="resolutionText" placeholder="Write your explanation here...">${ticket.resolutionText || ""}</textarea><input class="text-input" id="resolutionRef" placeholder="Textbook page, diagram, or link" value="${escapeAttr(ticket.resolutionReference || "")}"><input class="text-input" id="resolutionVoice" placeholder="Voice note label, optional" value="${escapeAttr(ticket.facultyVoiceNote || "")}"><div class="form-actions"><button class="primary" data-submit-resolution="${ticket.id}">Submit Resolution</button><span class="muted">Minimum 30 characters</span></div></div></section>`;
}

function contentPanel(ticket) {
  return `<section class="drawer-card hidden" id="internalNote"><h3>Internal Note</h3><textarea id="noteText" placeholder="Add context before assigning or closing..."></textarea><div class="form-actions"><button class="primary" data-save-note="${ticket.id}">Save Note</button></div></section>
    <section class="drawer-card hidden" id="finalResolution"><h3>Student-Facing Resolution</h3><textarea id="finalText" placeholder="Write the final answer the student will see...">${ticket.finalResolutionText || ticket.resolutionText || ""}</textarea><select id="resolutionCode"><option>Content corrected</option><option>Explanation clarified</option><option>Student doubt resolved</option><option>Technical issue fixed</option><option>Auto closed after 48h</option></select><div class="form-actions"><button class="primary" data-close-ticket="${ticket.id}">Close Ticket</button></div></section>
    ${ticket.internalNotes.length ? `<section class="drawer-card"><h3>Internal Notes</h3><div class="mini-list">${ticket.internalNotes.map((n) => `<div class="mini-row"><div><strong>${n.author}</strong><p class="muted">${n.text}</p></div></div>`).join("")}</div></section>` : ""}`;
}

function managerPanel(ticket) {
  return `<section class="drawer-card"><h3>Manager Controls</h3><p class="muted">Use this to reassign unclaimed or stalled work. The selected person becomes the ticket owner immediately and the change is written to the timeline.</p>${assignmentSelect(ticket.id, "managerAssignee")}</section>
    <section class="drawer-card"><h3>Manager Resolution</h3><p class="muted">If nobody claims the ticket, the manager can take ownership and close it with a student-facing resolution.</p><div class="resolution-form"><textarea id="managerResolutionText" placeholder="Write the resolution the learner will see...">${ticket.finalResolutionText || ticket.resolutionText || ""}</textarea><select id="managerResolutionCode"><option>Manager resolved</option><option>Content corrected</option><option>Explanation clarified</option><option>Technical issue fixed</option></select><button class="primary" data-manager-resolve="${ticket.id}">Claim and Resolve</button></div></section>`;
}

function resolutionPanel(ticket) {
  if (!ticket.resolutionText && !ticket.finalResolutionText) return "";
  return `<section class="drawer-card"><h3>${ticket.finalResolutionText ? "Final Resolution" : "Faculty Resolution"}</h3><p>${ticket.finalResolutionText || ticket.resolutionText}</p><p class="muted">${ticket.resolutionReference || "No reference attached"}${ticket.facultyVoiceNote ? ` - Voice: ${ticket.facultyVoiceNote}` : ""}</p>${ticket.satisfactionScore ? `<p class="score ${scoreClass(ticket.satisfactionScore)}">${ticket.satisfactionScore.toFixed(1)} satisfaction score</p>` : ""}</section>`;
}

function escalationPanel(ticket) {
  const isEscalation = ticket.status === "Escalation" || ticket.status === "Escalation resolved" || ticket.feedbackType === "thumbs_down" || ticket.escalationResolved;
  if (!isEscalation) return "";
  return `<section class="drawer-card"><h3>Escalation Intake</h3>${detailGrid([
    ["Student response", ticket.followupText || "No written follow-up captured"],
    ["Call requested", ticket.callRequested ? "Yes" : "No"],
    ["Escalation output", ticket.escalationResolved ? "Escalation resolved" : "Needs outreach"],
    ["Student understood", ticket.escalationRating ? `${ticket.escalationRating}/5 rating` : "Pending"],
    ["Student review", ticket.escalationReview || "None"],
  ])}</section>`;
}

function sessionDetailPanel(ticket) {
  const session = ticket.sessionDetails || buildSessionDetails(ticket, ticket.raisedAt);
  const technical = ticket.technicalEscalation || ticket.category === "Can't See Something";
  return `<details class="drawer-card collapse-card" ${technical ? "open" : ""}>
    <summary><span><strong>Student Device Detail</strong><small>Session context for engineering reference</small></span><span class="badge ${technical ? "critical" : "review"}">${technical ? "Technical signal" : "Session detail"}</span></summary>
    ${detailGrid([
      ["Session ID", session.sessionId],
      ["App Version", session.appVersion],
      ["Device", session.device],
      ["OS Version", session.osVersion],
      ["Device Location", session.location],
      ["Network", session.network],
      ["Last Active", absoluteDate(session.lastActive)],
      ["Question Renderer", session.questionRenderEngine],
      ["API Trace", session.apiTrace],
      ["Attachments", `${session.attachmentCount} attached`],
      ["Engineering Note", session.engineeringSignal],
    ])}
  </details>`;
}

function assignmentSelect(id, selectId) {
  const options = [...people.resolvers, ...people.faculty].map((person) => `<option value="${person.name}">${person.name} - ${person.role}</option>`).join("");
  return `<div class="resolution-form"><select id="${selectId}">${options}</select><button class="primary" data-save-manager-assign="${id}">Assign Selected Person</button></div>`;
}

function detailGrid(rows) {
  return `<dl class="detail-grid">${rows.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("")}</dl>`;
}

function openProfile(name) {
  const allPeople = [...people.faculty, ...people.resolvers];
  const person = allPeople.find((item) => item.name === name);
  if (!person) return;
  const scopedTickets = profileTicketsFor(person);
  const owned = scopedTickets.filter((ticket) => ticket.facultyAssigned === name || ticket.claimedBy === name);
  const available = scopedTickets.filter((ticket) => owner(ticket) === "Unclaimed");
  const open = owned.filter((ticket) => ticket.status !== "Closed");
  const resolved = owned.filter((ticket) => ticket.status === "Closed");
  const scores = resolved.map((ticket) => ticket.satisfactionScore).filter((score) => score != null);
  const avg = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
  const options = allPeople.map((item) => `<option value="${item.name}" ${item.name === name ? "selected" : ""}>${item.name} - ${item.role}</option>`).join("");
  el.drawerScrim.hidden = false;
  el.drawer.classList.add("open");
  el.drawer.setAttribute("aria-hidden", "false");
  el.drawer.innerHTML = `<div class="drawer-head"><strong>Profile</strong><button data-close-drawer>x</button></div>
    <div class="drawer-body">
      <section class="person"><span class="avatar" style="background:${person.color}">${person.initials}</span><div><h2>${person.name}</h2><p class="muted">${person.team}</p><span class="badge faculty">${person.role}</span></div></section>
      <section class="drawer-card"><h3>Switch Profile View</h3><select id="profileSwitcher">${options}</select></section>
      <section class="drawer-card"><h3>Performance - ${titleCase(state.period)}</h3>${detailGrid([["Resolved", resolved.length], ["Open", open.length], ["Avg Sat. Score", avg], ["Avg Res. Time", "6.2 hours"], ["Thumbs Up", owned.filter((t) => t.feedbackType === "thumbs_up").length], ["Thumbs Down", owned.filter((t) => t.feedbackType === "thumbs_down").length], ["Auto-Closed", owned.filter((t) => t.feedbackType === "auto_closed").length], ["Escalation", owned.filter((t) => t.status === "Escalation").length]])}</section>
      <section class="drawer-card"><h3>Owned Open Tickets</h3><div class="mini-list">${open.length ? open.map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.subject} - ${hoursLeft(ticket).toFixed(1)}h left</p></div><button class="ghost" data-open="${ticket.id}">Open</button></div>`).join("") : `<p class="muted">No owned open tickets.</p>`}</div></section>
      <section class="drawer-card"><h3>Eligible Unclaimed Tickets</h3><div class="mini-list">${available.length ? available.map((ticket) => `<div class="mini-row"><div><strong>#${ticket.id}</strong><p class="muted">${ticket.subject} - ${hoursLeft(ticket).toFixed(1)}h left</p></div><button class="ghost" data-open="${ticket.id}">Open</button></div>`).join("") : `<p class="muted">No eligible unclaimed tickets.</p>`}</div></section>
      <section class="drawer-card"><h3>Assign From Eligible Unclaimed</h3><select id="profileAssignSelect">${available.map((ticket) => `<option value="${ticket.id}">#${ticket.id} - ${ticket.subject}</option>`).join("")}</select><div class="form-actions"><button class="primary" data-profile-assign="${name}" ${available.length ? "" : "disabled"}>Assign</button></div></section>
    </div>`;
}

function profileTicketsFor(person) {
  if (person.role === "Faculty") {
    return db.tickets.filter((ticket) => ticket.routedTo === "faculty" && (ticket.facultyAssigned === person.name || (owner(ticket) === "Unclaimed" && person.subjects.includes(ticket.subject))));
  }
  return db.tickets.filter((ticket) => ticket.claimedBy === person.name || (owner(ticket) === "Unclaimed" && (ticket.routedTo === "content" || ticket.feedbackType === "thumbs_down" || ticket.status === "Escalation resolved")));
}

function openColumnModal() {
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.innerHTML = `<div class="modal-head"><strong>Column Display and Order Configuration</strong><button data-close-modal>x</button></div>
    <div class="modal-body"><div class="column-picker">${columns.map(([key, label]) => `<label><input type="checkbox" value="${key}" ${state.visibleColumns.includes(key) ? "checked" : ""}> ${label}</label>`).join("")}</div><div class="form-actions"><button class="primary" data-save-columns>Save</button></div></div>`;
}

function closeDrawer() {
  el.drawer.classList.remove("open");
  el.drawer.setAttribute("aria-hidden", "true");
  el.drawerScrim.hidden = true;
}

function closeModal() {
  el.modalScrim.hidden = true;
  el.configModal.removeAttribute("open");
}

function persistAndRender(openId) {
  saveDb();
  render();
  if (openId) openTicket(openId);
}

function claimTicket(id, assignee = current.resolver) {
  const ticket = ticketById(id);
  ticket.claimedBy = assignee;
  if (ticket.status === "Raised" || ticket.status === "Unclaimed") ticket.status = "Being reviewed";
  ticket.timelineStatus = "in_review";
  addHistory(ticket, assignee, "Claimed this ticket");
  persistAndRender(id);
}

function assignFacultyForQuery(ticket) {
  const eligible = people.faculty.filter((faculty) => faculty.subjects.includes(ticket.subject));
  if (!eligible.length) return { assigned: null, reason: "NO_FACULTY_FOR_SUBJECT" };
  const loads = eligible.map((faculty) => ({ faculty, openCount: db.tickets.filter((t) => t.facultyAssigned === faculty.name && t.status !== "Closed").length }));
  const min = Math.min(...loads.map((item) => item.openCount));
  const leastLoaded = loads.filter((item) => item.openCount === min);
  const selected = leastLoaded[Math.floor(Math.random() * leastLoaded.length)].faculty.name;
  return { assigned: selected, reason: leastLoaded.length === 1 ? "LEAST_LOADED" : "RANDOM_TIE_BREAK" };
}

function assignToFaculty(id) {
  const ticket = ticketById(id);
  const result = assignFacultyForQuery(ticket);
  if (result.reason === "NO_FACULTY_FOR_SUBJECT") {
    pushNotification("General", `No faculty for ${ticket.subject}: #${ticket.id} - Manager action needed`, ticket.id);
  } else {
    ticket.facultyAssigned = result.assigned;
    ticket.facultyAssignedAt = new Date().toISOString();
    ticket.status = "Faculty";
    ticket.timelineStatus = "assigned";
    addHistory(ticket, "Content Queries", `${result.reason === "RANDOM_TIE_BREAK" ? "Random tie-break assigned" : "Auto-assigned"} to ${result.assigned}`);
    pushNotification("Content Queries", `Assigned to ${result.assigned}: #${ticket.id} - ${ticket.subject}`, ticket.id);
  }
  persistAndRender(id);
}

function facultyClaim(id) {
  const ticket = ticketById(id);
  ticket.facultyAssigned = current.faculty;
  ticket.facultyAssignedAt = new Date().toISOString();
  ticket.status = "Faculty";
  ticket.timelineStatus = "assigned";
  addHistory(ticket, current.faculty, "Claimed from Subject Pool");
  pushNotification("Content Queries", `${current.faculty} claimed #${ticket.id} from Subject Pool`, ticket.id);
  persistAndRender(id);
}

function submitFacultyResolution(id) {
  const ticket = ticketById(id);
  const text = document.querySelector("#resolutionText")?.value.trim() || "";
  if (text.length < 30) {
    toast("Resolution needs at least 30 characters.");
    return;
  }
  ticket.resolutionText = text;
  ticket.resolutionReference = document.querySelector("#resolutionRef")?.value.trim() || "";
  ticket.facultyVoiceNote = document.querySelector("#resolutionVoice")?.value.trim() || "";
  ticket.status = "Faculty resolved";
  ticket.timelineStatus = "faculty_resolved";
  addHistory(ticket, current.faculty, "Submitted faculty resolution for content review");
  pushNotification("Content Queries", `Faculty resolved #${ticket.id} - ${current.faculty}`, ticket.id);
  persistAndRender(id);
}

function markOutsideSubject(id) {
  const ticket = ticketById(id);
  ticket.facultyAssigned = null;
  ticket.routedTo = "content";
  ticket.returnedByFaculty = true;
  ticket.status = "Being reviewed";
  addHistory(ticket, current.faculty, "Marked outside subject area and returned to content team");
  pushNotification("Content Queries", `Returned by Faculty: #${ticket.id} - Outside subject area`, ticket.id);
  persistAndRender(id);
}

function approveFacultyResolution(id) {
  const ticket = ticketById(id);
  ticket.finalResolutionText = ticket.resolutionText;
  ticket.status = "Worked on";
  ticket.revisionRequested = false;
  addHistory(ticket, current.resolver, "Approved faculty resolution and moved to finalization");
  persistAndRender(id);
}

function sendRevision(id) {
  const ticket = ticketById(id);
  ticket.status = "Faculty";
  ticket.revisionRequested = true;
  addHistory(ticket, current.resolver, "Sent faculty resolution back for revision");
  pushNotification("Content Queries", `Revision requested for #${ticket.id}`, ticket.id);
  persistAndRender(id);
}

function closeTicket(id) {
  const ticket = ticketById(id);
  const finalText = document.querySelector("#finalText")?.value.trim() || ticket.resolutionText;
  if (!finalText || finalText.length < 20) {
    toast("Add a student-facing resolution before closing.");
    return;
  }
  ticket.finalResolutionText = finalText;
  ticket.resolutionCode = document.querySelector("#resolutionCode")?.value || "Student doubt resolved";
  ticket.status = "Closed";
  ticket.timelineStatus = "resolved";
  ticket.resolvedAt = new Date().toISOString();
  if (!ticket.feedbackType && ticket.resolutionCode === "Auto closed after 48h") {
    ticket.feedbackType = "auto_closed";
    ticket.satisfactionScore = satisfactionScore("auto_closed");
  }
  addHistory(ticket, current.resolver, `Closed ticket with code: ${ticket.resolutionCode}`);
  persistAndRender(id);
}

function submitStudentFeedback(id, type) {
  const ticket = ticketById(id);
  ticket.feedbackType = type;
  ticket.satisfactionScore = satisfactionScore(type);
  if (type === "thumbs_down") {
    ticket.status = "Escalation";
    ticket.followupText = document.querySelector("#followupText")?.value.trim() || "";
    addHistory(ticket, current.student, "Marked resolution as unclear");
    pushNotification("General", `Escalation needed: #${ticket.id} - Student not satisfied`, ticket.id);
  } else {
    ticket.status = "Closed";
    ticket.timelineStatus = "resolved";
    ticket.resolvedAt = new Date().toISOString();
    addHistory(ticket, current.student, "Marked resolution helpful");
  }
  persistAndRender(id);
}

function setEscalationRating(id, rating, review) {
  const ticket = ticketById(id);
  ticket.feedbackType = "escalation_resolved";
  ticket.escalationRating = rating || null;
  ticket.escalationReview = review || "";
  ticket.escalationResolved = true;
  ticket.satisfactionScore = satisfactionScore("escalation_resolved", rating);
  ticket.status = "Closed";
  ticket.timelineStatus = "resolved";
  addHistory(ticket, current.student, rating ? `Rated escalation ${rating}/5` : "Skipped escalation rating");
  pushNotification("General", `Escalation closed: #${ticket.id} - ${ticket.satisfactionScore} score`, ticket.id);
  persistAndRender(id);
}

function markEscalationResolved(id) {
  const ticket = ticketById(id);
  ticket.feedbackType = "escalation_resolved";
  ticket.escalationResolved = true;
  ticket.escalationRating = null;
  ticket.satisfactionScore = null;
  ticket.status = "Escalation resolved";
  addHistory(ticket, current.resolver, "Resolved escalation through outreach; waiting for student rating");
  pushNotification("General", `Escalation ready for student rating: #${ticket.id}`, ticket.id);
  persistAndRender(id);
}

function requestCall(id) {
  const ticket = ticketById(id);
  ticket.callRequested = true;
  addHistory(ticket, current.student, "Requested a one-on-one call");
  persistAndRender(id);
}

function managerAssign(id, assignee) {
  const ticket = ticketById(id);
  const isFaculty = people.faculty.some((person) => person.name === assignee);
  if (isFaculty) {
    ticket.facultyAssigned = assignee;
    ticket.claimedBy = null;
    ticket.routedTo = "faculty";
    ticket.status = "Faculty";
  } else {
    ticket.claimedBy = assignee;
    ticket.facultyAssigned = null;
    ticket.status = "Worked on";
  }
  addHistory(ticket, current.manager, `Assigned to ${assignee} based on bandwidth`);
  persistAndRender(id);
}

function managerClaim(id) {
  const ticket = ticketById(id);
  if (owner(ticket) !== "Unclaimed") {
    toast("Only the manager can reassign an already claimed ticket from Manager Controls.");
    return;
  }
  ticket.claimedBy = current.manager;
  ticket.status = ticket.status === "Raised" || ticket.status === "Unclaimed" ? "Being reviewed" : ticket.status;
  ticket.timelineStatus = "in_review";
  addHistory(ticket, current.manager, "Manager claimed this unowned ticket");
  persistAndRender(id);
}

function managerResolve(id) {
  const ticket = ticketById(id);
  const text = document.querySelector("#managerResolutionText")?.value.trim() || "";
  if (text.length < 20) {
    toast("Add a resolution of at least 20 characters.");
    return;
  }
  if (owner(ticket) === "Unclaimed") ticket.claimedBy = current.manager;
  ticket.finalResolutionText = text;
  ticket.resolutionCode = document.querySelector("#managerResolutionCode")?.value || "Manager resolved";
  ticket.status = "Closed";
  ticket.timelineStatus = "resolved";
  ticket.resolvedAt = new Date().toISOString();
  addHistory(ticket, current.manager, `Manager resolved and closed ticket with code: ${ticket.resolutionCode}`);
  persistAndRender(id);
}

function canAssignToMe(ticket) {
  if (ticket.status === "Closed") return false;
  if (owner(ticket) !== "Unclaimed") return false;
  if (state.role === "faculty") return ticket.routedTo === "faculty" && people.faculty.find((person) => person.name === current.faculty).subjects.includes(ticket.subject);
  if (state.role === "content") return ticket.routedTo === "content" || ticket.feedbackType === "thumbs_down" || ticket.status === "Escalation resolved";
  return false;
}

function assignToMe(id) {
  const ticket = ticketById(id);
  if (state.role === "faculty") {
    ticket.facultyAssigned = current.faculty;
    ticket.facultyAssignedAt = new Date().toISOString();
    ticket.status = "Faculty";
    ticket.timelineStatus = "assigned";
    addHistory(ticket, current.faculty, "Claimed this ticket");
    pushNotification("Content Queries", `${current.faculty} assigned themselves to #${ticket.id}`, ticket.id);
  }
  if (state.role === "content") {
    ticket.claimedBy = current.resolver;
    ticket.status = ticket.status === "Raised" || ticket.status === "Unclaimed" ? "Being reviewed" : ticket.status;
    ticket.timelineStatus = "in_review";
    addHistory(ticket, current.resolver, "Claimed this ticket");
  }
  persistAndRender(id);
}

function saveWorkflow(id) {
  const ticket = ticketById(id);
  const nextPriority = document.querySelector("#prioritySelect")?.value;
  if (owner(ticket) === "Unclaimed") {
    toast("Claim or assign this ticket before setting priority.");
    return;
  }
  if (ticket.priority) {
    toast(`Priority is locked as ${ticket.priority}. It cannot be changed.`);
    return;
  }
  if (!nextPriority) {
    toast("Choose a priority before saving.");
    return;
  }
  if (!window.confirm("Priority can only be set once. After saving, it cannot be changed. Continue?")) {
    return;
  }
  ticket.priority = nextPriority;
  ticket.prioritySetAt = new Date().toISOString();
  ticket.prioritySetBy = roleName();
  addHistory(ticket, roleName(), `Set priority to ${nextPriority}; priority is now locked`);
  toast(`Priority set to ${nextPriority} and locked.`);
  persistAndRender(id);
}

function nextStepText(ticket) {
  if (ticket.status === "Closed") return "No action needed. Review the resolution history and satisfaction score if required.";
  if (owner(ticket) === "Unclaimed") return "Assign this ticket to yourself or route it to the right expert before doing resolution work.";
  const ownedByAnotherFaculty = state.role === "faculty" && ticket.facultyAssigned && ticket.facultyAssigned !== current.faculty;
  const ownedByAnotherResolver = state.role === "content" && ticket.claimedBy && ticket.claimedBy !== current.resolver;
  if (ownedByAnotherFaculty || ownedByAnotherResolver) return `This ticket is already claimed by ${owner(ticket)}. Only the manager can reassign it.`;
  if (state.role === "faculty") {
    if (!ticket.resolutionText) return "Write a faculty explanation, attach a reference if useful, then submit the resolution to the content team.";
    return "Resolution is available. Wait for content review or revise if content sends it back.";
  }
  if (state.role === "content") {
    if (ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) return "Student was not satisfied. Complete outreach, then mark the call resolved so the student can rate it.";
    if (ticket.routedTo === "content" && !ticket.claimedBy) return "Assign it to yourself, add an internal note if needed, then move it into review.";
    if (ticket.routedTo === "faculty" && !ticket.facultyAssigned) return "Assign it to an eligible faculty member. If it remains unclaimed for 24 hours, it will auto-assign by least load.";
    if (ticket.resolutionText && !ticket.finalResolutionText) return "Review the faculty resolution, approve or send back, then finalize the student-facing answer.";
    return "Work the ticket through the available actions. The status updates automatically when the next workflow step is completed.";
  }
  return "Manager can reassign this ticket based on bandwidth or SLA risk.";
}

function createStudentQuery() {
  const next = String(db.tickets.length + 1).padStart(5, "0");
  const ticket = createTicket({
    id: `NP-${next}`,
    questionId: 84301 + db.tickets.length,
    student: current.student,
    category: "I Have a Doubt",
    subOption: "Why is this the correct answer?",
    queryText: "I need a simple explanation for why the marked option is correct.",
    priority: "High",
    ageHours: 0.1,
  });
  db.tickets.unshift(ticket);
  pushNotification("Content Queries", `New query landed: #${ticket.id}`, ticket.id);
  persistAndRender(ticket.id);
}

function statusClass(status) {
  if (status === "Closed") return "closed";
  if (status === "Faculty" || status === "Faculty resolved") return "faculty";
  if (status === "Worked on") return "work";
  if (status === "Escalation") return "escalated";
  if (status === "Escalation resolved") return "review";
  if (status === "Being reviewed") return "review";
  if (status === "Unclaimed") return "pool";
  return "open";
}

function slaClass(ticket) {
  if (ticket.status === "Closed") return "resolved";
  if (hoursLeft(ticket) <= 2) return "critical";
  if (hoursLeft(ticket) <= 12) return "warn";
  return "open";
}

function priorityClass(priority) {
  return String(priority || "").toLowerCase();
}

function scoreClass(score) {
  if (score >= 4) return "good";
  if (score >= 3) return "ok";
  return "bad";
}

function titleCase(value) {
  return String(value).replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function relativeTime(date) {
  const hours = Math.max(0, (Date.now() - new Date(date).getTime()) / 3600000);
  if (hours < 1) return `${Math.round(hours * 60)}m ago`;
  if (hours < 48) return `${hours.toFixed(1)}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function isToday(date) {
  if (!date) return false;
  const target = new Date(date);
  const now = new Date();
  return target.getFullYear() === now.getFullYear() && target.getMonth() === now.getMonth() && target.getDate() === now.getDate();
}

function inDateRange(date) {
  if (!date) return false;
  const value = new Date(date).getTime();
  if (state.dateFrom) {
    const from = new Date(`${state.dateFrom}T00:00:00`).getTime();
    if (value < from) return false;
  }
  if (state.dateTo) {
    const to = new Date(`${state.dateTo}T23:59:59.999`).getTime();
    if (value > to) return false;
  }
  return true;
}

function absoluteDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function escapeAttr(value) {
  return String(value).replaceAll('"', "&quot;");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toast(message) {
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  el.toastStack.appendChild(item);
  setTimeout(() => item.remove(), 3400);
}

el.roleToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) return;
  state.role = button.dataset.role;
  state.tab = "all";
  state.status = "all";
  state.assignee = "all";
  closeDrawer();
  render();
});

el.profileSelect.addEventListener("change", (event) => {
  if (state.role === "faculty") current.faculty = event.target.value;
  if (state.role === "content") current.resolver = event.target.value;
  state.tab = "all";
  state.status = "all";
  state.assignee = "all";
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

el.assigneeFilter.addEventListener("change", (event) => {
  state.assignee = event.target.value;
  renderTable();
});

el.dateFromFilter.addEventListener("change", (event) => {
  state.dateFrom = event.target.value;
  renderTabs();
  renderTable();
});

el.dateToFilter.addEventListener("change", (event) => {
  state.dateTo = event.target.value;
  renderTabs();
  renderTable();
});

el.exportCsvButton.addEventListener("click", exportCsv);

document.addEventListener("change", (event) => {
  if (event.target?.id === "profileSwitcher") openProfile(event.target.value);
});

document.addEventListener("click", (event) => {
  const target = event.target;
  const open = target.closest("[data-open]");
  const rowOpen = target.closest("[data-row-open]");
  const close = target.closest("[data-close-drawer]");
  const profile = target.closest("[data-profile]");
  const showPanel = target.closest("[data-show-panel]");
  const sortButton = target.closest("[data-sort]");
  if (sortButton) {
    toggleSort(sortButton.dataset.sort);
    return;
  }
  if (open) openTicket(open.dataset.open);
  if (rowOpen && !target.closest("button, input, select, textarea, a, label")) openTicket(rowOpen.dataset.rowOpen);
  if (close) closeDrawer();
  if (profile) openProfile(profile.dataset.profile);
  if (showPanel) document.querySelector(`#${showPanel.dataset.showPanel}`)?.classList.remove("hidden");
  if (target.closest("[data-claim]")) claimTicket(target.closest("[data-claim]").dataset.claim);
  if (target.closest("[data-assign-self]")) assignToMe(target.closest("[data-assign-self]").dataset.assignSelf);
  if (target.closest("[data-save-workflow]")) saveWorkflow(target.closest("[data-save-workflow]").dataset.saveWorkflow);
  if (target.closest("[data-faculty-claim]")) facultyClaim(target.closest("[data-faculty-claim]").dataset.facultyClaim);
  if (target.closest("[data-assign-faculty]")) assignToFaculty(target.closest("[data-assign-faculty]").dataset.assignFaculty);
  if (target.closest("[data-submit-resolution]")) submitFacultyResolution(target.closest("[data-submit-resolution]").dataset.submitResolution);
  if (target.closest("[data-outside-subject]") && window.confirm("This will return the query to the content team. Continue?")) markOutsideSubject(target.closest("[data-outside-subject]").dataset.outsideSubject);
  if (target.closest("[data-save-note]")) {
    const ticket = ticketById(target.closest("[data-save-note]").dataset.saveNote);
    const text = document.querySelector("#noteText")?.value.trim();
    if (text) {
      ticket.internalNotes.unshift({ author: current.resolver, text, at: new Date().toISOString() });
      addHistory(ticket, current.resolver, "Added internal note");
      persistAndRender(ticket.id);
    }
  }
  if (target.closest("[data-recall]")) {
    const ticket = ticketById(target.closest("[data-recall]").dataset.recall);
    ticket.facultyAssigned = null;
    ticket.status = "Being reviewed";
    addHistory(ticket, current.resolver, "Recalled from faculty");
    persistAndRender(ticket.id);
  }
  if (target.closest("[data-approve-resolution]")) approveFacultyResolution(target.closest("[data-approve-resolution]").dataset.approveResolution);
  if (target.closest("[data-send-revision]")) sendRevision(target.closest("[data-send-revision]").dataset.sendRevision);
  if (target.closest("[data-close-ticket]")) closeTicket(target.closest("[data-close-ticket]").dataset.closeTicket);
  if (target.closest("[data-escalate-engineering]")) {
    const ticket = ticketById(target.closest("[data-escalate-engineering]").dataset.escalateEngineering);
    ticket.technicalEscalation = true;
    addHistory(ticket, current.resolver, "Escalated rendering issue to Engineering via Teams");
    pushNotification("General", `Engineering escalation: #${ticket.id}`, ticket.id);
    persistAndRender(ticket.id);
  }
  if (target.closest("[data-mark-escalation-resolved]")) markEscalationResolved(target.closest("[data-mark-escalation-resolved]").dataset.markEscalationResolved);
  if (target.closest("[data-manager-claim]")) managerClaim(target.closest("[data-manager-claim]").dataset.managerClaim);
  if (target.closest("[data-manager-resolve]")) managerResolve(target.closest("[data-manager-resolve]").dataset.managerResolve);
  if (target.closest("[data-save-manager-assign]")) managerAssign(target.closest("[data-save-manager-assign]").dataset.saveManagerAssign, document.querySelector("#managerAssignee")?.value);
  if (target.closest("[data-profile-assign]")) {
    const assignee = target.closest("[data-profile-assign]").dataset.profileAssign;
    const ticketId = document.querySelector("#profileAssignSelect")?.value;
    if (ticketId) managerAssign(ticketId, assignee);
    openProfile(assignee);
  }
  if (target.closest("[data-period]")) {
    state.period = target.closest("[data-period]").dataset.period;
    renderSidePanel();
  }
});

document.addEventListener("keydown", (event) => {
  const row = event.target.closest?.("[data-row-open]");
  if (!row || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  openTicket(row.dataset.rowOpen);
});

el.drawerScrim.addEventListener("click", closeDrawer);
document.querySelector("#columnsButton").addEventListener("click", openColumnModal);

el.modalScrim.addEventListener("click", (event) => {
  if (event.target === el.modalScrim || event.target.closest("[data-close-modal]")) closeModal();
  if (event.target.closest("[data-save-columns]")) {
    state.visibleColumns = [...el.configModal.querySelectorAll("input:checked")].map((input) => input.value);
    closeModal();
    renderTable();
  }
});

render();
