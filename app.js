const STORE_KEY = "nprep-qms-phase2-prototype-v13";

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
  ["questionId", "Question ID"],
  ["raisedAt", "Raised On"],
  ["student", "Student"],
  ["status", "Current Status"],
  ["category", "Category"],
  ["subOption", "Sub Category"],
  ["subject", "Subject"],
  ["topic", "Topic"],
  ["routedTo", "Team"],
  ["owner", "Assignee"],
  ["sla", "SLA"],
  ["priority", "Priority"],
  ["score", "Score"],
];

const sortableColumns = new Set(["id", "questionId", "raisedAt", "status", "category", "subOption", "subject", "topic", "owner", "sla", "priority", "score"]);

const state = {
  section: "ticket",
  role: "faculty",
  reportView: "manager",
  tab: "all",
  status: "all",
  assignee: "all",
  dateFrom: "",
  dateTo: "",
  search: "",
  questionIdSearch: "",
  period: "week",
  selectedId: "NP-00003",
  sortKey: "sla",
  sortDir: "asc",
  visibleColumns: columns.map(([key]) => key),
};

let db = loadDb();
let voiceRecorderTimer = null;

const el = {
  activeUser: document.querySelector("#activeUser"),
  productNav: document.querySelector("#productNav"),
  pageTitle: document.querySelector(".page-head h1"),
  roleToggle: document.querySelector("#roleToggle"),
  profileSelect: document.querySelector("#profileViewSelect"),
  statsRow: document.querySelector("#statsRow"),
  searchInput: document.querySelector("#searchInput"),
  searchClear: document.querySelector("#searchClear"),
  questionIdFilter: document.querySelector("#questionIdFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  assigneeFilter: document.querySelector("#assigneeFilter"),
  dateFromFilter: document.querySelector("#dateFromFilter"),
  dateToFilter: document.querySelector("#dateToFilter"),
  toolbar: document.querySelector(".toolbar"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
  ticketTabs: document.querySelector("#ticketTabs"),
  mainGrid: document.querySelector(".main-grid"),
  tableTitle: document.querySelector("#tableTitle"),
  tableSubtitle: document.querySelector("#tableSubtitle"),
  tableHead: document.querySelector("#tableHead"),
  ticketTable: document.querySelector("#ticketTable"),
  insightPanel: document.querySelector("#insightPanel"),
  reportDashboard: document.querySelector("#reportDashboard"),
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

function deriveTopic(subject, questionId) {
  const topicMap = {
    Anatomy: ["Neuroanatomy", "Cardiovascular System", "Endocrine Anatomy", "Histology"],
    Pharmacology: ["Autonomic Drugs", "Antibiotics", "CNS Pharmacology", "Emergency Drugs"],
    "Medical Surgical Nursing": ["Respiratory Care", "Cardiac Nursing", "Fluid Electrolytes", "Post-Operative Care"],
    "Community Health Nursing": ["Epidemiology", "National Health Programs", "Maternal Child Health", "Health Education"],
  };
  const topics = topicMap[subject] || ["General"];
  const index = Number(String(questionId).slice(-2)) % topics.length;
  return topics[index];
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
  const topic = input.topic || deriveTopic(subject, input.questionId);
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
    topic,
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
  if (state.section === "report") return state.reportView === "product" ? "Product Team" : "Manager Report";
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
  if (state.role === "product") {
    return [
      ["all", "All", base.length],
      ["intake", "Intake Friction", base.filter((t) => t.category !== "I Have a Doubt").length],
      ["technical", "Engineering", base.filter((t) => t.technicalEscalation || t.category === "Can't See Something").length],
      ["lowCsat", "Low CSAT", base.filter((t) => t.satisfactionScore != null && t.satisfactionScore < 3).length],
      ["breaching", "SLA Risk", base.filter((t) => t.status !== "Closed" && hoursLeft(t) <= 12).length],
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
  if (state.tab === "breaching") rows = rows.filter((t) => t.status !== "Closed" && hoursLeft(t) <= (state.role === "product" ? 12 : 2));
  if (state.tab === "escalated") rows = rows.filter((t) => t.status === "Escalation");
  if (state.tab === "own") rows = rows.filter((t) => t.claimedBy === current.resolver);
  if (state.tab === "intake") rows = rows.filter((t) => t.category !== "I Have a Doubt");
  if (state.tab === "technical") rows = rows.filter((t) => t.technicalEscalation || t.category === "Can't See Something");
  if (state.tab === "lowCsat") rows = rows.filter((t) => t.satisfactionScore != null && t.satisfactionScore < 3);
  if (state.status !== "all") rows = rows.filter((t) => t.status === state.status);
  if (state.assignee !== "all") rows = rows.filter((t) => owner(t) === state.assignee);
  rows = rows.filter((ticket) => inDateRange(ticket.raisedAt));
  if (state.search) {
    const needle = state.search.toLowerCase();
    rows = rows.filter((ticket) => ticket.id.toLowerCase().includes(needle));
  }
  if (state.questionIdSearch) {
    const needle = state.questionIdSearch.toLowerCase();
    rows = rows.filter((ticket) => String(ticket.questionId).toLowerCase().includes(needle));
  }
  return sortTickets(rows);
}

function render() {
  applyAutoAssignments(db, false, true);
  renderTopNav();
  renderModeControls();
  renderProfileSelect();
  el.activeUser.textContent = roleName();
  const isReport = state.section === "report";
  el.pageTitle.textContent = isReport ? "Reports Dashboard" : "Tickets Overview";
  el.toolbar.hidden = isReport;
  el.ticketTabs.hidden = isReport;
  el.mainGrid.hidden = isReport;
  el.reportDashboard.hidden = !isReport;
  el.mainGrid?.classList.toggle("no-side", true);
  renderStats();
  if (isReport) {
    renderReportDashboard();
    return;
  }
  renderFilters();
  renderTabs();
  renderTable();
  renderSidePanel();
}

function renderTopNav() {
  document.querySelectorAll("#productNav [data-section]").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === state.section);
  });
}

function renderModeControls() {
  if (state.section === "report") {
    el.roleToggle.setAttribute("aria-label", "Report view");
    el.roleToggle.innerHTML = [
      ["manager", "Manager Report"],
      ["product", "Product Team"],
    ].map(([view, label]) => `<button class="${state.reportView === view ? "active" : ""}" data-report-view="${view}">${label}</button>`).join("");
    return;
  }
  el.roleToggle.setAttribute("aria-label", "Login role");
  el.roleToggle.innerHTML = [
    ["faculty", "Faculty"],
    ["content", "Content Team"],
    ["manager", "Manager"],
  ].map(([role, label]) => `<button class="${state.role === role ? "active" : ""}" data-role="${role}">${label}</button>`).join("");
}

function renderProfileSelect() {
  if (state.section === "report" || state.role === "manager") {
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
  if (state.section === "report") {
    renderReportStats();
    return;
  }
  const base = roleTickets().filter((ticket) => inDateRange(ticket.raisedAt));
  const open = base.filter((ticket) => ticket.status !== "Closed");
  const closed = base.filter((ticket) => ticket.status === "Closed");
  const closedToday = closed.filter((ticket) => isToday(ticket.resolvedAt));
  const breaching = open.filter((ticket) => hoursLeft(ticket) <= 2);
  const scores = base.map((ticket) => ticket.satisfactionScore).filter((score) => score != null);
  const avgScore = scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
  const activeFaculty = people.faculty.find((person) => person.name === current.faculty);
  const facultySubjects = activeFaculty?.subjects || [];
  const pool = db.tickets.filter((ticket) => ticket.routedTo === "faculty" && !ticket.facultyAssigned && inDateRange(ticket.raisedAt));
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
    product: [
      ["Top Category", topCount(base, "category")?.label || "--", `${topCount(base, "category")?.count || 0} tickets`, ""],
      ["Top Suboption", topCount(base, "subOption")?.label || "--", `${topCount(base, "subOption")?.count || 0} tickets`, "amber"],
      ["Avg SLA Left", avgOpenSla(base), "Open ticket runway", ""],
      ["CSAT", avgScore, "Across resolved feedback", Number(avgScore) >= 4 ? "green" : "amber"],
      ["Engineering", base.filter((t) => t.technicalEscalation || t.category === "Can't See Something").length, "Technical/render signals", "red"],
      ["Low CSAT", base.filter((t) => t.satisfactionScore != null && t.satisfactionScore < 3).length, "Needs intake review", "amber"],
    ],
  };
  el.statsRow.innerHTML = statSets[state.role].map(([label, value, help, tone]) => `<article class="stat-card ${tone}"><span class="label">${label}</span><strong>${value}</strong><span>${help}</span></article>`).join("");
}

function renderReportStats() {
  const rows = db.tickets.filter((ticket) => inDateRange(ticket.raisedAt));
  const open = rows.filter((ticket) => ticket.status !== "Closed");
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 3);
  const technical = rows.filter((ticket) => ticket.technicalEscalation || ticket.category === "Can't See Something");
  const subjectTop = topCount(rows, "subject");
  const topicTop = topCount(rows, "topic");
  const categoryTop = topCount(rows, "category");
  const suboptionTop = topCount(rows, "subOption");
  const statSets = {
    manager: [
      ["Open Tickets", open.length, "Across content and faculty", ""],
      ["SLA Risk", open.filter((ticket) => hoursLeft(ticket) <= 2).length, "Breaching within 2 hours", "red"],
      ["Top Subject", subjectTop?.label || "--", `${subjectTop?.count || 0} queries`, "amber"],
      ["Top Topic", topicTop?.label || "--", `${topicTop?.count || 0} doubts`, ""],
      ["Avg Resolution", avgResolutionHours(rows), "Closed ticket cycle time", "green"],
      ["Avg Score", averageScore(rows), "Resolved CSAT", "green"],
    ],
    product: [
      ["Top Category", categoryTop?.label || "--", `${categoryTop?.count || 0} picks`, ""],
      ["Top Suboption", suboptionTop?.label || "--", `${suboptionTop?.count || 0} picks`, "amber"],
      ["Avg SLA Left", avgOpenSla(rows), "Open ticket runway", ""],
      ["CSAT", averageScore(rows), `${lowCsat.length} low scores`, Number(averageScore(rows)) >= 4 ? "green" : "amber"],
      ["Engineering", technical.length, "Technical/render signals", "red"],
      ["Intake Friction", rows.filter((ticket) => ticket.category !== "I Have a Doubt").length, "Non-doubt categories", "amber"],
    ],
  };
  el.statsRow.innerHTML = statSets[state.reportView].map(([label, value, help, tone]) => `<article class="stat-card ${tone}"><span class="label">${label}</span><strong>${value}</strong><span>${help}</span></article>`).join("");
}

function renderFilters() {
  const scoped = roleTickets();
  const statuses = ["all", ...STATUSES];
  el.statusFilter.innerHTML = statuses.map((status) => `<option value="${status}">${status === "all" ? "All statuses" : status}</option>`).join("");
  el.statusFilter.value = statuses.includes(state.status) ? state.status : "all";
  renderSelectFilter(el.assigneeFilter, ["all", ...new Set(scoped.map((ticket) => owner(ticket)))], state.assignee, "All assignees");
  el.questionIdFilter.value = state.questionIdSearch;
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
    questionId: Number(ticket.questionId),
    raisedAt: new Date(ticket.raisedAt).getTime(),
    status: statusRank[ticket.status] || 99,
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    topic: ticket.topic,
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
  el.tableTitle.textContent = state.role === "faculty" ? "Faculty Queries" : state.role === "content" ? "Content Queries Queue" : state.role === "product" ? "Product Intake Tickets" : "Team Ticket Queue";
  el.tableSubtitle.textContent = `${rows.length} ticket${rows.length === 1 ? "" : "s"} shown${dateRangeLabel()}`;
  el.tableHead.innerHTML = visible.map(([key, label]) => headerCell(key, label)).join("");
  el.ticketTable.innerHTML = rows.map((ticket) => `<tr class="${state.selectedId === ticket.id ? "selected" : ""}" data-row-open="${ticket.id}" tabindex="0">${visible.map(([key]) => `<td>${cell(ticket, key)}</td>`).join("")}</tr>`).join("");
}

function headerCell(key, label) {
  if (!sortableColumns.has(key)) return `<th>${label}</th>`;
  const active = state.sortKey === key;
  const direction = active ? state.sortDir : "none";
  const markerEntity = active ? (state.sortDir === "asc" ? "&#8593;" : "&#8595;") : "&#8597;";
  return `<th aria-sort="${direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}"><button class="sort-header ${active ? "active" : ""}" data-sort="${key}" title="Sort ${label}">${label}<span>${markerEntity}</span></button></th>`;
}

function cell(ticket, key) {
  const value = {
    id: `<button class="ticket-link" data-open="${ticket.id}">#${ticket.id}</button>`,
    questionId: `#${ticket.questionId}`,
    raisedAt: shortDate(ticket.raisedAt),
    student: ticket.student,
    status: statusCell(ticket),
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    topic: ticket.topic,
    routedTo: titleCase(ticket.routedTo),
    owner: owner(ticket),
    sla: ticket.status === "Closed" ? `<span class="badge resolved">Closed</span>` : `<span class="badge ${slaClass(ticket)}">${hoursLeft(ticket).toFixed(1)}h left</span>`,
    priority: owner(ticket) === "Unclaimed" || !ticket.priority ? `<span class="muted">--</span>` : `<span class="priority ${priorityClass(ticket.priority)}">${ticket.priority}</span>`,
    score: ticket.satisfactionScore == null ? `<span class="muted">--</span>` : `<strong class="score ${scoreClass(ticket.satisfactionScore)}">${ticket.satisfactionScore.toFixed(1)}</strong>`,
  };
  return value[key] || "";
}

function rawCell(ticket, key) {
  const value = {
    id: ticket.id,
    questionId: ticket.questionId,
    raisedAt: absoluteDate(ticket.raisedAt),
    student: ticket.student,
    status: ticket.technicalEscalation ? `${ticket.status} - Engineering Escalation` : ticket.status,
    category: ticket.category,
    subOption: ticket.subOption,
    subject: ticket.subject,
    topic: ticket.topic,
    routedTo: titleCase(ticket.routedTo),
    owner: owner(ticket),
    sla: ticket.status === "Closed" ? "Closed" : `${hoursLeft(ticket).toFixed(1)}h left`,
    priority: owner(ticket) === "Unclaimed" || !ticket.priority ? "" : ticket.priority,
    score: ticket.satisfactionScore == null ? "" : ticket.satisfactionScore.toFixed(1),
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
  const includeRaisedExtra = !state.visibleColumns.includes("raisedAt");
  const headers = [...visible.map(([, label]) => label), ...(includeRaisedExtra ? ["Raised At"] : []), "Resolved At"];
  const csvRows = [
    headers.map(csvEscape).join(","),
    ...rows.map((ticket) => [
      ...visible.map(([key]) => rawCell(ticket, key)),
      ...(includeRaisedExtra ? [absoluteDate(ticket.raisedAt)] : []),
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

function downloadReport(type) {
  if (dateRangeInvalid()) {
    toast("Choose a From Date that is before the To Date.");
    return;
  }
  const rows = db.tickets.filter((ticket) => inDateRange(ticket.raisedAt));
  const reportRows = type === "product" ? productReportRows(rows) : managerReportRows(rows);
  const csvRows = [
    ["Section", "Metric", "Value", "Detail"].map(csvEscape).join(","),
    ...reportRows.map((row) => row.map(csvEscape).join(",")),
  ];
  const blob = new Blob([csvRows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `qms-${type}-report-${state.dateFrom || "all"}-to-${state.dateTo || "all"}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast(`Downloaded ${type === "product" ? "product" : "manager"} report.`);
}

function managerReportRows(rows) {
  const agents = [...people.resolvers, ...people.faculty];
  return [
    ["Summary", "Total tickets", rows.length, dateRangeLabel() || "All raised dates"],
    ["Summary", "Open tickets", rows.filter((ticket) => ticket.status !== "Closed").length, "Across content and faculty"],
    ["Summary", "SLA risk", rows.filter((ticket) => ticket.status !== "Closed" && hoursLeft(ticket) <= 2).length, "Breaching within 2 hours"],
    ["Summary", "Average resolution", avgResolutionHours(rows), "Closed tickets"],
    ...topCounts(rows, "subject", 8).map((item) => ["Subject volume", item.label, item.count, "Most queries by subject"]),
    ...topCounts(rows, "topic", 8).map((item) => ["Topic volume", item.label, item.count, "Most doubtful topics"]),
    ...topQuestionRows(rows, 8).map((item) => ["Question hotspots", `#${item.questionId}`, item.count, `${item.topic} - ${item.subject}`]),
    ...agents.map((person) => {
      const owned = rows.filter((ticket) => ticket.facultyAssigned === person.name || ticket.claimedBy === person.name);
      return ["Agent load", person.name, owned.filter((ticket) => ticket.status !== "Closed").length, `${person.role} - ${owned.length} total scoped tickets`];
    }),
  ];
}

function productReportRows(rows) {
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 3).length;
  const technical = rows.filter((ticket) => ticket.technicalEscalation || ticket.category === "Can't See Something").length;
  return [
    ["Summary", "Total intake tickets", rows.length, dateRangeLabel() || "All raised dates"],
    ["Summary", "Average SLA left", avgOpenSla(rows), "Open tickets"],
    ["Summary", "CSAT", averageScore(rows), `${lowCsat} low-score tickets`],
    ["Summary", "Technical/render signals", technical, "Engineering escalation or visibility issue"],
    ...topCounts(rows, "category", 8).map((item) => ["Category mix", item.label, item.count, "Most chosen category"]),
    ...topCounts(rows, "subOption", 10).map((item) => ["Suboption mix", item.label, item.count, "Most chosen suboption"]),
    ...topQuestionRows(rows, 8).map((item) => ["Question hotspots", `#${item.questionId}`, item.count, `${item.topic} - ${item.subject}`]),
    ["Recommendation", "Improve intake defaults", "High", "Use category and suboption leaders as guided choices"],
    ["Recommendation", "Engineering handoff", "High", "Attach session JSON before resolver triage for render issues"],
    ["Recommendation", "Daily product review", "Medium", "Review SLA risk and low CSAT together"],
  ];
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
  el.insightPanel.innerHTML = "";
}

function managerReportPanel() {
  const rows = db.tickets.filter((ticket) => inDateRange(ticket.raisedAt));
  const subjectLeaders = topCounts(rows, "subject", 5);
  const topicLeaders = topCounts(rows, "topic", 5);
  const questionLeaders = topQuestionRows(rows, 5);
  const agents = [...people.resolvers, ...people.faculty];
  return `<div class="report-head"><div><span class="label">Manager Report</span><h3>Team Health</h3></div><button class="primary tiny" data-download-report="manager">Download Report</button></div>
    <div class="report-metrics">
      ${reportMetric("Top Subject", subjectLeaders[0]?.label || "--", `${subjectLeaders[0]?.count || 0} queries`)}
      ${reportMetric("Top Topic", topicLeaders[0]?.label || "--", `${topicLeaders[0]?.count || 0} doubts`)}
      ${reportMetric("SLA Risk", rows.filter((ticket) => ticket.status !== "Closed" && hoursLeft(ticket) <= 2).length, "within 2h")}
      ${reportMetric("Avg Resolution", avgResolutionHours(rows), "closed tickets")}
    </div>
    <section class="insight-card"><h4>Subject Volume</h4>${barList(subjectLeaders, rows.length)}</section>
    <section class="insight-card"><h4>Most Doubtful Topics by Question</h4>${questionList(questionLeaders)}</section>
    <section class="insight-card"><h4>Agent Load</h4><div class="agent-list">${agents.map(renderAgentRow).join("")}</div></section>`;
}

function productDashboardPanel() {
  const rows = db.tickets.filter((ticket) => inDateRange(ticket.raisedAt));
  const categoryLeaders = topCounts(rows, "category", 5);
  const suboptionLeaders = topCounts(rows, "subOption", 5);
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 3).length;
  const technical = rows.filter((ticket) => ticket.technicalEscalation || ticket.category === "Can't See Something").length;
  return `<div class="report-head"><div><span class="label">Product Dashboard</span><h3>Intake Quality</h3></div><button class="primary tiny" data-download-report="product">Download Report</button></div>
    <div class="report-metrics">
      ${reportMetric("Top Category", categoryLeaders[0]?.label || "--", `${categoryLeaders[0]?.count || 0} picks`)}
      ${reportMetric("Top Suboption", suboptionLeaders[0]?.label || "--", `${suboptionLeaders[0]?.count || 0} picks`)}
      ${reportMetric("Avg SLA Left", avgOpenSla(rows), "open tickets")}
      ${reportMetric("CSAT", averageScore(rows), `${lowCsat} low scores`)}
    </div>
    <section class="insight-card"><h4>Category Mix</h4>${barList(categoryLeaders, rows.length)}</section>
    <section class="insight-card"><h4>Suboption Hotspots</h4>${suboptionByCategory(rows)}</section>
    <section class="insight-card"><h4>Product Signals</h4>${detailGrid([
      ["Technical/render issues", technical],
      ["Escalations", rows.filter((ticket) => ticket.status === "Escalation" || ticket.feedbackType === "thumbs_down").length],
      ["Low CSAT", lowCsat],
      ["Unclaimed backlog", rows.filter((ticket) => owner(ticket) === "Unclaimed").length],
    ])}</section>
    <section class="insight-card"><h4>Internal Dashboard Support</h4><ul class="recommendation-list">
      <li>Surface top category and suboption defaults in the student intake flow.</li>
      <li>Flag rendering issues with session JSON before resolver triage.</li>
      <li>Show SLA-risk and low-CSAT tickets together for daily product review.</li>
      <li>Route recurring topic/question IDs into content correction backlog.</li>
    </ul></section>`;
}

function renderReportDashboard() {
  const rows = db.tickets.filter((ticket) => inDateRange(ticket.raisedAt));
  el.reportDashboard.innerHTML = state.reportView === "product" ? productReportDashboard(rows) : managerReportDashboard(rows);
  requestAnimationFrame(() => drawReportCharts(rows, state.reportView));
}

function reportControlBar(type) {
  return `<div class="report-controlbar">
    <div>
      <span class="label">Raised date window</span>
      <div class="report-date-row">
        <label>From <input class="date-input" data-report-date="from" type="date" value="${escapeAttr(state.dateFrom)}"></label>
        <label>To <input class="date-input" data-report-date="to" type="date" value="${escapeAttr(state.dateTo)}"></label>
      </div>
    </div>
    <button class="primary" data-download-report="${type}">Download Report</button>
  </div>`;
}

function managerReportDashboard(rows) {
  const subjectLeaders = topCounts(rows, "subject", 6);
  const topicLeaders = topCounts(rows, "topic", 6);
  const questionLeaders = topQuestionRows(rows, 8);
  return `${reportControlBar("manager")}
    <section class="report-hero">
      <div><span class="label">Manager Report</span><h2>Team Health and Query Load</h2><p>Subject, topic, question, SLA, and bandwidth signals across the full QMS queue.</p></div>
      <div class="report-hero-metrics">${reportMetric("Top Subject", subjectLeaders[0]?.label || "--", `${subjectLeaders[0]?.count || 0} tickets`)}${reportMetric("Top Topic", topicLeaders[0]?.label || "--", `${topicLeaders[0]?.count || 0} doubts`)}</div>
    </section>
    <section class="dashboard-grid manager-report-grid">
      <article class="chart-card chart-wide"><div class="chart-head"><div><span class="label">Bar Graph</span><h3>Subject Query Volume</h3></div></div><canvas data-chart="manager-subject-bar"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Pie Chart</span><h3>Status Mix</h3></div></div><canvas data-chart="manager-status-pie"></canvas><div class="chart-legend">${chartLegend(topCounts(rows, "status", 6))}</div></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Line Chart</span><h3>SLA Risk Trend</h3></div></div><canvas data-chart="manager-sla-line"></canvas></article>
      <article class="chart-card chart-wide"><div class="chart-head"><div><span class="label">Question ID Analysis</span><h3>Most Doubtful Questions</h3></div></div>${questionHotspotTable(questionLeaders)}</article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Bar Graph</span><h3>Agent Open Load</h3></div></div><canvas data-chart="manager-agent-bar"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Topic Analytics</span><h3>Top Doubt Topics</h3></div></div>${barList(topicLeaders, rows.length)}</article>
    </section>`;
}

function productReportDashboard(rows) {
  const categoryLeaders = topCounts(rows, "category", 6);
  const suboptionLeaders = topCounts(rows, "subOption", 7);
  const technical = rows.filter((ticket) => ticket.technicalEscalation || ticket.category === "Can't See Something").length;
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 3).length;
  return `${reportControlBar("product")}
    <section class="report-hero">
      <div><span class="label">Product Team Dashboard</span><h2>Student Intake and Experience Signals</h2><p>Visual readout of what students choose, where intake creates friction, and which issues need product or engineering attention.</p></div>
      <div class="report-hero-metrics">${reportMetric("Technical Signals", technical, "rendering/app-context issues")}${reportMetric("Low CSAT", lowCsat, "tickets below 3.0")}</div>
    </section>
    <section class="dashboard-grid product-report-grid">
      <article class="chart-card"><div class="chart-head"><div><span class="label">Pie Chart</span><h3>Category Mix</h3></div></div><canvas data-chart="product-category-pie"></canvas><div class="chart-legend">${chartLegend(categoryLeaders)}</div></article>
      <article class="chart-card chart-wide"><div class="chart-head"><div><span class="label">Bar Graph</span><h3>Suboption Selection</h3></div></div><canvas data-chart="product-suboption-bar"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Line Chart</span><h3>Current SLA Duration</h3></div></div><canvas data-chart="product-sla-line"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Line Chart</span><h3>CSAT Trend</h3></div></div><canvas data-chart="product-csat-line"></canvas></article>
      <article class="chart-card chart-wide"><div class="chart-head"><div><span class="label">Suboption by Category</span><h3>What Each Intake Category Produces</h3></div></div>${suboptionByCategory(rows)}</article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Signal Bars</span><h3>Internal Dashboard Support</h3></div></div><canvas data-chart="product-signal-bar"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Product Actions</span><h3>Recommended Improvements</h3></div></div><ul class="recommendation-list">
        <li>Move the top suboption under each category into guided student intake prompts.</li>
        <li>Attach session JSON automatically when the category is a visibility/rendering issue.</li>
        <li>Review low-CSAT and SLA-risk tickets together during product standup.</li>
        <li>Create a correction backlog from recurring topic and question-ID hotspots.</li>
      </ul></article>
    </section>`;
}

function chartLegend(items) {
  if (!items.length) return `<p class="muted">No chart data.</p>`;
  return items.map((item, index) => `<span><i style="background:${chartColor(index)}"></i>${item.label}<strong>${item.count}</strong></span>`).join("");
}

function questionHotspotTable(items) {
  if (!items.length) return `<p class="muted">No question trend yet.</p>`;
  return `<div class="hotspot-table">${items.map((item, index) => `<div><span>${index + 1}</span><strong>#${item.questionId}</strong><p>${item.topic}</p><em>${item.subject}</em><b>${item.count}</b></div>`).join("")}</div>`;
}

function drawReportCharts(rows, view) {
  if (view === "manager") {
    drawBarChart(document.querySelector('[data-chart="manager-subject-bar"]'), topCounts(rows, "subject", 6), { horizontal: false, valueLabel: "tickets" });
    drawDonutChart(document.querySelector('[data-chart="manager-status-pie"]'), topCounts(rows, "status", 6));
    drawLineChart(document.querySelector('[data-chart="manager-sla-line"]'), dailySeries(rows, (ticket) => ticket.status !== "Closed" && hoursLeft(ticket) <= 2 ? 1 : 0, "sum"), { suffix: " risk" });
    drawBarChart(document.querySelector('[data-chart="manager-agent-bar"]'), agentLoadItems(rows), { horizontal: true, valueLabel: "open" });
    return;
  }
  drawDonutChart(document.querySelector('[data-chart="product-category-pie"]'), topCounts(rows, "category", 6));
  drawBarChart(document.querySelector('[data-chart="product-suboption-bar"]'), topCounts(rows, "subOption", 7), { horizontal: false, valueLabel: "picks" });
  drawLineChart(document.querySelector('[data-chart="product-sla-line"]'), dailySeries(rows.filter((ticket) => ticket.status !== "Closed"), hoursLeft, "avg"), { suffix: "h" });
  drawLineChart(document.querySelector('[data-chart="product-csat-line"]'), dailySeries(rows.filter((ticket) => ticket.satisfactionScore != null), (ticket) => ticket.satisfactionScore, "avg"), { suffix: "" });
  drawBarChart(document.querySelector('[data-chart="product-signal-bar"]'), productSignalItems(rows), { horizontal: true, valueLabel: "tickets" });
}

function setupCanvas(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(rect.width, 280);
  const height = Math.max(rect.height, 220);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  return { ctx, width, height };
}

function drawBarChart(canvas, items, options = {}) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  const data = items.length ? items : [{ label: "No data", count: 0 }];
  const max = Math.max(1, ...data.map((item) => item.count));
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, width, height);
  if (options.horizontal) {
    const top = 22;
    const row = Math.min(34, (height - 42) / data.length);
    data.forEach((item, index) => {
      const y = top + index * row;
      const barWidth = Math.max(4, ((width - 150) * item.count) / max);
      ctx.fillStyle = "#475467";
      ctx.fillText(truncate(item.label, 17), 12, y + 16);
      ctx.fillStyle = chartColor(index);
      ctx.fillRect(122, y + 4, barWidth, 13);
      ctx.fillStyle = "#344054";
      ctx.fillText(String(item.count), 130 + barWidth, y + 16);
    });
    return;
  }
  const left = 34;
  const bottom = height - 42;
  const chartHeight = bottom - 20;
  const gap = 12;
  const barWidth = Math.max(18, (width - left - 20 - gap * (data.length - 1)) / data.length);
  ctx.strokeStyle = "#e4e7ec";
  ctx.beginPath();
  ctx.moveTo(left, 16);
  ctx.lineTo(left, bottom);
  ctx.lineTo(width - 12, bottom);
  ctx.stroke();
  data.forEach((item, index) => {
    const barHeight = (chartHeight * item.count) / max;
    const x = left + 12 + index * (barWidth + gap);
    const y = bottom - barHeight;
    ctx.fillStyle = chartColor(index);
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = "#344054";
    ctx.fillText(String(item.count), x + 2, y - 6);
    ctx.save();
    ctx.translate(x + barWidth / 2, bottom + 12);
    ctx.rotate(-Math.PI / 5);
    ctx.textAlign = "right";
    ctx.fillStyle = "#667085";
    ctx.fillText(truncate(item.label, 16), 0, 0);
    ctx.restore();
  });
}

function drawDonutChart(canvas, items) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  const data = items.length ? items : [{ label: "No data", count: 1 }];
  const total = data.reduce((sum, item) => sum + item.count, 0) || 1;
  const cx = width / 2;
  const cy = height / 2 - 4;
  const radius = Math.min(width, height) * 0.34;
  let start = -Math.PI / 2;
  data.forEach((item, index) => {
    const angle = (Math.PI * 2 * item.count) / total;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = chartColor(index);
    ctx.fill();
    start += angle;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.textAlign = "center";
  ctx.fillStyle = "#101828";
  ctx.font = "800 24px Inter, system-ui, sans-serif";
  ctx.fillText(String(total), cx, cy + 4);
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#667085";
  ctx.fillText("tickets", cx, cy + 24);
  ctx.textAlign = "left";
}

function drawLineChart(canvas, points, options = {}) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  const data = points.length ? points : [{ label: "No data", value: 0 }];
  const max = Math.max(1, ...data.map((point) => point.value));
  const left = 34;
  const right = width - 16;
  const top = 24;
  const bottom = height - 38;
  ctx.strokeStyle = "#e4e7ec";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = top + ((bottom - top) * i) / 3;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }
  const step = data.length > 1 ? (right - left) / (data.length - 1) : 0;
  const coords = data.map((point, index) => ({
    x: left + step * index,
    y: bottom - ((bottom - top) * point.value) / max,
    ...point,
  }));
  ctx.strokeStyle = "#0875be";
  ctx.lineWidth = 3;
  ctx.beginPath();
  coords.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  coords.forEach((point, index) => {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = chartColor(index);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#344054";
    ctx.fillText(`${Number(point.value).toFixed(point.value % 1 ? 1 : 0)}${options.suffix || ""}`, point.x - 8, point.y - 10);
    if (index === 0 || index === coords.length - 1 || index % 2 === 0) {
      ctx.fillStyle = "#667085";
      ctx.fillText(point.label, point.x - 18, bottom + 22);
    }
  });
}

function dailySeries(rows, valueGetter, mode = "sum", days = 7) {
  const today = new Date();
  const buckets = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - offset);
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
    const end = start + 86400000;
    const items = rows.filter((ticket) => {
      const raised = new Date(ticket.raisedAt).getTime();
      return raised >= start && raised < end;
    });
    const values = items.map(valueGetter).filter((value) => Number.isFinite(value));
    const value = mode === "avg" ? (values.length ? values.reduce((sum, item) => sum + item, 0) / values.length : 0) : values.reduce((sum, item) => sum + item, 0);
    buckets.push({ label: `${day.getDate()}/${day.getMonth() + 1}`, value });
  }
  return buckets;
}

function agentLoadItems(rows) {
  return [...people.resolvers, ...people.faculty].map((person) => ({
    label: person.name.replace(/^Dr\. /, ""),
    count: rows.filter((ticket) => ticket.status !== "Closed" && (ticket.facultyAssigned === person.name || ticket.claimedBy === person.name)).length,
  })).sort((a, b) => b.count - a.count).slice(0, 7);
}

function productSignalItems(rows) {
  return [
    { label: "Render / visibility", count: rows.filter((ticket) => ticket.category === "Can't See Something").length },
    { label: "Engineering escalation", count: rows.filter((ticket) => ticket.technicalEscalation).length },
    { label: "Escalation", count: rows.filter((ticket) => ticket.status === "Escalation" || ticket.feedbackType === "thumbs_down").length },
    { label: "Low CSAT", count: rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 3).length },
    { label: "Unclaimed backlog", count: rows.filter((ticket) => owner(ticket) === "Unclaimed").length },
  ];
}

function chartColor(index) {
  return ["#0875be", "#079455", "#d98b12", "#6941c6", "#d92d20", "#475467", "#0e9384", "#dd2590"][index % 8];
}

function truncate(text, length) {
  const value = String(text || "");
  return value.length > length ? `${value.slice(0, length - 1)}...` : value;
}

function reportMetric(label, value, helper) {
  return `<article class="report-metric"><span class="label">${label}</span><strong>${value}</strong><small>${helper}</small></article>`;
}

function countBy(rows, key) {
  return rows.reduce((map, ticket) => {
    const value = typeof key === "function" ? key(ticket) : ticket[key];
    const label = value || "Unknown";
    map.set(label, (map.get(label) || 0) + 1);
    return map;
  }, new Map());
}

function topCounts(rows, key, limit = 3) {
  return [...countBy(rows, key).entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit);
}

function topCount(rows, key) {
  return topCounts(rows, key, 1)[0];
}

function barList(items, total) {
  if (!items.length) return `<p class="muted">No data available.</p>`;
  return `<div class="bar-list">${items.map((item) => {
    const pct = total ? Math.round((item.count / total) * 100) : 0;
    return `<div class="bar-row"><div><strong>${item.label}</strong><span>${item.count} tickets</span></div><div class="bar-track"><span style="width:${Math.max(pct, 4)}%"></span></div><em>${pct}%</em></div>`;
  }).join("")}</div>`;
}

function questionList(items) {
  if (!items.length) return `<p class="muted">No question trend yet.</p>`;
  return `<div class="mini-list">${items.map((item) => `<div class="mini-row"><div><strong>#${item.questionId}</strong><p class="muted">${item.topic} - ${item.subject}</p></div><span class="badge review">${item.count}</span></div>`).join("")}</div>`;
}

function topQuestionRows(rows, limit = 5) {
  const grouped = new Map();
  rows.forEach((ticket) => {
    const key = `${ticket.questionId}-${ticket.topic}`;
    const current = grouped.get(key) || { questionId: ticket.questionId, topic: ticket.topic, subject: ticket.subject, count: 0 };
    current.count += 1;
    grouped.set(key, current);
  });
  return [...grouped.values()].sort((a, b) => b.count - a.count || a.questionId - b.questionId).slice(0, limit);
}

function suboptionByCategory(rows) {
  const categories = topCounts(rows, "category", 10);
  if (!categories.length) return `<p class="muted">No intake data available.</p>`;
  return `<div class="mini-list">${categories.map(({ label }) => {
    const top = topCounts(rows.filter((ticket) => ticket.category === label), "subOption", 1)[0];
    return `<div class="mini-row"><div><strong>${label}</strong><p class="muted">${top?.label || "--"}</p></div><span class="badge open">${top?.count || 0}</span></div>`;
  }).join("")}</div>`;
}

function averageScore(rows) {
  const scores = rows.map((ticket) => ticket.satisfactionScore).filter((score) => score != null);
  return scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1) : "--";
}

function avgOpenSla(rows) {
  const open = rows.filter((ticket) => ticket.status !== "Closed");
  if (!open.length) return "--";
  return `${(open.reduce((sum, ticket) => sum + hoursLeft(ticket), 0) / open.length).toFixed(1)}h`;
}

function avgResolutionHours(rows) {
  const closed = rows.filter((ticket) => ticket.resolvedAt);
  if (!closed.length) return "--";
  const avg = closed.reduce((sum, ticket) => sum + ((new Date(ticket.resolvedAt).getTime() - new Date(ticket.raisedAt).getTime()) / 3600000), 0) / closed.length;
  return `${avg.toFixed(1)}h`;
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
  stopVoiceTimer();
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
        <div class="drawer-title"><h2>#${ticket.id}</h2>${statusCell(ticket)}<span class="badge ${slaClass(ticket)}">${ticket.status === "Closed" ? "Closed" : `${hoursLeft(ticket).toFixed(1)}h left`}</span></div>
        <p class="muted">${ticket.category} - ${ticket.subOption}</p>
      </section>
      ${drawerActions(ticket)}
      ${workflowPanel(ticket)}
      ${state.role === "content" ? contentPanel(ticket) : ""}
      ${state.role === "manager" ? managerPanel(ticket) : ""}
      <section class="drawer-card"><h3>Student's Query</h3>${detailGrid([
        ["Student", ticket.student],
        ["Subject", ticket.subject],
        ["Topic", ticket.topic],
        ["Question ID", `#${ticket.questionId}`],
        ["Raised At", absoluteDate(ticket.raisedAt)],
        ["Age", relativeTime(ticket.raisedAt)],
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
  const unclaimed = owner(ticket) === "Unclaimed";
  const contentOwnedByMe = state.role === "content" && ticket.claimedBy === current.resolver;
  if (canAssignToMe(ticket)) {
    actions.push(`<button class="primary" data-assign-self="${ticket.id}">Assign to Me</button>`);
    if (unclaimed && state.role === "content") return `<div class="drawer-actions">${actions.join("")}</div>`;
  }
  if (contentOwnedByMe && ticket.status !== "Closed") actions.push(`<button class="ghost" data-show-panel="internalNote">Add Internal Note</button>`);
  if (contentOwnedByMe && ticket.routedTo === "faculty" && !ticket.facultyAssigned) actions.push(`<button class="primary" data-assign-faculty="${ticket.id}">Assign to Faculty</button>`);
  if (contentOwnedByMe && ticket.facultyAssigned && ticket.status !== "Closed") actions.push(`<button class="ghost" data-recall="${ticket.id}">Recall from Faculty</button>`);
  if (contentOwnedByMe && ticket.resolutionText && ticket.status === "Faculty resolved") actions.push(`<button class="primary" data-approve-resolution="${ticket.id}">Approve Faculty Resolution</button>`, `<button class="ghost" data-send-revision="${ticket.id}">Send Back for Revision</button>`);
  if (contentOwnedByMe && ticket.status !== "Closed") {
    actions.push(`<button class="ghost" data-show-panel="finalResolution">Finalize Student Resolution</button>`);
    actions.push(ticket.technicalEscalation ? `<span class="workflow-chip escalated">Escalated to Engineering</span>` : `<button class="danger" data-escalate-engineering="${ticket.id}">Escalate to Engineering</button>`);
  }
  if (contentOwnedByMe && ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) actions.push(`<button class="primary" data-mark-escalation-resolved="${ticket.id}">Mark Call Resolved</button>`);
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
      <div class="readonly-status"><span class="label">Status</span>${statusCell(ticket)}<small>Updated automatically by workflow actions.</small></div>
    </div>
    ${priorityLocked || unclaimed ? "" : `<div class="form-actions"><button class="primary" data-save-workflow="${ticket.id}">Save Priority</button></div>`}
    <div class="next-step"><span class="label">Next Step</span><p>${nextStepText(ticket)}</p></div>
  </section>`;
}

function facultyPanel(ticket) {
  if (ticket.facultyAssigned !== current.faculty || ticket.status !== "Faculty") return "";
  return `<section class="drawer-card" id="facultyResolution"><h3>Submit Resolution</h3><div class="resolution-form"><textarea id="resolutionText" placeholder="Write your explanation here...">${ticket.resolutionText || ""}</textarea><input class="text-input" id="resolutionRef" placeholder="Textbook page, diagram, or link" value="${escapeAttr(ticket.resolutionReference || "")}">${voiceRecorderMarkup(ticket)}<div class="form-actions"><button class="primary" data-submit-resolution="${ticket.id}">Submit Resolution</button><span class="muted">Minimum 30 characters</span></div></div></section>`;
}

function voiceRecorderMarkup(ticket) {
  const note = ticket.facultyVoiceNote || "";
  const hasNote = Boolean(note);
  return `<div class="voice-recorder ${hasNote ? "has-note" : ""}" data-recording="false">
    <div class="voice-main">
      <span class="voice-icon">REC</span>
      <div><strong>Voice explanation</strong><p data-voice-status>${hasNote ? note : "No voice note attached"}</p></div>
    </div>
    <div class="voice-waveform" aria-hidden="true">${Array.from({ length: 18 }, (_, index) => `<span style="height:${12 + ((index * 7) % 24)}px"></span>`).join("")}</div>
    <div class="voice-controls">
      <button type="button" class="ghost" data-toggle-voice-recording>${hasNote ? "Re-record Voice Note" : "Record Voice Note"}</button>
      <button type="button" class="soft-button" data-play-voice-note ${hasNote ? "" : "disabled"}>Play Mock</button>
      <button type="button" class="ghost" data-clear-voice-note ${hasNote ? "" : "disabled"}>Clear</button>
      <span class="voice-timer" data-voice-timer>${hasNote ? "attached" : "00:00"}</span>
    </div>
    <input type="hidden" id="resolutionVoice" value="${escapeAttr(note)}">
  </div>`;
}

function toggleVoiceRecording() {
  const recorder = document.querySelector("#facultyResolution .voice-recorder");
  if (!recorder) return;
  if (recorder.dataset.recording === "true") {
    finishVoiceRecording(recorder);
    return;
  }
  stopVoiceTimer();
  recorder.dataset.recording = "true";
  recorder.dataset.startedAt = String(Date.now());
  recorder.classList.add("recording");
  recorder.querySelector("[data-toggle-voice-recording]").textContent = "Stop Recording";
  recorder.querySelector("[data-voice-status]").textContent = "Recording mock voice note...";
  recorder.querySelector("[data-play-voice-note]").disabled = true;
  recorder.querySelector("[data-clear-voice-note]").disabled = true;
  updateVoiceTimer(recorder);
  voiceRecorderTimer = window.setInterval(() => updateVoiceTimer(recorder), 1000);
}

function finishVoiceRecording(recorder) {
  const elapsed = Math.max(3, Math.round((Date.now() - Number(recorder.dataset.startedAt || Date.now())) / 1000));
  const label = `Mock voice note ${formatDuration(elapsed)}`;
  stopVoiceTimer();
  recorder.dataset.recording = "false";
  recorder.classList.remove("recording");
  recorder.classList.add("has-note");
  recorder.querySelector("#resolutionVoice").value = label;
  recorder.querySelector("[data-voice-status]").textContent = label;
  recorder.querySelector("[data-toggle-voice-recording]").textContent = "Re-record Voice Note";
  recorder.querySelector("[data-play-voice-note]").disabled = false;
  recorder.querySelector("[data-clear-voice-note]").disabled = false;
  recorder.querySelector("[data-voice-timer]").textContent = "attached";
  toast("Mock voice note attached to this resolution.");
}

function updateVoiceTimer(recorder) {
  const timer = recorder.querySelector("[data-voice-timer]");
  const startedAt = Number(recorder.dataset.startedAt || Date.now());
  timer.textContent = formatDuration(Math.round((Date.now() - startedAt) / 1000));
}

function clearVoiceNote() {
  const recorder = document.querySelector("#facultyResolution .voice-recorder");
  if (!recorder) return;
  stopVoiceTimer();
  recorder.dataset.recording = "false";
  recorder.classList.remove("recording", "has-note", "playing");
  recorder.querySelector("#resolutionVoice").value = "";
  recorder.querySelector("[data-voice-status]").textContent = "No voice note attached";
  recorder.querySelector("[data-toggle-voice-recording]").textContent = "Record Voice Note";
  recorder.querySelector("[data-play-voice-note]").disabled = true;
  recorder.querySelector("[data-clear-voice-note]").disabled = true;
  recorder.querySelector("[data-voice-timer]").textContent = "00:00";
}

function playVoiceNote() {
  const recorder = document.querySelector("#facultyResolution .voice-recorder");
  if (!recorder || !recorder.querySelector("#resolutionVoice").value) return;
  recorder.classList.add("playing");
  recorder.querySelector("[data-voice-status]").textContent = `Playing ${recorder.querySelector("#resolutionVoice").value}`;
  window.setTimeout(() => {
    if (!document.body.contains(recorder)) return;
    recorder.classList.remove("playing");
    recorder.querySelector("[data-voice-status]").textContent = recorder.querySelector("#resolutionVoice").value;
  }, 1800);
}

function stopVoiceTimer() {
  if (voiceRecorderTimer) {
    window.clearInterval(voiceRecorderTimer);
    voiceRecorderTimer = null;
  }
}

function formatDuration(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
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
    <div class="json-section">
      <div class="json-section-head"><h4>Mock JSON Views</h4><p>Expandable sample payloads for engineering handoff.</p></div>
      ${jsonPayloadCards(ticket, session)}
    </div>
  </details>`;
}

function jsonPayloadCards(ticket, session) {
  return `<div class="json-payload-list">${sessionJsonPayloads(ticket, session).map((item, index) => `<details class="json-card" ${index === 0 ? "open" : ""}>
    <summary><span><strong>${item.file}</strong><small>${item.help}</small></span><span class="json-tag">Mock JSON</span></summary>
    <pre><code>${escapeHtml(JSON.stringify(item.payload, null, 2))}</code></pre>
  </details>`).join("")}</div>`;
}

function sessionJsonPayloads(ticket, session) {
  const technical = ticket.technicalEscalation || ticket.category === "Can't See Something";
  const traceId = `trace-${ticket.id.toLowerCase()}-${String(ticket.questionId).slice(-4)}`;
  return [
    {
      file: "session-context.json",
      help: "Ticket, learner, app, and session snapshot",
      payload: {
        version: "mock-session-v1",
        ticketId: ticket.id,
        questionId: ticket.questionId,
        topic: ticket.topic,
        studentAlias: ticket.student,
        sessionId: session.sessionId,
        appVersion: session.appVersion,
        raisedAt: ticket.raisedAt,
        lastActiveAt: session.lastActive,
        route: ticket.routedTo,
        status: ticket.status,
      },
    },
    {
      file: "device-runtime.json",
      help: "Device, network, location, and runtime state",
      payload: {
        version: "mock-device-v1",
        device: {
          model: session.device,
          osVersion: session.osVersion,
          locale: "en-IN",
          timezone: "Asia/Kolkata",
          batteryPct: 72,
          lowPowerMode: false,
        },
        network: {
          type: session.network,
          latencyMs: technical ? 840 : 132,
          packetLossPct: technical ? 3.2 : 0,
        },
        location: {
          cityCountry: session.location,
          source: "coarse_ip",
        },
      },
    },
    {
      file: "render-diagnostics.json",
      help: "Question renderer, asset, and API trace",
      payload: {
        version: "mock-render-v2",
        traceId,
        renderer: session.questionRenderEngine,
        apiTrace: session.apiTrace,
        assetManifest: {
          questionStemLoaded: true,
          explanationLoaded: true,
          imageLoaded: !technical,
          voiceNoteAttached: Boolean(ticket.studentVoiceNote),
          referenceAttached: Boolean(ticket.studentReference),
        },
        webview: {
          engine: "Chromium WebView",
          cacheHit: !technical,
          lastErrorCode: technical ? "ASSET_TIMEOUT" : null,
        },
      },
    },
  ];
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
  stopVoiceTimer();
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

function statusCell(ticket) {
  const engineering = ticket.technicalEscalation ? `<span class="badge engineering">Engineering Escalation</span>` : "";
  return `<span class="status-stack"><span class="badge ${statusClass(ticket.status)}">${ticket.status}</span>${engineering}</span>`;
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

function shortDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

el.productNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section]");
  if (!button) return;
  state.section = button.dataset.section;
  state.tab = "all";
  closeDrawer();
  render();
});

el.roleToggle.addEventListener("click", (event) => {
  const reportButton = event.target.closest("[data-report-view]");
  if (reportButton) {
    state.reportView = reportButton.dataset.reportView;
    closeDrawer();
    render();
    return;
  }
  const button = event.target.closest("[data-role]");
  if (!button) return;
  state.role = button.dataset.role;
  state.tab = "all";
  state.status = "all";
  state.assignee = "all";
  state.questionIdSearch = "";
  closeDrawer();
  render();
});

el.profileSelect.addEventListener("change", (event) => {
  if (state.role === "faculty") current.faculty = event.target.value;
  if (state.role === "content") current.resolver = event.target.value;
  state.tab = "all";
  state.status = "all";
  state.assignee = "all";
  state.questionIdSearch = "";
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

el.questionIdFilter.addEventListener("input", (event) => {
  state.questionIdSearch = event.target.value;
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
  render();
});

el.dateToFilter.addEventListener("change", (event) => {
  state.dateTo = event.target.value;
  render();
});

el.exportCsvButton.addEventListener("click", exportCsv);

document.addEventListener("change", (event) => {
  const reportDate = event.target.closest?.("[data-report-date]");
  if (reportDate) {
    if (reportDate.dataset.reportDate === "from") state.dateFrom = reportDate.value;
    if (reportDate.dataset.reportDate === "to") state.dateTo = reportDate.value;
    render();
    return;
  }
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
  const reportButton = target.closest("[data-download-report]");
  if (reportButton) {
    downloadReport(reportButton.dataset.downloadReport);
    return;
  }
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
  if (target.closest("[data-toggle-voice-recording]")) toggleVoiceRecording();
  if (target.closest("[data-play-voice-note]")) playVoiceNote();
  if (target.closest("[data-clear-voice-note]")) clearVoiceNote();
  if (target.closest("[data-submit-resolution]")) submitFacultyResolution(target.closest("[data-submit-resolution]").dataset.submitResolution);
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
    if (ticket.claimedBy !== current.resolver) {
      toast("Claim this ticket before escalating it to Engineering.");
      return;
    }
    if (ticket.technicalEscalation) {
      toast("This ticket is already escalated to Engineering.");
      return;
    }
    ticket.technicalEscalation = true;
    addHistory(ticket, current.resolver, "Escalated rendering issue to Engineering");
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
