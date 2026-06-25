const STORE_KEY = "nprep-qms-phase2-prototype-v21";
const COLUMN_WIDTH_KEY = "nprep-qms-column-widths-v1";

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

const ALL_SUBJECTS = ["Anatomy", "Pharmacology", "Medical Surgical Nursing", "Community Health Nursing"];

const people = {
  operators: [
    { name: "Meera Joshi", initials: "MJ", color: "#7c3aed", role: "Resolver", team: "Anatomy, Medical Surgical Nursing", subjects: ["Anatomy", "Medical Surgical Nursing"] },
    { name: "Arjun Rao", initials: "AR", color: "#2563eb", role: "Resolver", team: "Pharmacology", subjects: ["Pharmacology"] },
    { name: "Sunita Verma", initials: "SV", color: "#059669", role: "Resolver", team: "Anatomy, Pharmacology, Community Health Nursing", subjects: ["Anatomy", "Pharmacology", "Community Health Nursing"] },
    { name: "Priya S.", initials: "PS", color: "#7c3aed", role: "Resolver", team: "Content QA", subjects: ALL_SUBJECTS },
    { name: "Rahul M.", initials: "RM", color: "#2563eb", role: "Resolver", team: "Engineering", subjects: ALL_SUBJECTS },
    { name: "Sneha T.", initials: "ST", color: "#059669", role: "Resolver", team: "Support", subjects: ALL_SUBJECTS },
    { name: "Amit K.", initials: "AK", color: "#d97706", role: "Resolver", team: "Ops Triage", subjects: ALL_SUBJECTS },
  ],
};

const current = {
  student: "Riya Sharma",
  operator: "Meera Joshi",
  faculty: "Meera Joshi",
  resolver: "Priya S.",
  manager: "Harshit",
};

const STATUSES = [
  "Unclaimed",
  "Working on",
  "Being reviewed",
  "Resolution submitted",
  "Escalation",
  "Escalation resolved",
  "Closed",
];

const STATUS_ALIASES = {
  "In Review": "Being reviewed",
  "Being Worked On": "Working on",
  "Worked on": "Working on",
  "With Faculty": "Being reviewed",
  Faculty: "Being reviewed",
  "Faculty Resolved": "Resolution submitted",
  "Faculty resolved": "Resolution submitted",
  Escalated: "Escalation",
  "Escalation Resolved": "Escalation resolved",
};

const CT_DATA = {
  subjects: ["Anatomy", "Pharmacology", "Medical Surgical Nursing", "Community Health Nursing", "Pediatrics", "Obstetrics & Gynecology", "Psychiatry"],
  chapters: {
    "Anatomy": ["Upper Limb", "Lower Limb", "Head & Neck", "Thorax", "Abdomen", "Neuroanatomy", "Histology & Embryology"],
    "Pharmacology": ["Autonomic Pharmacology", "CNS Pharmacology", "Cardiovascular Drugs", "Antimicrobials", "Endocrine Pharmacology", "Chemotherapy"],
    "Medical Surgical Nursing": ["Cardiovascular Disorders", "Respiratory Disorders", "Neurological Disorders", "GI Disorders", "Renal Disorders", "Endocrine Disorders"],
    "Community Health Nursing": ["Epidemiology", "Communicable Diseases", "Maternal & Child Health", "School & Occupational Health", "Environmental Health"],
    "Pediatrics": ["Growth & Development", "Neonatal Disorders", "Nutritional Disorders", "Infectious Diseases in Children", "Congenital Anomalies"],
    "Obstetrics & Gynecology": ["Normal Pregnancy", "Complications of Pregnancy", "Labour & Delivery", "Postpartum Care", "Gynecological Disorders"],
    "Psychiatry": ["Schizophrenia & Psychosis", "Mood Disorders", "Anxiety & Stress Disorders", "Personality Disorders", "Substance Use Disorders"],
  },
  topics: {
    "Upper Limb": ["Shoulder Joint", "Brachial Plexus", "Cubital Fossa", "Carpal Tunnel", "Muscles of Forearm & Hand"],
    "Lower Limb": ["Hip Joint", "Femoral Triangle", "Popliteal Fossa", "Sciatic Nerve", "Foot Arches & Joints"],
    "Head & Neck": ["Cranial Nerves", "Cavernous Sinus", "Thyroid & Parathyroid", "Parotid & Salivary Glands", "Triangles of Neck"],
    "Thorax": ["Heart & Great Vessels", "Lungs & Pleura", "Mediastinum", "Diaphragm", "Intercostal Spaces"],
    "Abdomen": ["Liver & Biliary System", "Stomach & Duodenum", "Small & Large Intestine", "Peritoneum & Mesentery", "Kidneys & Ureters"],
    "Neuroanatomy": ["Cerebral Cortex", "Basal Ganglia & Thalamus", "Brainstem", "Cerebellum", "Spinal Cord"],
    "Histology & Embryology": ["Epithelium", "Connective Tissue", "Muscle Tissue", "Nerve Tissue", "Early Embryology"],
    "Autonomic Pharmacology": ["Cholinergic Agonists", "Cholinergic Blockers", "Adrenergic Agonists", "Adrenergic Blockers"],
    "CNS Pharmacology": ["Sedatives & Hypnotics", "Antiepileptics", "Antipsychotics", "Antidepressants", "Opioid Analgesics"],
    "Cardiovascular Drugs": ["Antihypertensives", "Antiarrhythmics", "Anticoagulants & Antiplatelet", "Diuretics", "Cardiac Glycosides"],
    "Antimicrobials": ["Penicillins & Cephalosporins", "Fluoroquinolones", "Macrolides & Tetracyclines", "Aminoglycosides", "Antifungals & Antivirals"],
    "Endocrine Pharmacology": ["Insulin & Oral Hypoglycemics", "Thyroid Drugs", "Corticosteroids", "Sex Hormones & Contraceptives"],
    "Chemotherapy": ["Alkylating Agents", "Antimetabolites", "Antibiotics in Cancer", "Targeted Therapy"],
    "Cardiovascular Disorders": ["Heart Failure", "Myocardial Infarction", "Hypertension", "Arrhythmias", "Valvular Disorders"],
    "Respiratory Disorders": ["Asthma & COPD", "Pneumonia", "TB Nursing", "ARDS", "Pleural Disorders"],
    "Neurological Disorders": ["Stroke & TIA", "Epilepsy", "Parkinson's Disease", "Meningitis", "Spinal Cord Injury"],
    "GI Disorders": ["Peptic Ulcer", "Liver Cirrhosis", "Pancreatitis", "IBD", "Colorectal Disorders"],
    "Renal Disorders": ["Acute Kidney Injury", "CKD & Dialysis", "Urinary Tract Infection", "Nephrotic Syndrome", "Kidney Stones"],
    "Endocrine Disorders": ["Diabetes Mellitus Nursing", "Thyroid Disorders", "Adrenal Disorders", "Pituitary Disorders"],
    "Epidemiology": ["Descriptive Epidemiology", "Analytical Studies", "Disease Burden Indicators", "Screening & Prevention"],
    "Communicable Diseases": ["Respiratory Infections", "Vector-Borne Diseases", "Sexually Transmitted Infections", "Vaccine-Preventable Diseases"],
    "Maternal & Child Health": ["Antenatal Care", "Family Planning", "Immunisation Programme", "IMNCI"],
    "School & Occupational Health": ["School Health Programme", "Occupational Hazards", "Ergonomics", "First Aid"],
    "Environmental Health": ["Water Supply & Sanitation", "Air & Noise Pollution", "Food Safety", "Waste Management"],
    "Growth & Development": ["Developmental Milestones", "Growth Charts", "Developmental Assessment", "Play & Stimulation"],
    "Neonatal Disorders": ["Neonatal Jaundice", "Respiratory Distress", "Neonatal Sepsis", "Congenital Hypothyroidism"],
    "Nutritional Disorders": ["PEM", "Vitamin Deficiencies", "Obesity in Children", "Iron Deficiency Anaemia"],
    "Infectious Diseases in Children": ["Measles & Mumps", "Typhoid", "Dengue", "Malaria in Children"],
    "Congenital Anomalies": ["Neural Tube Defects", "Congenital Heart Disease", "Cleft Lip & Palate", "Down Syndrome"],
    "Normal Pregnancy": ["Physiological Changes", "Antenatal Assessment", "Nutritional Needs", "Fetal Development"],
    "Complications of Pregnancy": ["Pre-eclampsia", "Gestational Diabetes", "Placenta Previa", "PROM"],
    "Labour & Delivery": ["Stages of Labour", "Fetal Monitoring", "Normal Delivery", "Instrumental Delivery"],
    "Postpartum Care": ["Postpartum Haemorrhage", "Puerperal Sepsis", "Breast Feeding", "Postnatal Assessment"],
    "Gynecological Disorders": ["Menstrual Disorders", "PCOS", "Uterine Fibroids", "Cervical Cancer Screening"],
    "Schizophrenia & Psychosis": ["Positive Symptoms", "Negative Symptoms", "Antipsychotic Therapy", "Nursing Care"],
    "Mood Disorders": ["Major Depression", "Bipolar Disorder", "Electroconvulsive Therapy", "Suicide Risk"],
    "Anxiety & Stress Disorders": ["GAD", "Panic Disorder", "OCD", "PTSD"],
    "Personality Disorders": ["Cluster A, B, C", "Borderline Personality", "Antisocial Personality", "Therapeutic Approaches"],
    "Substance Use Disorders": ["Alcohol Dependence", "Opioid Use Disorder", "Detoxification Protocols", "Relapse Prevention"],
  },
  qbankTests: ["QBank Practice Set 1", "QBank Practice Set 2", "QBank Practice Set 3", "QBank Revision Module A", "QBank Revision Module B", "Grand Practice Series 1", "Grand Practice Series 2"],
  liveTests: ["All India Grand Test 1", "All India Grand Test 2", "All India Grand Test 3", "All India Mock 1", "All India Mock 2", "All India Mock 3", "Pre-Final All India Mock"],
  pyqTests: ["NEET PG 2023", "NEET PG 2022", "NEET PG 2021", "NEET PG 2020", "NEET PG 2019", "AIIMS Nov 2019", "AIIMS May 2019"],
  subjectTests: ["Anatomy Subject Test", "Pharmacology Subject Test", "MSN Subject Test", "CHN Subject Test", "Pediatrics Subject Test", "OBG Subject Test", "Psychiatry Subject Test"],
};

const columns = [
  ["id", "Ticket ID"],
  ["questionId", "Question ID"],
  ["raisedAt", "Raised On"],
  ["student", "Student"],
  ["status", "Current Status"],
  ["source", "Source"],
  ["category", "Category"],
  ["subOption", "Sub Category"],
  ["subject", "Subject"],
  ["topic", "Topic"],
  ["owner", "Assignee"],
  ["sla", "SLA"],
  ["priority", "Priority"],
  ["score", "Score"],
];

const sortableColumns = new Set(["id", "questionId", "raisedAt", "status", "source", "category", "subOption", "subject", "topic", "owner", "sla", "priority", "score"]);
const DEFAULT_COLUMN_WIDTHS = {
  id: 122,
  questionId: 118,
  raisedAt: 190,
  student: 150,
  status: 190,
  category: 220,
  subOption: 300,
  subject: 230,
  topic: 220,
  source: 90,
  owner: 170,
  sla: 120,
  priority: 130,
  score: 92,
};

const state = {
  section: "ticket",
  role: "team",
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
  sortKey: "raisedAt",
  sortDir: "desc",
  visibleColumns: columns.map(([key]) => key),
  managerFilter: null,
  resolverSort: { key: "avgScore", dir: "desc" },
  columnWidths: loadColumnWidths(),
};

let db = loadDb();
let voiceRecorderTimer = null;
let columnResize = null;

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
  managerBackBtn: document.querySelector("#managerBackBtn"),
  tableTitle: document.querySelector("#tableTitle"),
  tableSubtitle: document.querySelector("#tableSubtitle"),
  tableCols: document.querySelector("#tableCols"),
  tableHead: document.querySelector("#tableHead"),
  ticketTable: document.querySelector("#ticketTable"),
  insightPanel: document.querySelector("#insightPanel"),
  reportDashboard: document.querySelector("#reportDashboard"),
  drawer: document.querySelector("#ticketDrawer"),
  drawerScrim: document.querySelector("#drawerScrim"),
  modalScrim: document.querySelector("#modalScrim"),
  configModal: document.querySelector("#configModal"),
  toastStack: document.querySelector("#toastStack"),
  createTicketButton: document.querySelector("#createTicketButton"),
  pullTicketButton: document.querySelector("#pullTicketButton"),
  resetFiltersButton: document.querySelector("#resetFiltersButton"),
  fireAlerts: document.querySelector("#fireAlerts"),
};

function deriveRouting(category, subOption) {
  if (FACULTY_ROUTED[category]?.includes(subOption)) return "faculty";
  if (CONTENT_ROUTED[category]?.includes(subOption)) return "content";
  if (category === "Others") return "support";
  return "content";
}

function deriveSource(category) {
  if (category === "Can't See Something" || category === "Problem with this Question") return "Tests";
  return "QBank";
}

function routeLabel(route) {
  if (route === "faculty") return "subject resolver queue";
  if (route === "support") return "support queue";
  return "content queue";
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
  if (feedbackType === "thumbs_up") return 3.0;
  if (feedbackType === "auto_closed") return 2.0;
  if (feedbackType === "thumbs_down") return 1.0;
  if (feedbackType === "escalation_resolved") return Math.min(3, rating || 2.0);
  return null;
}

function normalizeStatus(status) {
  const next = STATUS_ALIASES[status] || status || "Unclaimed";
  return STATUSES.includes(next) ? next : "Unclaimed";
}

function buildSessionDetails(input, raisedAt) {
  const seed = Number(String(input.questionId || input.id || 0).replace(/\D/g, "")) || 1;
  const devices = ["Samsung Galaxy M34", "Redmi Note 12", "iPhone 13", "Pixel 7a", "OnePlus Nord CE"];
  const platforms = ["Android 14", "Android 13", "iOS 17.5", "Android 14", "Android 13"];
  const appVersions = ["4.18.2", "4.18.1", "4.17.9", "4.18.2", "4.17.8"];
  const locations = ["Delhi, IN", "Jaipur, IN", "Lucknow, IN", "Patna, IN", "Pune, IN"];
  const networks = ["4G - Jio", "Wi-Fi - home", "5G - Airtel", "Wi-Fi - campus", "4G - Vi"];
  const screens = ["1080×2400", "720×1600", "1170×2532", "1080×2340", "1080×2280"];
  const memories = ["2.1 GB / 6 GB", "1.8 GB / 4 GB", "3.2 GB / 8 GB", "2.6 GB / 6 GB", "1.4 GB / 4 GB"];
  const hasRenderConcern = input.technicalEscalation || input.category === "Can't See Something";
  const av = appVersions[seed % appVersions.length];
  return {
    sessionId: `SES-${String(seed).slice(-6).padStart(6, "0")}`,
    appVersion: av,
    buildHash: `${av}-build.${String(seed * 31337 % 99999999).padStart(8, "0")}`,
    device: devices[seed % devices.length],
    osVersion: platforms[seed % platforms.length],
    screen: screens[seed % screens.length],
    memoryUsed: memories[seed % memories.length],
    location: locations[seed % locations.length],
    network: networks[seed % networks.length],
    networkLatency: hasRenderConcern ? `${340 + (seed % 200)} ms` : `${42 + (seed % 80)} ms`,
    lastActive: raisedAt,
    questionRenderEngine: hasRenderConcern ? "⚠ Content renderer flagged" : "✓ Content renderer healthy",
    apiTrace: hasRenderConcern ? `ERR_ASSET_TIMEOUT — GET /content/q/${input.questionId}/assets (30 s)` : `200 OK — all content APIs responded`,
    errorLog: hasRenderConcern ? `ERR_CONTENT_RENDER at renderer.js:412 — asset fetch failed` : "No recent errors",
    crashLog: hasRenderConcern ? `ANR detected 2 min before ticket raised (main thread blocked 8 s)` : "No crashes in session",
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
    escalationRaisedAt: input.escalationRaisedAt || null,
    escalationResolvedAt: input.escalationResolvedAt || null,
    resolutionText: input.resolutionText || "",
    finalResolutionText: input.finalResolutionText || "",
    resolutionReference: input.resolutionReference || "",
    resolutionImageName: input.resolutionImageName || "",
    resolutionImageData: input.resolutionImageData || "",
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
    source: input.source || deriveSource(input.category),
    studentConfirmed: input.studentConfirmed || false,
    sessionDetails: input.sessionDetails || buildSessionDetails(input, raisedAt),
    history: input.history || [
      eventLine("SYSTEM", "Ticket created from student query"),
      eventLine("Auto-router", `Routed to ${routeLabel(routedTo)}`),
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
      status: "Unclaimed",
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
      status: "Working on",
      timelineStatus: "being_worked_on",
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
      status: "Working on",
      timelineStatus: "being_worked_on",
      facultyAssigned: "Meera Joshi",
      studentVoiceNote: "0:24 voice note",
      history: [eventLine("SYSTEM", "Ticket created from student query"), eventLine("Auto-router", "Auto-assigned to Meera Joshi")],
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
      satisfactionScore: 3.0,
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
      timelineStatus: "escalated",
      facultyAssigned: "Arjun Rao",
      resolvedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
      escalationRaisedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
      resolutionText: "Option C is incorrect because it describes an adverse-effect management step, not the priority intervention.",
      feedbackType: "thumbs_down",
      satisfactionScore: 1.0,
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
      facultyAssigned: "Sunita Verma",
      resolvedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
      resolutionText: "Both sources use different wording, but the NPrep answer follows the exam-specific nursing context.",
      resolutionReference: "Textbook reference page 119",
      feedbackType: "auto_closed",
      satisfactionScore: 2.0,
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
      status: "Escalation resolved",
      timelineStatus: "escalation_resolved",
      facultyAssigned: "Meera Joshi",
      resolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      escalationRaisedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
      escalationResolvedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
      resolutionText: "Priority is decided by airway and immediate risk. Option A is correct because it prevents deterioration first.",
      finalResolutionText: "Priority is decided by airway and immediate risk. Option A is correct because it prevents deterioration first.",
      feedbackType: "escalation_resolved",
      escalationRating: 3,
      escalationReview: "Sir explained it very clearly on the call.",
      escalationResolved: true,
      satisfactionScore: 3,
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
      status: "Unclaimed",
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
      status: "Working on",
      timelineStatus: "being_worked_on",
      claimedBy: "Rahul M.",
      technicalEscalation: true,
      studentReference: "Screenshot attached",
    }),
    createTicket({
      id: "NP-00011",
      questionId: 84301,
      student: "Kavya N.",
      category: "Problem with the Answer",
      subOption: "The answer shown is wrong",
      queryText: "Option A is marked correct but my reference says option C is the right first-line intervention.",
      studentDoubt: "Checked three textbooks — all point to option C for initial nursing action. The marked answer seems incorrect.",
      priority: "High",
      ageHours: 5,
      status: "Being reviewed",
      timelineStatus: "in_review",
      claimedBy: "Priya S.",
      resolutionText: "Option A is correct in the NPrep context because the question specifies immediate nursing action under exam conditions where airway takes precedence over circulation assessment. Option C applies only in post-stabilisation. The rationale has been reviewed by the content lead.",
      resolutionReference: "NPrep Exam Prep Guide, Chapter 4, pg. 87",
    }),
    createTicket({
      id: "NP-00012",
      questionId: 84309,
      student: "Dev S.",
      category: "I Have a Doubt",
      subOption: "Need clarification on a concept",
      queryText: "The explanation says both options B and D are correct but only B is marked.",
      studentDoubt: "The explanation paragraph mentions D as well — confused whether D should also be accepted.",
      priority: "Medium",
      ageHours: 3,
      status: "Being reviewed",
      timelineStatus: "in_review",
      claimedBy: "Meera Joshi",
      resolutionText: "The explanation does reference D as a secondary consideration, but B is the primary answer per the exam blueprint. The wording in the explanation has been noted for editorial review. For exam purposes, B is the correct answer and students should mark it confidently.",
    }),
    createTicket({
      id: "NP-00013",
      questionId: 84400,
      student: "Mohit P.",
      category: "I Have a Doubt",
      subOption: "Why is this the correct answer?",
      queryText: "I don't understand why Option B is prioritised over Option D in the context of fluid management.",
      studentDoubt: "My notes say both are acceptable first steps. Need clarification on priority.",
      priority: "High",
      ageHours: 9,
      status: "Unclaimed",
      timelineStatus: "raised",
      routedTo: "faculty",
      subject: "Medical Surgical Nursing",
      topic: "Renal Disorders",
    }),
    createTicket({
      id: "NP-00014",
      questionId: 84405,
      student: "Ankit Rathore",
      category: "Problem with the Answer",
      subOption: "The answer shown is wrong",
      queryText: "The marked answer for the pharmacokinetics question seems inconsistent with standard references.",
      studentDoubt: "Three different textbooks I checked give a different first-line drug. Can someone verify?",
      priority: "High",
      ageHours: 6,
      status: "Unclaimed",
      timelineStatus: "raised",
      routedTo: "faculty",
      subject: "Pharmacology",
      topic: "Antimicrobials",
    }),
    createTicket({
      id: "NP-00015",
      questionId: 84412,
      student: "Neha K.",
      category: "I Have a Doubt",
      subOption: "I didn't understand the explanation",
      queryText: "The explanation for the anatomy question skips a step — I can't follow the logic.",
      studentDoubt: "Could someone explain how the nerve supply connects to the clinical presentation described?",
      priority: "Medium",
      ageHours: 3,
      status: "Unclaimed",
      timelineStatus: "raised",
      routedTo: "faculty",
      subject: "Anatomy",
      topic: "Brachial Plexus",
    }),
    createTicket({
      id: "NP-00016",
      questionId: 84419,
      student: "Sana Ali",
      category: "Problem with this Question",
      subOption: "This belongs to a different topic or chapter",
      queryText: "This question appears under Psychiatry but it seems to be testing Pharmacology concepts.",
      studentDoubt: "The drug mentioned is a CNS drug — why is it categorised under Psychiatry disorders?",
      priority: "Medium",
      ageHours: 1.5,
      status: "Unclaimed",
      timelineStatus: "raised",
      routedTo: "faculty",
      subject: "Psychiatry",
      topic: "Schizophrenia & Psychosis",
    }),

    // ── NP-00017 to NP-00036: additional diverse test tickets ──

    createTicket({ id: "NP-00017", questionId: 84501, student: "Harsh V.", category: "I Have a Doubt", subOption: "Why is this the correct answer?",
      queryText: "The answer key says Option A but my professor marked B in class. Which is correct for exam purpose?",
      studentDoubt: "Both options look clinically valid. Need clarity on exam-specific priority.", priority: "Highest", ageHours: 14,
      status: "Working on", timelineStatus: "being_worked_on", routedTo: "faculty", facultyAssigned: "Meera Joshi",
      subject: "Obstetrics & Gynecology", topic: "Normal Pregnancy" }),

    createTicket({ id: "NP-00018", questionId: 84502, student: "Riya Sharma", category: "Problem with the Answer", subOption: "More than 1 option looks correct",
      queryText: "Options C and D both seem correct for the Pediatrics question on neonatal jaundice management.",
      studentDoubt: "My reference says phototherapy is first line but the explanation says exchange transfusion. Please verify.", priority: "High", ageHours: 20,
      status: "Being reviewed", timelineStatus: "in_review", routedTo: "faculty", facultyAssigned: "Arjun Rao",
      resolutionText: "Phototherapy is indeed first-line for neonatal jaundice with bilirubin 15-20 mg/dL. Exchange transfusion applies only above 20 mg/dL or with hemolysis. Option C is correct.",
      subject: "Pediatrics", topic: "Neonatal Disorders" }),

    createTicket({ id: "NP-00019", questionId: 84503, student: "Kavya N.", category: "Can't See Something", subOption: "Image in the question is not loading",
      queryText: "The diagram for the CHN immunisation schedule question is not visible at all — blank white box.",
      studentDoubt: "I cannot attempt this question without the image. Needs technical fix.", priority: "High", ageHours: 5,
      status: "Escalation", timelineStatus: "escalated", routedTo: "content", claimedBy: "Priya S.",
      technicalEscalation: "Image asset missing from CDN. Session JSON: img-ref-isc-404. Escalated to engineering.",
      subject: "Community Health Nursing", topic: "Immunisation Programme" }),

    createTicket({ id: "NP-00020", questionId: 84504, student: "Dev S.", category: "Problem with this Question", subOption: "The question itself is wrong",
      queryText: "The question asks about contraindication of metformin in CKD but the stage mentioned seems off.",
      studentDoubt: "Standard guidelines say avoid in stage 4+ but the question says stage 3b. Is this an error?", priority: "Medium", ageHours: 30,
      status: "Closed", timelineStatus: "resolved", routedTo: "faculty", facultyAssigned: "Sunita Verma",
      resolvedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
      resolutionText: "The question is based on older guidelines where stage 3b was the cutoff. A note has been added to the explanation. For exam purposes the question stands.", finalResolutionText: "This follows older NICE guidelines — a clarification note has been added to the question explanation.",
      feedbackType: "thumbs_up", satisfactionScore: 3.0, subject: "Pharmacology", topic: "Endocrine Pharmacology" }),

    createTicket({ id: "NP-00021", questionId: 84505, student: "Mohit P.", category: "I Have a Doubt", subOption: "Why is this option wrong?",
      queryText: "For the psychiatric drug question, why is haloperidol preferred over olanzapine in the acute setting?",
      studentDoubt: "NPrep says haloperidol but recent literature supports olanzapine. Exam-specific or general?", priority: "High", ageHours: 8,
      status: "Working on", timelineStatus: "being_worked_on", routedTo: "faculty", facultyAssigned: "Meera Joshi",
      subject: "Psychiatry", topic: "Antipsychotic Therapy" }),

    createTicket({ id: "NP-00022", questionId: 84506, student: "Ankit Rathore", category: "Problem with the Answer", subOption: "The answer shown is wrong",
      queryText: "The correct answer for the spinal cord injury nursing care question should involve log-rolling, not turning.",
      studentDoubt: "Log-rolling preserves spinal alignment. Why is the marked answer showing standard turning?", priority: "Highest", ageHours: 2,
      status: "Unclaimed", timelineStatus: "raised", routedTo: "faculty",
      subject: "Medical Surgical Nursing", topic: "Spinal Cord Injury" }),

    createTicket({ id: "NP-00023", questionId: 84507, student: "Sana Ali", category: "I Have a Doubt", subOption: "I didn't understand the explanation",
      queryText: "The explanation for the foot arches anatomy question uses terms I haven't seen in my textbook.",
      studentDoubt: "What is the difference between medial and lateral longitudinal arches clinically? The explanation doesn't clarify.", priority: "Medium", ageHours: 18,
      status: "Resolution submitted", timelineStatus: "resolution_submitted", routedTo: "faculty", facultyAssigned: "Sunita Verma",
      resolutionText: "The medial arch is more mobile and acts as a spring for propulsion; the lateral arch is rigid and bears weight. Clinically, flat foot affects the medial arch. This explains why Option B (medial) is the answer.",
      subject: "Anatomy", topic: "Foot Arches & Joints" }),

    createTicket({ id: "NP-00024", questionId: 84508, student: "Neha K.", category: "Can't See Something", subOption: "Explanation / table / formula is not showing",
      queryText: "The drug dose calculation table in the Pediatrics question is cut off on the right side.",
      studentDoubt: "I can see only 2 of 4 columns. The table seems to overflow out of view.", priority: "High", ageHours: 11,
      status: "Working on", timelineStatus: "being_worked_on", routedTo: "content", claimedBy: "Priya S.",
      subject: "Pediatrics", topic: "Nutritional Disorders" }),

    createTicket({ id: "NP-00025", questionId: 84509, student: "Harsh V.", category: "Problem with this Question", subOption: "This belongs to a different topic or chapter",
      queryText: "This OBG question on menstrual disorders is showing inside the Psychiatry module.",
      studentDoubt: "Wrong section — this should be under OBG not Psychiatry.", priority: "Medium", ageHours: 4,
      status: "Unclaimed", timelineStatus: "raised", routedTo: "content",
      subject: "Psychiatry", topic: "Mood Disorders" }),

    createTicket({ id: "NP-00026", questionId: 84510, student: "Riya Sharma", category: "I Have a Doubt", subOption: "Why is this the correct answer?",
      queryText: "For the antiepileptic drug question, why is sodium valproate first-line and not carbamazepine?",
      studentDoubt: "My notes say carbamazepine is preferred for partial seizures. The question seems to be about generalised — is that why?", priority: "High", ageHours: 35,
      status: "Closed", timelineStatus: "resolved", routedTo: "faculty", facultyAssigned: "Arjun Rao",
      resolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      resolutionText: "Correct — sodium valproate is first-line for generalised seizures while carbamazepine is preferred for focal/partial. The question stem specifies tonic-clonic (generalised), so Option A is correct.",
      finalResolutionText: "Sodium valproate is first-line for generalised tonic-clonic seizures. Carbamazepine is used for focal/partial seizures. Hope this clears it!",
      feedbackType: "thumbs_up", satisfactionScore: 3.0, subject: "Pharmacology", topic: "Antiepileptics" }),

    createTicket({ id: "NP-00027", questionId: 84511, student: "Kavya N.", category: "Problem with the Answer", subOption: "My book / teacher says something different",
      queryText: "Question on Bishop score — my textbook gives different values for the favourable score threshold.",
      studentDoubt: "NPrep says ≥8 is favourable but my Dutta's Obstetrics says ≥6. Which do we follow for exam?", priority: "High", ageHours: 7,
      status: "Being reviewed", timelineStatus: "in_review", routedTo: "faculty", facultyAssigned: "Meera Joshi",
      resolutionText: "For standardised nursing exams in India, the conventional threshold cited is ≥8 for a favourable Bishop score. Dutta's references the original scoring but NPrep aligns with the exam-standard cutoff used by NEET PG. Option B is correct.",
      subject: "Obstetrics & Gynecology", topic: "Labour & Delivery" }),

    createTicket({ id: "NP-00028", questionId: 84512, student: "Dev S.", category: "I Have a Doubt", subOption: "Why is this option wrong?",
      queryText: "MMSE scoring — why is Option D wrong? I calculated the same cutoff from the explanation.",
      studentDoubt: "The explanation says 24 but the cutoff for mild cognitive impairment in some references is 23. Need clarity.", priority: "Medium", ageHours: 22,
      status: "Working on", timelineStatus: "being_worked_on", routedTo: "faculty", facultyAssigned: "Sunita Verma",
      subject: "Psychiatry", topic: "Nursing Care" }),

    createTicket({ id: "NP-00029", questionId: 84513, student: "Mohit P.", category: "Can't See Something", subOption: "Image in the question is not loading",
      queryText: "ECG strip in the cardiovascular disorders question is not rendering — shows a broken image icon.",
      studentDoubt: "Can't interpret the rhythm without the strip. This needs to be fixed urgently.", priority: "Highest", ageHours: 1,
      status: "Unclaimed", timelineStatus: "raised", routedTo: "content",
      subject: "Medical Surgical Nursing", topic: "Arrhythmias" }),

    createTicket({ id: "NP-00030", questionId: 84514, student: "Ankit Rathore", category: "Problem with this Question", subOption: "I've already seen this question",
      queryText: "This exact question appeared in yesterday's Grand Practice Set 1 with a different answer key.",
      studentDoubt: "How can the same question have different correct answers in two sets?", priority: "High", ageHours: 16,
      status: "Escalation resolved", timelineStatus: "resolved", routedTo: "content", claimedBy: "Rahul M.",
      escalationRaisedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
      escalationResolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      escalationResolved: true, feedbackType: "escalation_resolved", escalationRating: 3,
      resolutionText: "The question appeared in two sets due to a content pipeline error. The answer key has been corrected in both sets and the duplicate flagged for editorial review.",
      finalResolutionText: "Issue resolved — the duplicate question has been corrected across both practice sets.",
      resolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(), satisfactionScore: 2.5,
      subject: "Anatomy", topic: "Shoulder Joint" }),

    createTicket({ id: "NP-00031", questionId: 84515, student: "Sana Ali", category: "I Have a Doubt", subOption: "Why is this the correct answer?",
      queryText: "For the maternal and child health question on ANC visits, the answer says 4 visits but WHO updated it to 8.",
      studentDoubt: "The focused ANC model recommends 8 contacts. Is NPrep using old WHO guidelines?", priority: "Medium", ageHours: 10,
      status: "Working on", timelineStatus: "being_worked_on", routedTo: "faculty", facultyAssigned: "Meera Joshi",
      subject: "Community Health Nursing", topic: "Maternal & Child Health" }),

    createTicket({ id: "NP-00032", questionId: 84516, student: "Neha K.", category: "Problem with the Answer", subOption: "Explanation / rationale doesn't match the answer",
      queryText: "The explanation for the immunity question correctly explains active immunity but the marked answer says passive.",
      studentDoubt: "The explanation and the answer contradict each other. Which one is actually correct?", priority: "Highest", ageHours: 3,
      status: "Unclaimed", timelineStatus: "raised", routedTo: "content",
      subject: "Community Health Nursing", topic: "Communicable Diseases" }),

    createTicket({ id: "NP-00033", questionId: 84517, student: "Harsh V.", category: "I Have a Doubt", subOption: "I didn't understand the explanation",
      queryText: "The basal ganglia question explanation is too brief and doesn't explain why the other options are ruled out.",
      studentDoubt: "I need differential reasoning — why can't it be the subthalamic nucleus instead of putamen?", priority: "Medium", ageHours: 26,
      status: "Closed", timelineStatus: "resolved", routedTo: "faculty", facultyAssigned: "Arjun Rao",
      resolvedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
      resolutionText: "Hemiballismus is classically linked to subthalamic nucleus lesions, not the putamen. The question specifically mentions 'contralateral flinging movements' which is the hallmark of hemiballismus — this is the answer key distinction.",
      finalResolutionText: "Great observation! Hemiballismus = subthalamic nucleus. The key differentiator from putamen lesions is the violent flinging quality of the movement.",
      feedbackType: "thumbs_up", satisfactionScore: 3.0, subject: "Anatomy", topic: "Basal Ganglia & Thalamus" }),

    createTicket({ id: "NP-00034", questionId: 84518, student: "Riya Sharma", category: "Problem with this Question", subOption: "Question is in the wrong language",
      queryText: "The last three questions in the Pharmacology module are appearing in Hindi mixed with English terms.",
      studentDoubt: "I set my language to English only — why are these showing mixed language?", priority: "High", ageHours: 6,
      status: "Working on", timelineStatus: "being_worked_on", routedTo: "content", claimedBy: "Amit K.",
      subject: "Pharmacology", topic: "CNS Pharmacology" }),

    createTicket({ id: "NP-00035", questionId: 84519, student: "Kavya N.", category: "I Have a Doubt", subOption: "Why is this the correct answer?",
      queryText: "For postpartum haemorrhage management, why is oxytocin listed before bimanual compression?",
      studentDoubt: "ALSO management protocol I studied starts with bimanual uterine compression then oxytocin.", priority: "High", ageHours: 13,
      status: "Being reviewed", timelineStatus: "in_review", routedTo: "faculty", facultyAssigned: "Sunita Verma",
      resolutionText: "For exam purposes, oxytocin is listed as first-line pharmacological management per FOGSI guidelines (20-40 IU IV infusion). Bimanual compression is a mechanical adjunct used alongside, not before. The question tests pharmacological priority.",
      subject: "Obstetrics & Gynecology", topic: "Postpartum Haemorrhage" }),

    createTicket({ id: "NP-00036", questionId: 84520, student: "Dev S.", category: "Can't See Something", subOption: "Option text is missing or has symbols",
      queryText: "Option B in the Pediatrics GI question shows '□□□□' symbols instead of actual text.",
      studentDoubt: "Looks like a character encoding issue. The option text is garbled completely.", priority: "High", ageHours: 2.5,
      status: "Unclaimed", timelineStatus: "raised", routedTo: "content",
      subject: "Pediatrics", topic: "GI Disorders" }),
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
  const facultyOwners = [current.faculty, null, "Arjun Rao", "Sunita Verma", null];
  for (let index = 0; index < 20; index += 1) {
    const [category, subOption] = facultySubOptions[index % facultySubOptions.length];
    const ownerName = facultyOwners[index % facultyOwners.length];
    const subject = facultySubjects[index % facultySubjects.length];
    const isClosed = index % 9 === 0;
    tickets.push(createTicket({
      id: `NP-${String(index + 40).padStart(5, "0")}`,
      questionId: 85001 + index,
      student: studentNames[index % studentNames.length],
      category,
      subOption,
      subject,
      routedTo: "faculty",
      facultyAssigned: isClosed ? allOperators()[index % allOperators().length].name : ownerName,
      status: isClosed ? "Closed" : ownerName ? "Working on" : "Unclaimed",
      timelineStatus: isClosed ? "resolved" : ownerName ? "being_worked_on" : "raised",
      priority: index % 5 === 0 ? "Highest" : index % 3 === 0 ? "Medium" : "High",
      ageHours: 2 + ((index * 2.25) % 46),
      queryText: `Subject-routed doubt ${index + 1}: student needs expert explanation for ${subject}.`,
      studentDoubt: `Please explain the reasoning for this ${subject} question in simple steps.`,
      studentVoiceNote: index % 4 === 0 ? "0:18 voice note" : "",
      studentReference: index % 6 === 0 ? "Textbook page photo attached" : "",
      resolvedAt: isClosed ? new Date(Date.now() - (index + 1) * 1800000).toISOString() : null,
      resolutionText: isClosed ? "Resolver clarified the concept and added a supporting reference." : "",
      feedbackType: isClosed ? (index % 2 === 0 ? "thumbs_up" : "auto_closed") : null,
      satisfactionScore: isClosed ? (index % 2 === 0 ? 3.0 : 2.0) : null,
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
      id: `NP-${String(index + 60).padStart(5, "0")}`,
      questionId: 86001 + index,
      student: studentNames[(index + 2) % studentNames.length],
      category,
      subOption,
      subject: facultySubjects[(index + 1) % facultySubjects.length],
      routedTo: "content",
      claimedBy: isClosed ? current.resolver : ownerName,
      status: isClosed ? "Closed" : ownerName ? "Working on" : "Unclaimed",
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
      satisfactionScore: isClosed ? 3.0 : null,
      technicalEscalation: Boolean(ownerName || isClosed) && index % 8 === 0,
    }));
  }

  const unclaimedFacultySubjects = [
    "Anatomy",
    "Medical Surgical Nursing",
    "Pharmacology",
    "Community Health Nursing",
    "Anatomy",
    "Medical Surgical Nursing",
    "Pharmacology",
    "Community Health Nursing",
    "Anatomy",
    "Medical Surgical Nursing",
    "Pharmacology",
    "Community Health Nursing",
  ];
  for (let index = 0; index < unclaimedFacultySubjects.length; index += 1) {
    const subject = unclaimedFacultySubjects[index];
    const [category, subOption] = facultySubOptions[(index + 1) % facultySubOptions.length];
    tickets.push(createTicket({
      id: `NP-${String(index + 50).padStart(5, "0")}`,
      questionId: 87001 + index,
      student: studentNames[(index + 3) % studentNames.length],
      category,
      subOption,
      subject,
      routedTo: "faculty",
      status: "Unclaimed",
      timelineStatus: "raised",
      ageHours: 0.75 + index * 1.65,
      queryText: `Unclaimed subject-routed doubt ${index + 1}: ${subOption}.`,
      studentDoubt: `Please review this ${subject} doubt. I need a clear expert explanation before moving ahead.`,
      studentVoiceNote: index % 5 === 0 ? "0:21 voice note" : "",
      studentReference: index % 4 === 0 ? "Screenshot attached" : "",
    }));
  }

  for (let index = 0; index < 12; index += 1) {
    const [category, subOption] = contentCategories[(index + 2) % contentCategories.length];
    tickets.push(createTicket({
      id: `NP-${String(index + 62).padStart(5, "0")}`,
      questionId: 88001 + index,
      student: studentNames[(index + 5) % studentNames.length],
      category,
      subOption,
      subject: facultySubjects[(index + 2) % facultySubjects.length],
      routedTo: "content",
      status: "Unclaimed",
      timelineStatus: "raised",
      ageHours: 1.1 + index * 1.5,
      queryText: `Unclaimed content-routed issue ${index + 1}: ${subOption}.`,
      studentDoubt: `The student reported: ${subOption}. Please triage and resolve from the team queue.`,
      studentReference: index % 3 === 0 ? "Screenshot attached" : "",
      technicalEscalation: false,
    }));
  }

  return {
    tickets,
    notifications: [
      note("Content Queries", "Auto-assigned to Meera Joshi: #NP-00003 - Anatomy", "NP-00003"),
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
      normalizeEngineeringEscalations(parsed);
      normalizeTimeline(parsed);
      applyAutoAssignments(parsed, false, false);
      return parsed;
    }
  } catch (error) {
    console.warn(error);
  }
  const seeded = seedDb();
  normalizeTicketStatuses(seeded);
  normalizeEngineeringEscalations(seeded);
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

function isToday(isoString) {
  if (!isoString) return false;
  const d = new Date(isoString), now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}

function breachingTickets() {
  return db.tickets.filter(t => t.status !== "Closed" && hoursLeft(t) <= 2 && hoursLeft(t) > 0);
}

function oldUnclaimedTickets() {
  return db.tickets.filter(t => owner(t) === "Unclaimed" && ticketAgeHours(t) >= 4);
}

function stuckTickets() {
  return db.tickets.filter(t => {
    if (t.status === "Closed" || owner(t) === "Unclaimed") return false;
    if (!t.history?.length) return false;
    const lastAt = Math.max(...t.history.map(h => new Date(h.at).getTime()));
    return (Date.now() - lastAt) > 6 * 3600000;
  });
}

function inReviewTickets() {
  return db.tickets.filter(t =>
    t.status === "Working on" || t.status === "Being reviewed"
  );
}

function closedTodayTickets() {
  return db.tickets.filter(t => t.status === "Closed");
}

function awaitingReviewTickets() {
  return db.tickets.filter(t => t.status === "Resolution submitted");
}

function escalationTickets() {
  return db.tickets.filter(t => t.status === "Escalation" || t.status === "Escalation resolved");
}

function weeklyTickets() {
  const cutoff = Date.now() - 7 * 24 * 3600000;
  return db.tickets.filter(t => new Date(t.raisedAt).getTime() >= cutoff);
}

function monthlyTickets() {
  const cutoff = Date.now() - 30 * 24 * 3600000;
  return db.tickets.filter(t => new Date(t.raisedAt).getTime() >= cutoff);
}

function owner(ticket) {
  return ticket.facultyAssigned || ticket.claimedBy || "Unclaimed";
}

function allOperators() {
  return people.operators;
}

function activeOperator() {
  return allOperators().find((person) => person.name === current.operator) || allOperators()[0];
}

function activeOperatorName() {
  return activeOperator()?.name || current.operator;
}

function isAssignedTo(ticket, name) {
  return ticket.facultyAssigned === name || ticket.claimedBy === name;
}

function activeOwnsTicket(ticket) {
  return isAssignedTo(ticket, activeOperatorName());
}

function resolverActorName() {
  return state.role === "team" ? activeOperatorName() : current.resolver;
}

function facultyActorName() {
  return state.role === "team" ? activeOperatorName() : current.faculty;
}

function subjectResolvers(subject) {
  const eligible = allOperators().filter((person) => person.subjects?.includes(subject));
  return eligible.length ? eligible : allOperators();
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
    ticket.facultyAssigned = assignee;
    ticket.claimedBy = null;
    ticket.facultyAssignedAt = new Date().toISOString();
    ticket.status = "Working on";
    ticket.timelineStatus = "being_worked_on";
    ticket.history.unshift(eventLine("SYSTEM", `Auto-assigned after 24h unclaimed SLA to ${assignee}`));
    targetDb.notifications.unshift(note("General", `Auto-assigned after 24h: #${ticket.id} to ${assignee}`, ticket.id));
    changed = true;
    if (shouldNotify) toast(`Auto-assigned #${ticket.id} to ${assignee}`);
  });
  if (changed && shouldPersist) saveDb();
  return changed;
}

function leastLoadedAssignee(ticket, allTickets = db.tickets) {
  const candidates = subjectResolvers(ticket.subject);
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

function normalizeEngineeringEscalations(targetDb) {
  targetDb.tickets.forEach((ticket) => {
    if (owner(ticket) === "Unclaimed") ticket.technicalEscalation = false;
  });
}

function normalizeTimeline(targetDb) {
  targetDb.tickets.forEach((ticket) => {
    ticket.history = ticket.history || [];
    upsertTimelineEvent(ticket, "SYSTEM", "Ticket created from student query", ticket.raisedAt, (item) => /ticket created from student query/i.test(item.text || ""));
    upsertTimelineEvent(ticket, "Auto-router", `Routed to ${routeLabel(ticket.routedTo)}`, timelineOffset(ticket, 5), (item) => /^routed to /i.test(item.text || ""));
    const hasOwnerEvent = ticket.history.some((item) => /claimed|assigned|auto-assigned/i.test(item.text || "") && (item.actor === ticket.facultyAssigned || item.actor === ticket.claimedBy || item.text.includes(ticket.facultyAssigned || ticket.claimedBy || "__none__")));
    const claimAt = ticket.facultyAssignedAt || timelineBeforeResolved(ticket, 75, 30);
    if (ticket.facultyAssigned && !hasOwnerEvent) {
      ticket.history.push(eventLine(ticket.facultyAssigned, "Claimed this ticket as owner", claimAt));
    }
    if (ticket.claimedBy && !hasOwnerEvent) {
      ticket.history.push(eventLine(ticket.claimedBy, "Claimed this ticket as owner", claimAt));
    }
    normalizeResolutionTimeline(ticket);
    ticket.history.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  });
}

function normalizeResolutionTimeline(ticket) {
  if (!ticket.resolutionText && !ticket.finalResolutionText && ticket.status !== "Closed" && !ticket.feedbackType) return;
  const ownerName = ticket.facultyAssigned || ticket.claimedBy || "Team Queue";
  if (ticket.resolutionText) {
    const resolutionText = ticket.routedTo === "content" && !ticket.facultyAssigned
      ? "Submitted student-facing resolution; resolution is now locked"
      : "Submitted resolution for review; resolution is now locked";
    ensureTimelineEvent(ticket, ownerName, resolutionText, timelineBeforeResolved(ticket, 45, 90), (item) => /submitted .*resolution/i.test(item.text || ""));
  }
  if (ticket.finalResolutionText && ticket.finalResolutionText !== ticket.resolutionText) {
    ensureTimelineEvent(ticket, ticket.claimedBy || "Auto-router", "Finalized student-facing resolution", timelineBeforeResolved(ticket, 25, 110), (item) => /finalized student-facing resolution|closed ticket with code/i.test(item.text || ""));
  }
  if (isEngineeringEscalated(ticket)) {
    ensureTimelineEvent(ticket, ownerName, "Escalated this ticket to Engineering", timelineBeforeResolved(ticket, 35, 70), (item) => /escalated this ticket to engineering/i.test(item.text || ""));
  }
  if (ticket.feedbackType === "thumbs_down") {
    ensureTimelineEvent(ticket, ticket.student, "Marked resolution as unclear", ticket.escalationRaisedAt || timelineBeforeResolved(ticket, 10, 120), (item) => /marked resolution as unclear/i.test(item.text || ""));
  }
  if (ticket.feedbackType === "escalation_resolved" || ticket.escalationResolved) {
    ensureTimelineEvent(ticket, ticket.student, "Marked resolution as unclear", ticket.escalationRaisedAt || timelineBeforeResolved(ticket, 60, 120), (item) => /marked resolution as unclear/i.test(item.text || ""));
    ensureTimelineEvent(ticket, ownerName, "Resolved escalation through outreach", ticket.escalationResolvedAt || timelineBeforeResolved(ticket, 12, 150), (item) => /resolved escalation/i.test(item.text || ""));
    ensureTimelineEvent(ticket, ticket.student, ticket.escalationRating ? `Rated escalation ${ticket.escalationRating}/3` : "Confirmed escalation resolved", ticket.resolvedAt || timelineOffset(ticket, 180), (item) => /rated escalation|confirmed escalation resolved/i.test(item.text || ""));
  }
  if (ticket.status === "Closed" && ticket.resolvedAt) {
    if (ticket.feedbackType === "thumbs_up") {
      ensureTimelineEvent(ticket, ticket.student, "Marked resolution helpful", timelineBeforeResolved(ticket, 2, 160), (item) => /marked resolution helpful/i.test(item.text || ""));
      ensureTimelineEvent(ticket, "SYSTEM", "Ticket closed after student confirmation", ticket.resolvedAt, (item) => /ticket closed after student confirmation|closed ticket with code/i.test(item.text || ""));
    } else if (ticket.feedbackType === "escalation_resolved") {
      ensureTimelineEvent(ticket, "SYSTEM", "Ticket closed after escalation resolution", ticket.resolvedAt, (item) => /ticket closed after escalation resolution/i.test(item.text || ""));
    } else if (ticket.feedbackType === "auto_closed") {
      ensureTimelineEvent(ticket, "SYSTEM", "Ticket auto-closed after 48 hours without student response", ticket.resolvedAt, (item) => /auto-closed|auto closed/i.test(item.text || ""));
    } else {
      ensureTimelineEvent(ticket, ownerName, `Closed ticket with code: ${ticket.resolutionCode || "Student doubt resolved"}`, ticket.resolvedAt, (item) => /closed ticket with code/i.test(item.text || ""));
    }
  }
}

function upsertTimelineEvent(ticket, actor, text, at, matcher) {
  const existing = ticket.history.find(matcher);
  if (existing) {
    existing.actor = actor;
    existing.text = text;
    existing.at = at;
    return;
  }
  ticket.history.push(eventLine(actor, text, at));
}

function ensureTimelineEvent(ticket, actor, text, at, matcher) {
  if (ticket.history.some(matcher)) return;
  ticket.history.push(eventLine(actor, text, at));
}

function timelineOffset(ticket, minutes) {
  const raisedAt = new Date(ticket.raisedAt).getTime();
  return new Date(raisedAt + minutes * 60000).toISOString();
}

function timelineBeforeResolved(ticket, minutesBeforeResolved, fallbackMinutesAfterRaised) {
  const raisedAt = new Date(ticket.raisedAt).getTime();
  const resolvedAt = ticket.resolvedAt ? new Date(ticket.resolvedAt).getTime() : null;
  if (!resolvedAt || resolvedAt <= raisedAt) return timelineOffset(ticket, fallbackMinutesAfterRaised);
  const target = resolvedAt - minutesBeforeResolved * 60000;
  return new Date(Math.max(raisedAt + 10 * 60000, target)).toISOString();
}

function roleName() {
  if (state.section === "report") return state.reportView === "product" ? "Product Team" : "Manager Report";
  if (state.role === "team") return activeOperatorName();
  if (state.role === "faculty") return current.faculty;
  if (state.role === "content") return current.resolver;
  return current.manager;
}

function roleTickets() {
  if (state.role === "team") {
    const activeName = activeOperatorName();
    return db.tickets.filter((ticket) => isAssignedTo(ticket, activeName));
  }
  if (state.role === "faculty") {
    const subjects = allOperators().find((person) => person.name === current.faculty)?.subjects || ALL_SUBJECTS;
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
  if (state.role === "team") {
    const activeName = activeOperatorName();
    const ACTIVE_STATUSES = ["Working on", "Being reviewed", "Escalation"];
    return [
      ["all", "Total", base.length],
      ["my", "My Tickets", base.filter((t) => isAssignedTo(t, activeName) && t.status !== "Closed").length],
      ["active", "Active", base.filter((t) => ACTIVE_STATUSES.includes(t.status)).length],
      ["closed", "Closed", base.filter((t) => t.status === "Closed").length],
      ["escalated", "Escalation", base.filter((t) => t.status === "Escalation" || t.status === "Escalation resolved").length],
    ];
  }
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
      ["returned", "Returned", base.filter((t) => t.returnedByFaculty).length],
      ["escalated", "Escalation", base.filter((t) => t.status === "Escalation" || t.status === "Escalation resolved").length],
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
    ["breaching", "Breaching Soon", base.filter((t) => t.status !== "Closed" && hoursLeft(t) <= 2).length],
    ["escalated", "Escalation", base.filter((t) => t.status === "Escalation" || t.status === "Escalation resolved").length],
  ];
}

function filteredTickets() {
  let rows = [...roleTickets()];
  if (state.role === "manager" && state.managerFilter) {
    const mf = state.managerFilter;
    if (mf.type === "resolver") rows = rows.filter(t => owner(t) === mf.value);
    else if (mf.type === "alert_sla") rows = rows.filter(t => t.status !== "Closed" && hoursLeft(t) <= 2 && hoursLeft(t) > 0);
    else if (mf.type === "alert_unclaimed") rows = rows.filter(t => owner(t) === "Unclaimed" && ticketAgeHours(t) >= 4);
    else if (mf.type === "alert_stuck") rows = rows.filter(t => {
      if (t.status === "Closed" || owner(t) === "Unclaimed") return false;
      if (!t.history?.length) return false;
      return (Date.now() - Math.max(...t.history.map(h => new Date(h.at).getTime()))) > 6 * 3600000;
    });
    else if (mf.type === "alert_in_review") rows = rows.filter(t => t.status === "Working on" || t.status === "Being reviewed");
    else if (mf.type === "alert_awaiting_review") rows = rows.filter(t => t.status === "Resolution submitted");
    else if (mf.type === "alert_closed_today") rows = rows.filter(t => t.status === "Closed");
    else if (mf.type === "alert_escalation") rows = rows.filter(t => t.status === "Escalation" || t.status === "Escalation resolved");
    else if (mf.type === "question") rows = rows.filter(t => t.questionId === mf.value);
  }
  if (state.tab === "open") rows = rows.filter((t) => t.status !== "Closed");
  if (state.tab === "rating") rows = rows.filter((t) => t.escalationResolved && t.feedbackType === "escalation_resolved" && !t.escalationRating);
  if (state.tab === "closed") rows = rows.filter((t) => t.status === "Closed");
  if (state.tab === "my") {
    const activeName = state.role === "team" ? activeOperatorName() : state.role === "content" ? current.resolver : current.faculty;
    rows = rows.filter((t) => isAssignedTo(t, activeName) && t.status !== "Closed");
  }
  if (state.tab === "pool" || state.tab === "facultyPool") rows = rows.filter((t) => t.routedTo === "faculty" && !t.facultyAssigned);
  if (state.tab === "unclaimed") rows = rows.filter((t) => owner(t) === "Unclaimed");
  if (state.tab === "review") rows = rows.filter((t) => t.status === "Being reviewed");
  if (state.tab === "returned") rows = rows.filter((t) => t.returnedByFaculty);
  if (state.tab === "breaching") rows = rows.filter((t) => t.status !== "Closed" && hoursLeft(t) <= (state.role === "product" ? 12 : 2));
  if (state.tab === "active") rows = rows.filter((t) => ["Working on", "Being reviewed", "Escalation"].includes(t.status));
  if (state.tab === "escalated") rows = rows.filter((t) => t.status === "Escalation" || t.status === "Escalation resolved");
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

function renderFireAlerts() {
  if (state.role !== "manager") { el.fireAlerts.hidden = true; return; }
  const breaching = breachingTickets();
  const unclaimed = oldUnclaimedTickets();
  const stuck = stuckTickets();
  const inReview = inReviewTickets();
  const closedToday = closedTodayTickets();
  const awaitingReview = awaitingReviewTickets();
  const escalations = escalationTickets();
  const mk = (type, count, label, sub, dotClass) => {
    const active = state.managerFilter?.type === type;
    return `<button class="fire-card${active ? " active" : ""}" data-manager-alert="${type}">
      <span class="fire-dot ${dotClass}"></span>
      <div><strong>${count} ${label}</strong><p>${sub}</p></div>
    </button>`;
  };
  const alerts = [
    mk("alert_sla", breaching.length, "SLA breaching", "within 2 hours", "red"),
    mk("alert_unclaimed", unclaimed.length, "unclaimed", "older than 4 hours", "amber"),
    mk("alert_stuck", stuck.length, "stuck", "no update in 6+ hours", "orange"),
    mk("alert_escalation", escalations.length, "escalation", "active & resolved", "red"),
    mk("alert_in_review", inReview.length, "in review", "being worked on", "blue"),
    mk("alert_awaiting_review", awaitingReview.length, "awaiting review", "resolution submitted", "purple"),
    mk("alert_closed_today", closedToday.length, "closed", "resolved & confirmed", "green"),
  ];
  const backBtn = state.managerFilter
    ? `<button class="back-btn fire-back" data-manager-filter-clear>← Overview</button>`
    : "";
  const createBtn = !state.managerFilter
    ? `<button class="primary fire-create-btn" data-create-ticket-modal>+ Create Ticket</button>`
    : "";
  const exportBtn = !state.managerFilter
    ? `<button class="ghost fire-export-btn" data-export-all-csv>Export CSV</button>`
    : "";
  el.fireAlerts.hidden = false;
  el.fireAlerts.innerHTML = `<div class="fire-alerts-row">${backBtn}${alerts.join("")}${exportBtn}${createBtn}</div>`;
}

function renderManagerOverview() {
  const resolvers = allOperators().map(resolverStatsFor);
  const { key, dir } = state.resolverSort;
  resolvers.sort((a, b) => {
    const va = key === "name" ? a.person.name : a[key];
    const vb = key === "name" ? b.person.name : b[key];
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    const cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
    return dir === "desc" ? -cmp : cmp;
  });
  const arrow = k => state.resolverSort.key === k ? (state.resolverSort.dir === "asc" ? " ↑" : " ↓") : "";
  const th = (k, label) => `<th><button class="sort-header${state.resolverSort.key === k ? " active" : ""}" data-resolver-sort="${k}">${label}${arrow(k)}</button></th>`;
  el.managerBackBtn.hidden = true;
  el.tableTitle.textContent = "Resolver Load";
  el.tableSubtitle.textContent = `${resolvers.length} resolvers — tap a row to see their tickets`;
  el.tableCols.innerHTML = `<col style="width:28%"><col style="width:15%"><col style="width:20%"><col style="width:22%"><col style="width:15%">`;
  const _rtbl = el.ticketTable.closest("table");
  _rtbl.style.width = "100%";
  _rtbl.style.minWidth = "0";
  _rtbl.closest(".table-wrap").style.overflowX = "hidden";
  el.tableHead.innerHTML = `${th("name", "Name")}${th("openLoad", "Open load")}${th("resolvedToday", "Resolved today")}${th("avgTimeHours", "Avg resolution time")}${th("avgScore", "Avg score")}`;
  el.ticketTable.innerHTML = resolvers.map(s => {
    const scoreHtml = s.avgScore != null
      ? `<strong class="score ${scoreClass(s.avgScore)}">${s.avgScore.toFixed(1)}</strong>`
      : `<span class="muted">--</span>`;
    const timeHtml = s.avgTimeHours != null ? `${s.avgTimeHours.toFixed(1)}h` : `<span class="muted">--</span>`;
    const active = state.managerFilter?.type === "resolver" && state.managerFilter?.value === s.person.name;
    return `<tr class="${active ? "selected" : ""}" data-manager-filter-resolver="${escapeAttr(s.person.name)}" style="cursor:pointer">
      <td><div class="person-cell"><span class="avatar" style="background:${s.person.color}">${s.person.initials}</span><span>${s.person.name}</span></div></td>
      <td><strong>${s.openLoad}</strong></td>
      <td>${s.resolvedToday}</td>
      <td>${timeHtml}</td>
      <td>${scoreHtml}</td>
    </tr>`;
  }).join("");
}

function renderSignalsPanel() {
  const all = db.tickets;
  const qRows = topQuestionRows(all, 8);
  const qList = qRows.length
    ? `<div class="mini-list">${qRows.map(q => `<div class="mini-row"><div><button class="ticket-link" data-manager-filter-question="${q.questionId}"><strong>#${q.questionId}</strong></button><p class="muted">${q.topic} · ${q.subject}</p></div><span class="badge review">${q.count}</span></div>`).join("")}</div>`
    : `<p class="muted">No repeated questions yet.</p>`;
  el.insightPanel.innerHTML = `
    <section class="insight-card"><h4>Repeated Questions</h4><p class="muted" style="font-size:11px;margin-bottom:6px">Tap ID to filter tickets</p>${qList}</section>
    <section class="insight-card"><h4>Subject Breakdown</h4>${barList(topCounts(all, "subject", 6), all.length)}</section>
    <section class="insight-card"><h4>Category Breakdown</h4>${barList(topCounts(all, "category", 5), all.length)}</section>
  `;
}

function renderManagerTicketTable() {
  const mf = state.managerFilter;
  const labels = {
    resolver: `Tickets — ${mf.value}`,
    alert_sla: "SLA breaching — within 2 hours",
    alert_unclaimed: "Unclaimed — older than 4 hours",
    alert_stuck: "Stuck — no update in 6+ hours",
    alert_escalation: "Escalation tickets — active & resolved",
    alert_in_review: "In review — being worked on",
    alert_awaiting_review: "Awaiting review — resolution submitted",
    alert_closed_today: "Closed tickets",
    question: `All tickets for question #${mf.value}`,
  };
  const rows = filteredTickets();
  // Fixed curated columns for manager drilled view — avoids horizontal overflow
  const MGR_KEYS = ["id", "raisedAt", "student", "status", "source", "category", "subject", "sla", "score"];
  const MGR_PCTS = ["10%", "14%", "12%", "14%", "7%", "17%", "16%", "6%", "4%"];
  const visible = MGR_KEYS.map(key => columns.find(([k]) => k === key)).filter(Boolean);
  el.tableCols.innerHTML = MGR_PCTS.map(w => `<col style="width:${w}">`).join("");
  const _dtbl = el.ticketTable.closest("table");
  _dtbl.style.width = "100%";
  _dtbl.style.minWidth = "0";
  _dtbl.closest(".table-wrap").style.overflowX = "hidden";
  el.managerBackBtn.hidden = false;
  el.createTicketButton.hidden = true;
  el.pullTicketButton.hidden = true;
  el.tableTitle.textContent = labels[mf.type] || "Filtered";
  el.tableSubtitle.textContent = `${rows.length} ticket${rows.length === 1 ? "" : "s"} shown`;
  el.tableHead.innerHTML = visible.map(([key, label]) => headerCell(key, label)).join("");
  el.ticketTable.innerHTML = rows.map(ticket => `<tr class="${state.selectedId === ticket.id ? "selected" : ""}" data-row-open="${ticket.id}" tabindex="0">${visible.map(([key]) => `<td>${cell(ticket, key)}</td>`).join("")}</tr>`).join("");
}

function render() {
  applyAutoAssignments(db, false, true);
  renderTopNav();
  renderModeControls();
  renderProfileSelect();
  el.activeUser.textContent = roleName();
  const isReport = state.section === "report";
  const isManagerView = !isReport && state.role === "manager";
  const isManagerOverview = isManagerView && !state.managerFilter;
  el.pageTitle.textContent = isReport ? "Reports Dashboard" : "Tickets Overview";
  el.reportDashboard.hidden = !isReport;
  el.mainGrid.hidden = isReport;
  el.toolbar.hidden = isReport || isManagerOverview;
  el.ticketTabs.hidden = isReport || isManagerView;
  el.mainGrid?.classList.toggle("no-side", true);
  renderStats();
  renderFireAlerts();
  if (isReport) {
    renderReportDashboard();
    return;
  }
  if (isManagerOverview) {
    renderManagerOverview();
    el.insightPanel.innerHTML = "";
    return;
  }
  renderFilters();
  if (isManagerView) {
    renderManagerTicketTable();
    el.insightPanel.innerHTML = "";
  } else {
    renderTabs();
    renderTable();
    renderSidePanel();
  }
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
    ["team", "Team Queue"],
    ["manager", "Manager"],
  ].map(([role, label]) => `<button class="${state.role === role ? "active" : ""}" data-role="${role}">${label}</button>`).join("");
}

function renderProfileSelect() {
  if (state.section === "report" || state.role === "manager") {
    el.profileSelect.hidden = true;
    el.profileSelect.innerHTML = "";
    return;
  }
  const options = allOperators();
  const activeName = state.role === "team" ? activeOperatorName() : state.role === "faculty" ? current.faculty : current.resolver;
  el.profileSelect.hidden = false;
  el.profileSelect.innerHTML = options.map((person) => `<option value="${person.name}" ${person.name === activeName ? "selected" : ""}>${person.name} - ${person.role}</option>`).join("");
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
  const activeFaculty = allOperators().find((person) => person.name === current.faculty);
  const facultySubjects = activeFaculty?.subjects || [];
  const pool = db.tickets.filter((ticket) => ticket.routedTo === "faculty" && !ticket.facultyAssigned && inDateRange(ticket.raisedAt));
  const activeName = activeOperatorName();
  const statSets = {
    team: [
      ["My Open", open.filter((t) => isAssignedTo(t, activeName)).length, `Assigned to ${activeName}`, ""],
      ["Unclaimed", base.filter((t) => owner(t) === "Unclaimed").length, "Available for team pickup", "amber"],
      ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
      ["Closed Today", closedToday.length, "Tickets closed today", "green"],
      ["Overall Closed", closed.length, "All closed tickets in this view", "green"],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 2.5 ? "green" : "amber"],
    ],
    faculty: [
      ["My Open", open.filter((t) => t.facultyAssigned === current.faculty).length, `Assigned to ${current.faculty}`, ""],
      ["Subject Pool", pool.filter((t) => facultySubjects.includes(t.subject)).length, "Claim-first subject queries", "amber"],
      ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
      ["Closed Today", closedToday.length, "Tickets closed today", "green"],
      ["Overall Closed", closed.length, "All closed tickets in this view", "green"],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 2.5 ? "green" : "amber"],
    ],
    content: [
      ["Queue", base.length, "Content and subject-routed tickets", ""],
      ["Unclaimed", base.filter((t) => owner(t) === "Unclaimed").length, "Needs ownership", "amber"],
      ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
      ["Closed Today", closedToday.length, "Tickets closed today", "green"],
      ["Overall Closed", closed.length, "All closed content tickets", "green"],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 2.5 ? "green" : "amber"],
    ],
    manager: [
      ["This Week", weeklyTickets().length, "Total queries raised in last 7 days", ""],
      ["This Month", monthlyTickets().length, "Total queries raised in last 30 days", ""],
      ["Escalations", escalationTickets().length, "Active + resolved escalations", escalationTickets().filter(t => t.status === "Escalation").length ? "red" : "amber"],
      ["SLA Risk", breaching.length, "Breaching within 2 hours", breaching.length ? "red" : "green"],
      ["Open", open.length, "Across all queues", ""],
      ["Avg Score", avgScore, "Satisfaction score", Number(avgScore) >= 2.5 ? "green" : "amber"],
    ],
    product: [
      ["Top Category", topCount(base, "category")?.label || "--", `${topCount(base, "category")?.count || 0} tickets`, ""],
      ["Top Suboption", topCount(base, "subOption")?.label || "--", `${topCount(base, "subOption")?.count || 0} tickets`, "amber"],
      ["Avg SLA Left", avgOpenSla(base), "Open ticket runway", ""],
      ["CSAT", avgScore, "Across resolved feedback", Number(avgScore) >= 2.5 ? "green" : "amber"],
      ["Engineering", base.filter((t) => t.technicalEscalation || t.category === "Can't See Something").length, "Technical/render signals", "red"],
      ["Low CSAT", base.filter((t) => t.satisfactionScore != null && t.satisfactionScore < 3).length, "Needs intake review", "amber"],
    ],
  };
  el.statsRow.innerHTML = statSets[state.role].map(([label, value, help, tone]) => `<article class="stat-card ${tone}"><span class="label">${label}</span><strong>${value}</strong><span>${help}</span></article>`).join("");
}

function renderReportStats() {
  const rows = db.tickets.filter((ticket) => inDateRange(ticket.raisedAt));
  const open = rows.filter((ticket) => ticket.status !== "Closed");
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 2);
  const technical = rows.filter((ticket) => ticket.technicalEscalation || ticket.category === "Can't See Something");
  const subjectTop = topCount(rows, "subject");
  const topicTop = topCount(rows, "topic");
  const categoryTop = topCount(rows, "category");
  const suboptionTop = topCount(rows, "subOption");
  const statSets = {
    manager: [
      ["This Week", weeklyTickets().length, "Queries raised in last 7 days", ""],
      ["This Month", monthlyTickets().length, "Queries raised in last 30 days", ""],
      ["Escalations", escalationTickets().length, "Active + resolved escalation tickets", escalationTickets().filter(t => t.status === "Escalation").length ? "red" : "amber"],
      ["SLA Risk", open.filter((ticket) => hoursLeft(ticket) <= 2).length, "Breaching within 2 hours", open.filter((ticket) => hoursLeft(ticket) <= 2).length ? "red" : "green"],
      ["Avg Resolution", avgResolutionHours(rows), "Closed ticket cycle time", "green"],
      ["Avg Score", averageScore(rows), "Resolved CSAT", "green"],
    ],
    product: [
      ["Top Category", categoryTop?.label || "--", `${categoryTop?.count || 0} picks`, ""],
      ["Top Suboption", suboptionTop?.label || "--", `${suboptionTop?.count || 0} picks`, "amber"],
      ["Avg SLA Left", avgOpenSla(rows), "Open ticket runway", ""],
      ["CSAT", averageScore(rows), `${lowCsat.length} low scores`, Number(averageScore(rows)) >= 2.5 ? "green" : "amber"],
      ["Engineering", technical.length, "Technical/render signals", "red"],
      ["Intake Friction", rows.filter((ticket) => ticket.category !== "I Have a Doubt").length, "Non-doubt categories", "amber"],
    ],
  };
  el.statsRow.innerHTML = statSets[state.reportView].map(([label, value, help, tone]) => `<article class="stat-card ${tone}"><span class="label">${label}</span><strong>${value}</strong><span>${help}</span></article>`).join("");
}

function hasActiveFilters() {
  return state.search !== "" || state.questionIdSearch !== "" || state.status !== "all" || state.assignee !== "all" || state.dateFrom !== "" || state.dateTo !== "";
}

function renderFilters() {
  const scoped = roleTickets();
  const visibleStatuses = STATUSES.filter(s => state.role !== "team" || s !== "Unclaimed");
  const statuses = ["all", ...visibleStatuses];
  el.statusFilter.innerHTML = statuses.map((status) => `<option value="${status}">${status === "all" ? "All statuses" : status}</option>`).join("");
  el.statusFilter.value = statuses.includes(state.status) ? state.status : "all";
  renderSelectFilter(el.assigneeFilter, ["all", ...new Set(scoped.map((ticket) => owner(ticket)))], state.assignee, "All assignees");
  el.questionIdFilter.value = state.questionIdSearch;
  el.dateFromFilter.value = state.dateFrom;
  el.dateToFilter.value = state.dateTo;
  el.resetFiltersButton.hidden = !hasActiveFilters();
  el.createTicketButton.hidden = state.role !== "manager";
  el.pullTicketButton.hidden = state.role !== "team";
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
    "Working on": 2,
    "Being reviewed": 3,
    "Resolution submitted": 4,
    Escalation: 5,
    "Escalation resolved": 6,
    Closed: 7,
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
  let html = tabs.map(([key, label, count]) => `<button class="${state.tab === key ? "active" : ""}" data-tab="${key}">${label}<span class="count">${count}</span></button>`).join("");
  el.ticketTabs.innerHTML = html;
}

function renderTable() {
  el.resetFiltersButton.hidden = !hasActiveFilters();
  const rows = filteredTickets();
  const visible = columns.filter(([key]) => state.visibleColumns.includes(key));
  applyTableColumnWidths(visible.map(([key]) => key));
  const _ntbl = el.ticketTable.closest("table");
  _ntbl.style.width = "";
  _ntbl.style.minWidth = "";
  _ntbl.closest(".table-wrap").style.overflowX = "";
  el.managerBackBtn.hidden = true;
  el.tableTitle.textContent = state.role === "team" ? "Team Queries Queue" : state.role === "faculty" ? "Faculty Queries" : state.role === "content" ? "Content Queries Queue" : "Team Ticket Queue";
  el.tableSubtitle.textContent = `${rows.length} ticket${rows.length === 1 ? "" : "s"} shown${dateRangeLabel()}`;
  el.tableHead.innerHTML = visible.map(([key, label]) => headerCell(key, label)).join("");
  el.ticketTable.innerHTML = rows.map((ticket) => `<tr class="${state.selectedId === ticket.id ? "selected" : ""}" data-row-open="${ticket.id}" tabindex="0">${visible.map(([key]) => `<td>${cell(ticket, key)}</td>`).join("")}</tr>`).join("");
}

function headerCell(key, label) {
  const width = columnWidth(key);
  const resizer = `<span class="column-resizer" data-resize-column="${key}" title="Drag to resize. Double-click to auto-fit." aria-hidden="true"></span>`;
  if (!sortableColumns.has(key)) return `<th data-column="${key}" style="width:${width}px"><div class="table-header-cell"><span class="header-text">${label}</span>${resizer}</div></th>`;
  const active = state.sortKey === key;
  const direction = active ? state.sortDir : "none";
  const markerEntity = active ? (state.sortDir === "asc" ? "&#8593;" : "&#8595;") : "&#8597;";
  return `<th data-column="${key}" style="width:${width}px" aria-sort="${direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}"><div class="table-header-cell"><button class="sort-header ${active ? "active" : ""}" data-sort="${key}" title="Sort ${label}"><span class="header-text">${label}</span><span class="sort-marker">${markerEntity}</span></button>${resizer}</div></th>`;
}

function loadColumnWidths() {
  try {
    const saved = JSON.parse(localStorage.getItem(COLUMN_WIDTH_KEY) || "{}");
    return { ...DEFAULT_COLUMN_WIDTHS, ...saved };
  } catch {
    return { ...DEFAULT_COLUMN_WIDTHS };
  }
}

function columnWidth(key) {
  return Math.max(82, Math.min(560, Number(state.columnWidths[key] || DEFAULT_COLUMN_WIDTHS[key] || 150)));
}

function visibleColumnKeys() {
  return columns.filter(([key]) => state.visibleColumns.includes(key)).map(([key]) => key);
}

function applyTableColumnWidths(keys = visibleColumnKeys()) {
  const widths = keys.map((key) => columnWidth(key));
  const totalWidth = widths.reduce((sum, width) => sum + width, 0);
  el.tableCols.innerHTML = keys.map((key, index) => `<col data-column="${key}" style="width:${widths[index]}px">`).join("");
  const table = el.ticketTable.closest("table");
  table.style.width = `${totalWidth}px`;
}

function saveColumnWidths() {
  localStorage.setItem(COLUMN_WIDTH_KEY, JSON.stringify(state.columnWidths));
}

function startColumnResize(event) {
  const handle = event.target.closest("[data-resize-column]");
  if (!handle) return;
  event.preventDefault();
  event.stopPropagation();
  columnResize = {
    key: handle.dataset.resizeColumn,
    startX: event.clientX,
    startWidth: columnWidth(handle.dataset.resizeColumn),
  };
  document.body.classList.add("is-resizing-column");
  window.addEventListener("pointermove", resizeColumn);
  window.addEventListener("pointerup", stopColumnResize, { once: true });
}

function resizeColumn(event) {
  if (!columnResize) return;
  const nextWidth = Math.max(82, Math.min(560, Math.round(columnResize.startWidth + event.clientX - columnResize.startX)));
  state.columnWidths[columnResize.key] = nextWidth;
  applyTableColumnWidths();
  const header = el.tableHead.querySelector(`[data-column="${columnResize.key}"]`);
  if (header) header.style.width = `${nextWidth}px`;
}

function stopColumnResize() {
  if (!columnResize) return;
  saveColumnWidths();
  columnResize = null;
  document.body.classList.remove("is-resizing-column");
  window.removeEventListener("pointermove", resizeColumn);
  renderTable();
}

function autoFitColumn(key) {
  const keys = visibleColumnKeys();
  const index = keys.indexOf(key);
  if (index < 0) return;
  const selectorIndex = index + 1;
  const cells = [
    ...document.querySelectorAll(`#tableHead th:nth-child(${selectorIndex}), #ticketTable tr td:nth-child(${selectorIndex})`),
  ];
  const measured = cells.reduce((max, cell) => Math.max(max, cell.scrollWidth + 34), DEFAULT_COLUMN_WIDTHS[key] || 150);
  state.columnWidths[key] = Math.max(82, Math.min(560, Math.ceil(measured)));
  saveColumnWidths();
  renderTable();
}

function cell(ticket, key) {
  const value = {
    id: `<button class="ticket-link" data-open="${ticket.id}">#${ticket.id}</button>`,
    questionId: `#${ticket.questionId}`,
    raisedAt: absoluteDate(ticket.raisedAt),
    student: ticket.student,
    status: statusCell(ticket),
    source: `<span class="source-chip source-${(ticket.source || "qbank").toLowerCase()}">${ticket.source || "QBank"}</span>`,
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
    status: isEngineeringEscalated(ticket) ? `${ticket.status} - Engineering Escalation` : ticket.status,
    source: ticket.source || "QBank",
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

function exportAllCsv() {
  const rows = db.tickets;
  if (!rows.length) { toast("No tickets to export."); return; }
  const allCols = ["id", "raisedAt", "student", "status", "source", "category", "subOption", "subject", "topic", "owner", "sla", "priority", "score", "resolvedAt"];
  const headers = ["Ticket ID", "Raised At", "Student", "Status", "Source", "Category", "Sub Category", "Subject", "Topic", "Assignee", "SLA", "Priority", "Score", "Resolved At"];
  const csvRows = [
    headers.map(csvEscape).join(","),
    ...rows.map(t => [
      t.id,
      absoluteDate(t.raisedAt),
      t.student,
      isEngineeringEscalated(t) ? `${t.status} - Engineering Escalation` : t.status,
      t.source || "QBank",
      t.category,
      t.subOption,
      t.subject,
      t.topic,
      owner(t),
      t.status === "Closed" ? "Closed" : `${hoursLeft(t).toFixed(1)}h left`,
      owner(t) === "Unclaimed" || !t.priority ? "" : t.priority,
      t.satisfactionScore == null ? "" : t.satisfactionScore.toFixed(1),
      t.resolvedAt ? absoluteDate(t.resolvedAt) : "",
    ].map(csvEscape).join(",")),
  ];
  const blob = new Blob([csvRows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const today = new Date().toISOString().slice(0, 10);
  link.download = `nprep-qms-all-agents-${today}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast(`Exported ${rows.length} tickets across all agents.`);
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
  const agents = allOperators();
  return [
    ["Summary", "Total tickets", rows.length, dateRangeLabel() || "All raised dates"],
    ["Summary", "Open tickets", rows.filter((ticket) => ticket.status !== "Closed").length, "Across team queues"],
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
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 2).length;
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
  const role = state.role === "team" ? "team-queue" : state.role === "content" ? "content-team" : state.role;
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
  const agents = allOperators();
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
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 2).length;
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

function resolutionFunnel(tickets) {
  const monthly = tickets.filter(t => new Date(t.raisedAt).getTime() >= Date.now() - 30 * 24 * 3600000);
  const total = monthly.length;
  if (!total) return `<p class="muted fn-empty">No tickets raised in the last 30 days.</p>`;

  const pct = n => Math.round(n / total * 100);
  const w   = n => `${pct(n)}%`;

  const unclaimed  = monthly.filter(t => owner(t) === "Unclaimed").length;
  const assigned   = total - unclaimed;
  const workingOn  = monthly.filter(t => t.status === "Working on").length;
  const reviewing  = monthly.filter(t => t.status === "Being reviewed").length;
  const submitted  = monthly.filter(t => t.status === "Resolution submitted").length;
  const closed     = monthly.filter(t => t.status === "Closed").length;
  const escalated  = monthly.filter(t => t.status === "Escalation" || t.status === "Escalation resolved").length;
  const resolvRate = pct(closed);
  const assignRate = pct(assigned);

  const row = (label, sublabel, n, cls, isLast) => `
    <div class="fn-row${isLast ? " fn-row-last" : ""}">
      <div class="fn-label-col">
        <span class="fn-label">${label}</span>
        ${sublabel ? `<span class="fn-sublabel">${sublabel}</span>` : ""}
      </div>
      <div class="fn-track">
        <div class="fn-fill ${cls}" style="width:${w(n)}"></div>
      </div>
      <div class="fn-stat-col">
        <strong class="fn-count">${n}</strong>
        <span class="fn-pct">${pct(n)}%</span>
      </div>
    </div>`;

  return `
    <div class="fn-header-row">
      <div class="fn-kpi"><span class="fn-kpi-val">${total}</span><span class="fn-kpi-label">Total Raised</span></div>
      <div class="fn-kpi"><span class="fn-kpi-val">${assignRate}%</span><span class="fn-kpi-label">Assignment Rate</span></div>
      <div class="fn-kpi"><span class="fn-kpi-val">${resolvRate}%</span><span class="fn-kpi-label">Resolution Rate</span></div>
      <div class="fn-kpi ${escalated ? "fn-kpi-warn" : ""}"><span class="fn-kpi-val">${escalated}</span><span class="fn-kpi-label">Escalated</span></div>
    </div>
    <div class="fn-stages">
      <div class="fn-col-labels"><span>Stage</span><span>Progress (% of total raised)</span><span>Count</span></div>
      ${row("Total Raised",          "All queries in last 30 days",      total,     "fn-blue",    false)}
      ${row("Assigned",              `${unclaimed} still unclaimed`,      assigned,  "fn-purple",  false)}
      ${row("Working On",            "Agent actively resolving",          workingOn, "fn-amber",   false)}
      ${row("Sent to Manager",       "Under manager review",             reviewing, "fn-indigo",  false)}
      ${row("Resolution Submitted",  "Sent directly to student",         submitted, "fn-teal",    false)}
      ${row("Closed",                "Fully resolved &amp; closed",      closed,    "fn-green",   true)}
    </div>
    ${escalated ? `<div class="fn-escalation-bar"><span class="badge escalated">⚡ Escalation</span><span>${escalated} ticket${escalated > 1 ? "s" : ""} escalated this month — ${pct(escalated)}% of total. Review and resolve promptly.</span></div>` : ""}`;
}

function managerReportDashboard(rows) {
  const subjectLeaders = topCounts(rows, "subject", 6);
  const topicLeaders = topCounts(rows, "topic", 6);
  const categoryLeaders = topCounts(rows, "category", 5);
  const questionLeaders = topQuestionRows(rows, 8);
  const qList = questionLeaders.length
    ? `<div class="mini-list">${questionLeaders.map(q => `<div class="mini-row"><div><strong>#${q.questionId}</strong><p class="muted">${q.topic} · ${q.subject}</p></div><span class="badge review">${q.count}</span></div>`).join("")}</div>`
    : `<p class="muted">No repeated questions yet.</p>`;
  return `${reportControlBar("manager")}
    <section class="report-hero">
      <div><span class="label">Manager Report</span><h2>Team Health and Query Load</h2><p>Subject, topic, question, SLA, and bandwidth signals across the full QMS queue.</p></div>
      <div class="report-hero-metrics">${reportMetric("Top Subject", subjectLeaders[0]?.label || "--", `${subjectLeaders[0]?.count || 0} tickets`)}${reportMetric("Top Topic", topicLeaders[0]?.label || "--", `${topicLeaders[0]?.count || 0} doubts`)}</div>
    </section>
    <section class="dashboard-grid manager-report-grid">
      <article class="chart-card chart-wide fn-card"><div class="chart-head"><div><span class="label">30-Day Funnel</span><h3>Query Resolution Funnel</h3></div><span class="fn-period-tag">Last 30 days · always live</span></div>${resolutionFunnel(db.tickets)}</article>
      <article class="chart-card chart-wide"><div class="chart-head"><div><span class="label">Bar Graph</span><h3>Subject Query Volume</h3></div></div><canvas data-chart="manager-subject-bar"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Pie Chart</span><h3>Status Mix</h3></div></div><canvas data-chart="manager-status-pie"></canvas><div class="chart-legend">${chartLegend(topCounts(rows, "status", 6))}</div></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Line Chart</span><h3>SLA Risk Trend</h3></div></div><canvas data-chart="manager-sla-line"></canvas></article>
      <article class="chart-card chart-wide"><div class="chart-head"><div><span class="label">Question ID Analysis</span><h3>Most Doubtful Questions</h3></div></div>${questionHotspotTable(questionLeaders)}</article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Bar Graph</span><h3>Agent Open Load</h3></div></div><canvas data-chart="manager-agent-bar"></canvas></article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Topic Analytics</span><h3>Top Doubt Topics</h3></div></div>${barList(topicLeaders, rows.length)}</article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Systemic Signal</span><h3>Repeated Questions</h3></div></div>${qList}</article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Systemic Signal</span><h3>Subject Breakdown</h3></div></div>${barList(subjectLeaders, rows.length)}</article>
      <article class="chart-card"><div class="chart-head"><div><span class="label">Systemic Signal</span><h3>Category Breakdown</h3></div></div>${barList(categoryLeaders, rows.length)}</article>
    </section>`;
}

function productReportDashboard(rows) {
  const categoryLeaders = topCounts(rows, "category", 6);
  const suboptionLeaders = topCounts(rows, "subOption", 7);
  const technical = rows.filter((ticket) => ticket.technicalEscalation || ticket.category === "Can't See Something").length;
  const lowCsat = rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 2).length;
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
  return allOperators().map((person) => ({
    label: person.name.replace(/^Dr\. /, ""),
    count: rows.filter((ticket) => ticket.status !== "Closed" && (ticket.facultyAssigned === person.name || ticket.claimedBy === person.name)).length,
  })).sort((a, b) => b.count - a.count).slice(0, 7);
}

function productSignalItems(rows) {
  return [
    { label: "Render / visibility", count: rows.filter((ticket) => ticket.category === "Can't See Something").length },
    { label: "Engineering escalation", count: rows.filter((ticket) => ticket.technicalEscalation).length },
    { label: "Escalation", count: rows.filter((ticket) => ticket.status === "Escalation" || ticket.feedbackType === "thumbs_down").length },
    { label: "Low CSAT", count: rows.filter((ticket) => ticket.satisfactionScore != null && ticket.satisfactionScore < 2).length },
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

function resolverStatsFor(person) {
  const all = db.tickets.filter(t => t.claimedBy === person.name || t.facultyAssigned === person.name);
  const openLoad = all.filter(t => t.status !== "Closed").length;
  const resolvedToday = all.filter(t => isToday(t.resolvedAt)).length;
  const closedWithTime = all.filter(t => t.resolvedAt);
  const avgTimeHours = closedWithTime.length
    ? closedWithTime.reduce((s, t) => s + ((new Date(t.resolvedAt) - new Date(t.raisedAt)) / 3600000), 0) / closedWithTime.length
    : null;
  const scored = all.filter(t => t.satisfactionScore != null);
  const avgScore = scored.length ? scored.reduce((s, t) => s + t.satisfactionScore, 0) / scored.length : null;
  return { person, openLoad, resolvedToday, avgTimeHours, avgScore };
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
  const drawerSla = ticket.status === "Closed" ? "" : `<span class="badge ${slaClass(ticket)}">${hoursLeft(ticket).toFixed(1)}h left</span>`;
  return `<div class="drawer-head"><strong>Ticket Details</strong><button data-close-drawer>x</button></div>
    <div class="drawer-body">
      <section>
        <div class="drawer-title"><h2>#${ticket.id}</h2>${statusCell(ticket, { showEngineering: false })}${drawerSla}</div>
        <p class="muted">${ticket.category} - ${ticket.subOption}</p>
      </section>
      ${engineeringNotice(ticket)}
      ${drawerActions(ticket)}
      ${engineeringEscalationPanel(ticket)}
      ${workflowPanel(ticket)}
      ${state.role === "team" || state.role === "content" ? contentPanel(ticket) : ""}
      ${state.role === "manager" ? managerPanel(ticket) : ""}
      <section class="drawer-card"><h3>Student's Query</h3>${detailGrid(studentQueryRows(ticket))}</section>
      ${sessionDetailPanel(ticket)}
      ${state.role === "team" || state.role === "faculty" ? facultyPanel(ticket) : ""}
      ${escalationPanel(ticket)}
      ${resolutionPanel(ticket)}
      <section class="drawer-card"><h3>Timeline</h3><div class="timeline">${ticket.history.map((item) => `<div class="timeline-item"><span class="timeline-dot">${item.actor.slice(0, 1)}</span><div><strong>${item.actor}</strong><p class="timeline-text">${item.text}</p><p class="timeline-meta">${absoluteDate(item.at)} - ${relativeTime(item.at)}</p></div></div>`).join("")}</div></section>
    </div>`;
}

function drawerActions(ticket) {
  const actions = [];
  const unclaimed = owner(ticket) === "Unclaimed";
  const teamOwnedByMe = state.role === "team" && activeOwnsTicket(ticket);
  const contentOwnedByMe = state.role === "content" && ticket.claimedBy === current.resolver;
  if (unclaimed && state.role === "team") {
    return `<div class="drawer-actions"><span class="muted pool-notice">This ticket is in the unclaimed pool. Use <strong>Pull Ticket</strong> from the queue to receive tickets — earliest raised first.</span></div>`;
  }
  if (canAssignToMe(ticket)) {
    actions.push(`<button class="primary" data-assign-self="${ticket.id}">Assign to Me</button>`);
    if (unclaimed && state.role === "content") return `<div class="drawer-actions">${actions.join("")}</div>`;
  }
  if (teamOwnedByMe && ticket.status !== "Closed") {
    if (ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) actions.push(`<button class="primary" data-mark-escalation-resolved="${ticket.id}">Mark Call Resolved</button>`);
  }
  if (contentOwnedByMe && ticket.status !== "Closed") actions.push(`<button class="ghost" data-show-panel="internalNote">Add Internal Note</button>`);
  if (contentOwnedByMe && ticket.routedTo === "faculty" && !ticket.facultyAssigned) actions.push(`<button class="primary" data-assign-faculty="${ticket.id}">Assign Resolver</button>`);
  if (contentOwnedByMe && ticket.facultyAssigned && ticket.status !== "Closed") actions.push(`<button class="ghost" data-recall="${ticket.id}">Recall from Resolver</button>`);
  if (contentOwnedByMe && ticket.resolutionText && ticket.status === "Resolution submitted") actions.push(`<button class="primary" data-approve-resolution="${ticket.id}">Approve Resolution</button>`, `<button class="ghost" data-send-revision="${ticket.id}">Send Back for Revision</button>`);
  if (contentOwnedByMe && ticket.status !== "Closed") {
    actions.push(`<button class="ghost" data-show-panel="finalResolution">Finalize Student Resolution</button>`);
  }
  if (contentOwnedByMe && ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) actions.push(`<button class="primary" data-mark-escalation-resolved="${ticket.id}">Mark Call Resolved</button>`);
  if (state.role === "manager" && ticket.status !== "Closed" && owner(ticket) === "Unclaimed") actions.push(`<button class="primary" data-manager-claim="${ticket.id}">Claim as Manager</button>`);
  return `<div class="drawer-actions">${actions.join("") || `<span class="muted">No primary action available in this state.</span>`}</div>`;
}

function engineeringNotice(ticket) {
  if (!isEngineeringEscalated(ticket)) return "";
  return `<div class="drawer-actions"><span class="workflow-chip escalated">Escalated to Engineering</span></div>`;
}

function engineeringEscalationPanel(ticket) {
  const teamOwnedByMe = state.role === "team" && activeOwnsTicket(ticket);
  const contentOwnedByMe = state.role === "content" && ticket.claimedBy === current.resolver;
  if ((!teamOwnedByMe && !contentOwnedByMe) || ticket.technicalEscalation || ticket.status === "Closed" || ticket.status === "Being reviewed") return "";
  return `<section class="drawer-card engg-escalation-panel">
    <h3>Escalate to Engineering</h3>
    <p class="muted engg-escalation-desc">Only escalate if you've confirmed this is a platform or technical issue. Describe your analysis, then type <strong>yes</strong> and confirm.</p>
    <label class="engg-escalation-label">Your analysis
      <textarea id="escalateAnalysis" class="engg-escalation-textarea" rows="3" placeholder="Describe the engineering problem you identified…"></textarea>
    </label>
    <label class="engg-escalation-label">Type "yes" to confirm
      <input id="escalateConfirm" class="engg-escalation-input" type="text" placeholder="yes" />
    </label>
    <button class="danger engg-escalation-btn" data-confirm-escalate-engineering="${ticket.id}">Confirm Escalation to Engineering</button>
  </section>`;
}

function studentQueryRows(ticket) {
  const rows = [
    ["Student", ticket.student],
    ["Subject", ticket.subject],
    ["Topic", ticket.topic],
    ["Question ID", `#${ticket.questionId}`],
    ["Raised At", absoluteDate(ticket.raisedAt)],
    ["Open for", relativeTime(ticket.raisedAt)],
    ["Resolved At", ticket.resolvedAt ? absoluteDate(ticket.resolvedAt) : "Not resolved yet"],
  ];
  if (ticket.resolvedAt) rows.push(["Resolution Time", durationBetween(ticket.raisedAt, ticket.resolvedAt)]);
  if (hasEscalation(ticket)) {
    const escalationAt = escalationRaisedAt(ticket);
    const escalationDoneAt = escalationResolvedAt(ticket);
    rows.push(["Escalation Raised At", escalationAt ? absoluteDate(escalationAt) : "Not captured"]);
    rows.push(["Escalation Resolved At", escalationDoneAt ? absoluteDate(escalationDoneAt) : "Pending"]);
    rows.push(["Escalation Resolution Time", escalationAt && escalationDoneAt ? durationBetween(escalationAt, escalationDoneAt) : "Pending"]);
  }
  rows.push(
    ["Doubt", ticket.studentDoubt],
    ["Voice Note", studentVoiceNoteCell(ticket)],
    ["Reference", studentReferenceCell(ticket)],
    ["Owner", owner(ticket)],
  );
  return rows;
}

function studentVoiceNoteCell(ticket) {
  if (!ticket.studentVoiceNote) return "None";
  return `<span class="attachment-inline"><span>${escapeHtml(ticket.studentVoiceNote)}</span><button type="button" class="soft-button tiny" data-play-student-voice="${ticket.id}">Play Voice Note</button></span>`;
}

function hasEscalation(ticket) {
  return ticket.status === "Escalation" || ticket.status === "Escalation resolved" || ticket.feedbackType === "thumbs_down" || ticket.feedbackType === "escalation_resolved" || ticket.escalationResolved || Boolean(ticket.followupText || ticket.escalationRaisedAt || ticket.escalationResolvedAt);
}

function escalationRaisedAt(ticket) {
  return ticket.escalationRaisedAt || historyDate(ticket, [/marked resolution as unclear/i, /escalation needed/i, /student not satisfied/i]) || (hasEscalation(ticket) ? ticket.resolvedAt || ticket.raisedAt : null);
}

function escalationResolvedAt(ticket) {
  return ticket.escalationResolvedAt || historyDate(ticket, [/resolved escalation/i, /escalation closed/i, /rated escalation/i]) || (ticket.escalationResolved || ticket.feedbackType === "escalation_resolved" || ticket.status === "Escalation resolved" ? ticket.resolvedAt : null);
}

function historyDate(ticket, patterns) {
  return [...(ticket.history || [])].reverse().find((item) => patterns.some((pattern) => pattern.test(item.text || "")))?.at || null;
}

function workflowPanel(ticket) {
  const priorityLocked = Boolean(ticket.priority);
  const unclaimed = owner(ticket) === "Unclaimed";
  const statusControl = ticket.status === "Closed"
    ? `<div class="readonly-status"><span class="label">Status</span><span class="muted">Final state</span><small>Updated automatically by workflow actions.</small></div>`
    : `<div class="readonly-status"><span class="label">Status</span>${statusCell(ticket, { showEngineering: false })}<small>Updated automatically by workflow actions.</small></div>`;
  const priorityControl = priorityLocked
    ? `<div class="readonly-status"><span class="label">Priority</span><span class="priority ${priorityClass(ticket.priority)}">${ticket.priority}</span><small class="priority-lock-warn">⚠️ Locked after first save. It cannot be changed later.</small></div>`
    : unclaimed
      ? `<div class="readonly-status"><span class="label">Priority</span><span class="muted">Not set</span><small>Claim or assign the ticket before setting priority.</small></div>`
    : `<label>Priority<select id="prioritySelect"><option value="">Set priority</option>${["Highest", "High", "Medium", "Low"].map((priority) => `<option value="${priority}">${priority}</option>`).join("")}</select><small class="field-warning">One-time save. Confirm carefully.</small></label>`;
  return `<section class="drawer-card">
    <h3>Workflow Control</h3>
    <div class="workflow-grid">
      ${priorityControl}
      ${statusControl}
    </div>
    ${priorityLocked || unclaimed ? "" : `<div class="form-actions"><button class="primary" data-save-workflow="${ticket.id}">Save Priority</button></div>`}
    <div class="next-step"><span class="label">Next Step</span><p>${nextStepText(ticket)}</p></div>
  </section>`;
}

function facultyPanel(ticket) {
  const canUseFacultyFlow = state.role === "team"
    ? activeOwnsTicket(ticket) && ticket.status !== "Closed"
    : ticket.facultyAssigned === facultyActorName() && ticket.status !== "Closed";
  if (!canUseFacultyFlow) return "";
  if (ticket.finalResolutionText) {
    return `<section class="drawer-card"><h3>Resolution Locked</h3><div class="next-step"><span class="label">Approved &amp; sent</span><p>This resolution was approved by the manager and sent to the student.</p></div></section>`;
  }
  if (ticket.status === "Being reviewed" && !ticket.revisionRequested) {
    return `<section class="drawer-card"><h3>Sent to Manager Review</h3><div class="next-step"><span class="label">Awaiting approval</span><p>Your resolution has been submitted for manager review. You'll be notified if a revision is requested.</p></div><blockquote class="review-pending-quote">${escapeHtml(ticket.resolutionText)}</blockquote></section>`;
  }
  if (ticket.status === "Resolution submitted" && !ticket.finalResolutionText && !ticket.revisionRequested) {
    return `<section class="drawer-card"><h3>Resolution Submitted</h3><div class="next-step"><span class="label">Sent to student</span><p>Your resolution was submitted directly to the student.</p></div><blockquote class="review-pending-quote">${escapeHtml(ticket.resolutionText)}</blockquote></section>`;
  }
  const revisionBanner = ticket.revisionRequested
    ? `<div class="revision-notice">Manager has requested a revision. Please update your resolution and send again.</div>`
    : "";
  return `<section class="drawer-card" id="facultyResolution"><h3>${ticket.revisionRequested ? "Revision Requested" : "Write Resolution"}</h3>${revisionBanner}<div class="resolution-form"><textarea id="resolutionText" placeholder="Write your explanation here..."></textarea><input class="text-input" id="resolutionRef" placeholder="Paste a link or reference source" value="">${resolutionImageMarkup(ticket)}${voiceRecorderMarkup(ticket)}<div class="form-actions"><button class="primary" data-open-send-to-review="${ticket.id}">Send to Manager Review</button><button class="ghost" data-submit-resolution-direct="${ticket.id}">Submit Resolution</button></div><p class="muted ct-optional">Min 30 characters. Submit directly to student, or send to manager for review first.</p></div></section>`;
}

function studentReferenceCell(ticket) {
  if (!ticket.studentReference) return "None";
  const actions = hasStudentAttachment(ticket)
    ? ` <button type="button" class="soft-button tiny" data-view-student-attachment="${ticket.id}">View Attachment</button><button type="button" class="soft-button tiny" data-download-student-attachment="${ticket.id}">Download Attachment</button>`
    : "";
  return `<span class="attachment-inline">${escapeHtml(ticket.studentReference)}${actions}</span>`;
}

function hasStudentAttachment(ticket) {
  return /attached|screenshot|photo|image|diagram/i.test(ticket.studentReference || "");
}

function resolutionImageMarkup(ticket) {
  const name = ticket.resolutionImageName || "";
  const data = ticket.resolutionImageData || "";
  return `<div class="image-attach" data-resolution-image>
    <input id="resolutionImageFile" type="file" accept="image/*" hidden>
    <input id="resolutionImageName" type="hidden" value="${escapeAttr(name)}">
    <input id="resolutionImageData" type="hidden" value="${escapeAttr(data)}">
    <div class="image-attach-head">
      <div><strong>Attach image</strong><p data-resolution-image-status>${name ? escapeHtml(name) : "Attach a diagram or screenshot"}</p></div>
      <div class="image-attach-actions">
        <button type="button" class="ghost" data-trigger-resolution-image>${name ? "Replace Image" : "Attach Image"}</button>
        <button type="button" class="soft-button" data-clear-resolution-image ${name ? "" : "disabled"}>Clear</button>
      </div>
    </div>
    <div class="image-preview ${data ? "has-image" : ""}" data-resolution-image-preview>${data ? `<img src="${escapeAttr(data)}" alt="${escapeAttr(name)}">` : `<span>No image attached</span>`}</div>
  </div>`;
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

function playStudentVoiceNote(id, button) {
  const ticket = ticketById(id);
  if (!ticket?.studentVoiceNote) return;
  const originalLabel = button?.textContent || "Play Voice Note";
  if (button) {
    button.textContent = "Playing...";
    button.disabled = true;
  }
  toast(`Playing student voice note (${ticket.studentVoiceNote}).`, "success");
  window.setTimeout(() => {
    if (!button || !document.body.contains(button)) return;
    button.textContent = originalLabel;
    button.disabled = false;
  }, 1800);
}

function triggerResolutionImagePicker() {
  document.querySelector("#resolutionImageFile")?.click();
}

function handleResolutionImageChange(input) {
  const file = input.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast("Attach an image file only.");
    input.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => setResolutionImage(file.name, String(reader.result || ""));
  reader.readAsDataURL(file);
}

function setResolutionImage(name, data) {
  const root = document.querySelector("[data-resolution-image]");
  if (!root) return;
  root.querySelector("#resolutionImageName").value = name;
  root.querySelector("#resolutionImageData").value = data;
  root.querySelector("[data-resolution-image-status]").textContent = name;
  root.querySelector("[data-clear-resolution-image]").disabled = false;
  root.querySelector("[data-trigger-resolution-image]").textContent = "Replace Image";
  const preview = root.querySelector("[data-resolution-image-preview]");
  preview.classList.add("has-image");
  preview.innerHTML = `<img src="${escapeAttr(data)}" alt="${escapeAttr(name)}">`;
  toast(`Attached image: ${name}`);
}

function clearResolutionImage() {
  const root = document.querySelector("[data-resolution-image]");
  if (!root) return;
  root.querySelector("#resolutionImageFile").value = "";
  root.querySelector("#resolutionImageName").value = "";
  root.querySelector("#resolutionImageData").value = "";
  root.querySelector("[data-resolution-image-status]").textContent = "Attach a diagram or screenshot";
  root.querySelector("[data-clear-resolution-image]").disabled = true;
  root.querySelector("[data-trigger-resolution-image]").textContent = "Attach Image";
  const preview = root.querySelector("[data-resolution-image-preview]");
  preview.classList.remove("has-image");
  preview.innerHTML = "<span>No image attached</span>";
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
  const canReassign = ticket.status !== "Closed";
  const reassignmentControls = canReassign
    ? `<section class="drawer-card"><h3>Manager Controls</h3><p class="muted">Use this to reassign unclaimed or stalled work. The selected person becomes the ticket owner immediately and the change is written to the timeline.</p>${assignmentSelect(ticket.id, "managerAssignee")}</section>`
    : "";

  let resolutionControls = "";
  if (ticket.status === "Being reviewed" && ticket.resolutionText) {
    const ref = ticket.resolutionReference ? `<p class="muted small">${escapeHtml(ticket.resolutionReference)}</p>` : "";
    resolutionControls = `<section class="drawer-card manager-review-card">
      <h3>Review Resolution</h3>
      <p class="muted">The resolver has submitted a resolution. Approve to send to the student as-is, or edit the text before sending.</p>
      <div id="mgr-res-preview-${ticket.id}" class="res-preview-block">
        <p class="review-preview-text">${escapeHtml(ticket.resolutionText)}</p>${ref}
      </div>
      <div id="mgr-res-edit-${ticket.id}" hidden>
        <label class="engg-escalation-label">Edit Resolution
          <textarea id="managerReviewText" rows="6">${escapeHtml(ticket.resolutionText)}</textarea>
        </label>
      </div>
      <div class="form-actions" id="mgr-res-actions-${ticket.id}">
        <button class="primary" data-manager-approve-resolution="${ticket.id}">Approve &amp; Send to Student</button>
        <button class="ghost" data-manager-edit-resolution="${ticket.id}">Edit</button>
        <button class="ghost danger-ghost" data-send-revision="${ticket.id}">Request Revision</button>
      </div>
      <div class="form-actions" id="mgr-res-confirm-${ticket.id}" hidden>
        <button class="primary" data-manager-confirm-edit-resolution="${ticket.id}">Confirm &amp; Send to Student</button>
        <button class="ghost" data-manager-cancel-edit="${ticket.id}">Cancel</button>
      </div>
    </section>`;
  } else if (ticket.status === "Closed" || ticket.finalResolutionText) {
    const lockedResolution = ticket.finalResolutionText || ticket.resolutionText || "No resolution text.";
    resolutionControls = `<section class="drawer-card"><h3>Manager Resolution</h3><div class="next-step"><span class="label">Resolution locked</span><p>Approved and sent to student. Cannot be edited.</p></div><p class="review-preview-text">${escapeHtml(lockedResolution)}</p></section>`;
  } else {
    resolutionControls = `<section class="drawer-card"><h3>Manager Resolution</h3><p class="muted">If nobody claims the ticket, the manager can take ownership and close it with a student-facing resolution.</p><div class="resolution-form"><textarea id="managerResolutionText" placeholder="Write the resolution the learner will see..."></textarea><select id="managerResolutionCode"><option>Manager resolved</option><option>Content corrected</option><option>Explanation clarified</option><option>Technical issue fixed</option></select><button class="primary" data-manager-resolve="${ticket.id}">Claim and Resolve</button></div></section>`;
  }
  return `${reassignmentControls}${resolutionControls}`;
}

function resolutionPanel(ticket) {
  if (!ticket.resolutionText && !ticket.finalResolutionText) return "";
  const image = ticket.resolutionImageName ? ` <button type="button" class="soft-button tiny" data-view-resolution-image="${ticket.id}">View Image</button><button type="button" class="soft-button tiny" data-download-resolution-image="${ticket.id}">Download Image</button>` : "";
  const refLine = ticket.resolutionReference
    ? `<p class="muted">${ticket.resolutionReference}${ticket.resolutionImageName ? ` - Image: ${escapeHtml(ticket.resolutionImageName)}` : ""}${ticket.facultyVoiceNote ? ` - Voice: ${ticket.facultyVoiceNote}` : ""}${image}</p>`
    : `<p><span class="no-ref">No reference attached</span>${ticket.resolutionImageName ? `<span class="muted"> - Image: ${escapeHtml(ticket.resolutionImageName)}</span>` : ""}${ticket.facultyVoiceNote ? `<span class="muted"> - Voice: ${ticket.facultyVoiceNote}</span>` : ""}${image}</p>`;
  return `<section class="drawer-card"><h3>${ticket.finalResolutionText ? "Final Resolution" : "Submitted Resolution"}</h3><p>${ticket.finalResolutionText || ticket.resolutionText}</p>${refLine}${ticket.satisfactionScore ? `<p class="score ${scoreClass(ticket.satisfactionScore)}">${ticket.satisfactionScore.toFixed(1)} satisfaction score</p>` : ""}</section>`;
}

function escalationPanel(ticket) {
  const isEscalation = ticket.status === "Escalation" || ticket.status === "Escalation resolved" || ticket.feedbackType === "thumbs_down" || ticket.escalationResolved;
  if (!isEscalation) return "";
  return `<section class="drawer-card"><h3>Escalation Intake</h3>${detailGrid([
    ["Student response", ticket.followupText || "No written follow-up captured"],
    ["Call requested", ticket.callRequested ? "Yes" : "No"],
    ["Escalation output", ticket.escalationResolved ? "Escalation resolved" : "Needs outreach"],
    ["Student understood", ticket.escalationRating ? `${ticket.escalationRating}/3 rating` : "Pending"],
    ["Student review", ticket.escalationReview || "None"],
  ])}</section>`;
}

function sessionDetailPanel(ticket) {
  const session = ticket.sessionDetails || buildSessionDetails(ticket, ticket.raisedAt);
  const technical = ticket.technicalEscalation || ticket.category === "Can't See Something";
  return `<section class="drawer-card session-detail-card">
    <div class="session-detail-head" data-toggle-session-detail>
      <span class="session-detail-title"><strong>Student Device Detail</strong><small>Session context for engineering reference</small></span>
      <span class="badge ${technical ? "critical" : "review"}">${technical ? "Technical signal" : "Session detail"}</span>
      <span class="session-toggle-icon">+</span>
    </div>
    <div class="session-detail-body" hidden>
      ${detailGrid([
        ["Session ID", session.sessionId],
        ["App Version", session.appVersion],
        ["Build Hash", session.buildHash],
        ["Device", session.device],
        ["OS Version", session.osVersion],
        ["Screen Resolution", session.screen],
        ["Memory Used", session.memoryUsed],
        ["Device Location", session.location],
        ["Network", session.network],
        ["Network Latency", session.networkLatency],
        ["Last Active", absoluteDate(session.lastActive)],
        ["Question Renderer", session.questionRenderEngine],
        ["API Trace", session.apiTrace],
        ["Error Log", session.errorLog],
        ["Crash Log", session.crashLog],
        ["Attachments", `${session.attachmentCount} attached`],
      ])}
      <div class="json-section">
        <div class="json-section-head"><h4>Mock JSON Payloads</h4><p>Expandable sample payloads for engineering handoff.</p></div>
        ${jsonPayloadCards(ticket, session)}
      </div>
    </div>
  </section>`;
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
  const options = allOperators().map((person) => `<option value="${person.name}">${person.name} - ${person.role}</option>`).join("");
  return `<div class="resolution-form"><select id="${selectId}">${options}</select><button class="primary" data-save-manager-assign="${id}">Assign Selected Person</button></div>`;
}

function detailGrid(rows) {
  return `<dl class="detail-grid">${rows.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("")}</dl>`;
}

function openAttachmentPreview(id, kind) {
  const ticket = ticketById(id);
  if (!ticket) return;
  const isResolution = kind === "resolution";
  const title = isResolution ? "Resolution Image" : "Student Attachment";
  const label = isResolution ? ticket.resolutionImageName || "Attached resolution image" : ticket.studentReference || "Student attachment";
  const downloadAction = isResolution
    ? `<button type="button" class="primary tiny" data-download-resolution-image="${ticket.id}">Download Image</button>`
    : `<button type="button" class="primary tiny" data-download-student-attachment="${ticket.id}">Download Attachment</button>`;
  const body = isResolution && ticket.resolutionImageData
    ? `<div class="attachment-preview-frame"><img src="${escapeAttr(ticket.resolutionImageData)}" alt="${escapeAttr(label)}"></div>`
    : mockStudentAttachment(ticket);
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.innerHTML = `<div class="modal-head"><strong>${title}</strong><button data-close-modal>x</button></div>
    <div class="modal-body">
      <div class="attachment-modal-meta"><span class="badge review">#${ticket.id}</span><strong>${escapeHtml(label)}</strong><p>${escapeHtml(ticket.category)} - ${escapeHtml(ticket.subOption)}</p></div>
      ${body}
      <div class="form-actions">${downloadAction}</div>
    </div>`;
}

function mockStudentAttachment(ticket) {
  return `<div class="mock-attachment">
    <div class="mock-phone-bar"><span></span><strong>NPrep Question</strong><em>${escapeHtml(ticket.subject)}</em></div>
    <div class="mock-question-card"><p>${escapeHtml(ticket.studentDoubt)}</p><div class="mock-render-error">${ticket.technicalEscalation ? "Renderer issue visible in student screenshot" : "Student marked this area in screenshot"}</div></div>
    <div class="mock-caption">Mock preview for ${escapeHtml(ticket.studentReference || "student attachment")}</div>
  </div>`;
}

function downloadAttachment(id, kind) {
  const ticket = ticketById(id);
  if (!ticket) return;
  if (kind === "resolution") {
    if (!ticket.resolutionImageData) {
      toast("No resolution image is available to download.");
      return;
    }
    triggerDownload(ticket.resolutionImageName || `${ticket.id}-resolution-image.png`, ticket.resolutionImageData);
    toast(`Downloaded ${ticket.resolutionImageName || "resolution image"}.`, "success");
    return;
  }
  const fileName = `${ticket.id}-student-attachment.svg`;
  const blob = new Blob([mockStudentAttachmentSvg(ticket)], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  triggerDownload(fileName, url);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Downloaded ${fileName}.`, "success");
}

function triggerDownload(fileName, href) {
  const link = document.createElement("a");
  link.href = href;
  link.download = safeFileName(fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function safeFileName(name) {
  return String(name || "attachment").replace(/[\\/:*?"<>|]+/g, "-");
}

function mockStudentAttachmentSvg(ticket) {
  const rows = [
    ["Ticket", `#${ticket.id}`],
    ["Question ID", `#${ticket.questionId}`],
    ["Subject", ticket.subject],
    ["Topic", ticket.topic],
    ["Reference", ticket.studentReference || "Student attachment"],
  ];
  const rowSvg = rows.map(([label, value], index) => {
    const y = 106 + index * 30;
    return `<text x="42" y="${y}" class="label">${escapeXml(label)}</text><text x="178" y="${y}" class="value">${escapeXml(value)}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="420" viewBox="0 0 720 420">
  <style>
    .bg{fill:#f8fafc}.card{fill:#fff;stroke:#cbd5e1;stroke-width:2}.title{font:700 24px Arial,sans-serif;fill:#0f172a}.label{font:600 14px Arial,sans-serif;fill:#64748b}.value{font:700 14px Arial,sans-serif;fill:#0f172a}.body{font:600 16px Arial,sans-serif;fill:#0f172a}.note{font:700 15px Arial,sans-serif;fill:#9a3412}.pill{fill:#fff7ed;stroke:#fed7aa}
  </style>
  <rect width="720" height="420" rx="18" class="bg"/>
  <rect x="24" y="24" width="672" height="372" rx="14" class="card"/>
  <text x="42" y="66" class="title">NPrep Student Attachment</text>
  ${rowSvg}
  <rect x="42" y="276" width="636" height="82" rx="12" class="pill"/>
  <text x="62" y="312" class="body">${escapeXml(truncateForSvg(ticket.studentDoubt, 72))}</text>
  <text x="62" y="340" class="note">${escapeXml(ticket.technicalEscalation ? "Renderer issue visible in student screenshot" : "Student marked this area in screenshot")}</text>
</svg>`;
}

function truncateForSvg(value, maxLength) {
  const text = String(value || "");
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
}

function openProfile(name) {
  const allPeople = allOperators();
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
  return db.tickets.filter((ticket) => isAssignedTo(ticket, person.name) || owner(ticket) === "Unclaimed");
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
  el.configModal.className = "config-modal";
}

function persistAndRender(openId) {
  saveDb();
  render();
  if (openId) openTicket(openId);
}

function claimTicket(id, assignee = resolverActorName()) {
  const ticket = ticketById(id);
  ticket.claimedBy = assignee;
  if (ticket.status === "Unclaimed") ticket.status = "Working on";
  ticket.timelineStatus = "in_review";
  addHistory(ticket, assignee, "Claimed this ticket");
  persistAndRender(id);
}

function assignFacultyForQuery(ticket) {
  const eligible = subjectResolvers(ticket.subject);
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
    pushNotification("General", `No resolver for ${ticket.subject}: #${ticket.id} - Manager action needed`, ticket.id);
  } else {
    ticket.facultyAssigned = result.assigned;
    ticket.facultyAssignedAt = new Date().toISOString();
    ticket.status = "Working on";
    ticket.timelineStatus = "being_worked_on";
    addHistory(ticket, "Content Queries", `${result.reason === "RANDOM_TIE_BREAK" ? "Random tie-break assigned" : "Auto-assigned"} to ${result.assigned}`);
    pushNotification("Content Queries", `Assigned to ${result.assigned}: #${ticket.id} - ${ticket.subject}`, ticket.id);
  }
  persistAndRender(id);
}

function facultyClaim(id) {
  const ticket = ticketById(id);
  const actor = facultyActorName();
  ticket.facultyAssigned = actor;
  ticket.facultyAssignedAt = new Date().toISOString();
  ticket.status = "Working on";
  ticket.timelineStatus = "being_worked_on";
  addHistory(ticket, actor, "Claimed from Subject Pool");
  pushNotification("Content Queries", `${actor} claimed #${ticket.id} from Subject Pool`, ticket.id);
  persistAndRender(id);
}

function openSendToReviewModal(id) {
  const text = document.querySelector("#resolutionText")?.value.trim() || "";
  if (text.length < 30) { toast("Resolution needs at least 30 characters before sending."); return; }
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.innerHTML = `<div class="modal-head"><strong>Send to Manager Review</strong><button data-close-modal>✕</button></div>
    <div class="modal-body">
      <p class="muted review-modal-intro">Once sent, you cannot edit the resolution. The manager will review it and either approve (sent to student) or request a revision.</p>
      <div class="review-preview-box">
        <span class="label">Your resolution</span>
        <p class="review-preview-text">${escapeHtml(text)}</p>
      </div>
      <div class="form-actions">
        <button class="primary" data-confirm-send-to-review="${escapeAttr(id)}">Confirm &amp; Send to Manager</button>
        <button class="ghost" data-close-modal>Cancel</button>
      </div>
    </div>`;
}

function submitFacultyResolution(id) {
  const ticket = ticketById(id);
  if (ticket.resolutionText || ticket.finalResolutionText) {
    toast("Resolution has already been submitted and is locked.");
    return;
  }
  const text = document.querySelector("#resolutionText")?.value.trim() || "";
  if (text.length < 30) {
    toast("Resolution needs at least 30 characters.");
    return;
  }
  ticket.resolutionText = text;
  ticket.resolutionReference = document.querySelector("#resolutionRef")?.value.trim() || "";
  ticket.resolutionImageName = document.querySelector("#resolutionImageName")?.value.trim() || "";
  ticket.resolutionImageData = document.querySelector("#resolutionImageData")?.value.trim() || "";
  ticket.facultyVoiceNote = document.querySelector("#resolutionVoice")?.value.trim() || "";
  ticket.revisionRequested = false;
  ticket.status = "Being reviewed";
  ticket.timelineStatus = "in_review";
  addHistory(ticket, facultyActorName(), "Sent resolution to manager for review");
  pushNotification("General", `Resolution pending review: #${ticket.id} — ${facultyActorName()}`, ticket.id);
  persistAndRender(id);
}

function submitResolutionDirect(id) {
  const ticket = ticketById(id);
  if (ticket.resolutionText || ticket.finalResolutionText) {
    toast("Resolution has already been submitted and is locked.");
    return;
  }
  const text = document.querySelector("#resolutionText")?.value.trim() || "";
  if (text.length < 30) { toast("Resolution needs at least 30 characters."); return; }
  ticket.resolutionText = text;
  ticket.resolutionReference = document.querySelector("#resolutionRef")?.value.trim() || "";
  ticket.resolutionImageName = document.querySelector("#resolutionImageName")?.value.trim() || "";
  ticket.resolutionImageData = document.querySelector("#resolutionImageData")?.value.trim() || "";
  ticket.facultyVoiceNote = document.querySelector("#resolutionVoice")?.value.trim() || "";
  ticket.revisionRequested = false;
  ticket.status = "Resolution submitted";
  ticket.timelineStatus = "resolution_submitted";
  addHistory(ticket, facultyActorName(), "Submitted resolution directly to student");
  pushNotification("General", `Direct resolution submitted: #${ticket.id}`, ticket.id);
  toast(`Resolution submitted for #${id}.`, "success");
  persistAndRender(id);
}

function approveFacultyResolution(id) {
  const ticket = ticketById(id);
  ticket.finalResolutionText = ticket.resolutionText;
  ticket.status = "Resolution submitted";
  ticket.revisionRequested = false;
  addHistory(ticket, resolverActorName(), "Approved submitted resolution and moved to finalization");
  persistAndRender(id);
}

function sendRevision(id) {
  const ticket = ticketById(id);
  ticket.status = "Working on";
  ticket.revisionRequested = true;
  ticket.resolutionText = "";
  addHistory(ticket, current.manager, "Requested revision — resolution sent back to agent");
  pushNotification("General", `Revision requested on #${ticket.id} — please update your resolution`, ticket.id);
  persistAndRender(id);
  toast("Revision requested. Agent will be notified.");
}

function managerApproveResolution(id) {
  const ticket = ticketById(id);
  const text = ticket.resolutionText;
  if (!text || text.length < 20) { toast("Resolution needs at least 20 characters before approving."); return; }
  ticket.finalResolutionText = text;
  ticket.status = "Resolution submitted";
  ticket.timelineStatus = "resolution_submitted";
  ticket.resolvedAt = new Date().toISOString();
  addHistory(ticket, current.manager, "Manager approved resolution — sent to student as-is");
  pushNotification("General", `Resolution approved and sent to student: #${ticket.id}`, ticket.id);
  toast("Resolution approved and sent to student.", "success");
  persistAndRender(id);
}

function managerToggleEdit(id, show) {
  document.getElementById(`mgr-res-preview-${id}`).hidden = show;
  document.getElementById(`mgr-res-edit-${id}`).hidden = !show;
  document.getElementById(`mgr-res-actions-${id}`).hidden = show;
  document.getElementById(`mgr-res-confirm-${id}`).hidden = !show;
}

function managerConfirmEditResolution(id) {
  const ticket = ticketById(id);
  const text = document.querySelector("#managerReviewText")?.value.trim() || "";
  if (text.length < 20) { toast("Resolution needs at least 20 characters."); return; }
  ticket.resolutionText = text;
  ticket.finalResolutionText = text;
  ticket.status = "Resolution submitted";
  ticket.timelineStatus = "resolution_submitted";
  ticket.resolvedAt = new Date().toISOString();
  addHistory(ticket, current.manager, "Manager edited and sent resolution to student");
  pushNotification("General", `Manager-edited resolution sent to student: #${ticket.id}`, ticket.id);
  toast("Edited resolution sent to student.", "success");
  persistAndRender(id);
}

function closeTicket(id) {
  const ticket = ticketById(id);
  if (ticket.status === "Closed") {
    toast("Ticket is already closed and locked.");
    return;
  }
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
  addHistory(ticket, resolverActorName(), `Closed ticket with code: ${ticket.resolutionCode}`);
  persistAndRender(id);
}

function submitStudentFeedback(id, type) {
  const ticket = ticketById(id);
  ticket.feedbackType = type;
  ticket.satisfactionScore = satisfactionScore(type);
  if (type === "thumbs_down") {
    ticket.status = "Escalation";
    ticket.escalationRaisedAt = new Date().toISOString();
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
  ticket.escalationResolvedAt = new Date().toISOString();
  ticket.satisfactionScore = satisfactionScore("escalation_resolved", rating);
  ticket.status = "Closed";
  ticket.timelineStatus = "resolved";
  ticket.resolvedAt = new Date().toISOString();
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
  ticket.escalationResolvedAt = new Date().toISOString();
  addHistory(ticket, resolverActorName(), "Resolved escalation through outreach; waiting for student rating");
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
  ticket.facultyAssigned = assignee;
  ticket.claimedBy = null;
  ticket.routedTo = "faculty";
  ticket.status = "Working on";
  addHistory(ticket, current.manager, `Assigned to ${assignee} based on bandwidth`);
  toast(`Successfully assigned #${ticket.id} to ${assignee}`, "success");
  persistAndRender(id);
}

function managerClaim(id) {
  const ticket = ticketById(id);
  if (owner(ticket) !== "Unclaimed") {
    toast("Only the manager can reassign an already claimed ticket from Manager Controls.");
    return;
  }
  ticket.claimedBy = current.manager;
  ticket.status = ticket.status === "Unclaimed" ? "Working on" : ticket.status;
  ticket.timelineStatus = "in_review";
  addHistory(ticket, current.manager, "Manager claimed this unowned ticket");
  persistAndRender(id);
}

function managerResolve(id) {
  const ticket = ticketById(id);
  if (ticket.status === "Closed" || ticket.finalResolutionText || ticket.resolutionText) {
    toast("Resolution has already been submitted and is locked.");
    return;
  }
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
  if (state.role === "team") return false; // team uses Pull Ticket
  if (state.role === "faculty") return ticket.routedTo === "faculty" && subjectResolvers(ticket.subject).some((person) => person.name === current.faculty);
  if (state.role === "content") return ticket.routedTo === "content" || ticket.feedbackType === "thumbs_down" || ticket.status === "Escalation resolved";
  return false;
}

function pullTicket() {
  // Sort unclaimed pool by raisedAt ascending — earliest raised gets priority.
  // In a multi-user production system a server-side lock/transaction would resolve
  // concurrent pulls; here first-click-wins (single SPA session).
  const pool = db.tickets
    .filter(t => owner(t) === "Unclaimed")
    .sort((a, b) => new Date(a.raisedAt).getTime() - new Date(b.raisedAt).getTime());
  if (!pool.length) { openAllClearModal(); return; }
  const ticket = pool[0];
  const actor = activeOperatorName();
  ticket.facultyAssigned = actor;
  ticket.claimedBy = null;
  ticket.facultyAssignedAt = new Date().toISOString();
  ticket.status = "Working on";
  ticket.timelineStatus = "being_worked_on";
  addHistory(ticket, actor, "Pulled from unclaimed pool (earliest first)");
  pushNotification("Content Queries", `${actor} pulled #${ticket.id} from the unclaimed pool`, ticket.id);
  toast(`${ticket.id} added to your queue.`, "success");
  state.tab = "my";
  persistAndRender();
}

function openAllClearModal() {
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.className = "config-modal";
  el.configModal.innerHTML = `<div class="modal-head"><strong>Pool is Empty</strong><button data-close-modal>✕</button></div>
    <div class="modal-body">
      <div class="all-clear-body">
        <p class="all-clear-emoji">🎉</p>
        <h4>Hooray — you're all caught up!</h4>
        <p class="muted">There are no unclaimed queries in the pool right now. Your team has cleared everything that's come in. Check back later as new queries arrive.</p>
        <div class="all-clear-footer"><button class="primary" data-close-modal>Got it</button></div>
      </div>
    </div>`;
}

function assignToMe(id) {
  const ticket = ticketById(id);
  if (state.role === "team") {
    const actor = activeOperatorName();
    ticket.facultyAssigned = actor;
    ticket.claimedBy = null;
    ticket.facultyAssignedAt = new Date().toISOString();
    ticket.status = "Working on";
    ticket.timelineStatus = "being_worked_on";
    addHistory(ticket, actor, "Claimed this ticket");
    pushNotification("Content Queries", `${actor} assigned themselves to #${ticket.id}`, ticket.id);
    persistAndRender(id);
    return;
  }
  if (state.role === "faculty") {
    ticket.facultyAssigned = current.faculty;
    ticket.facultyAssignedAt = new Date().toISOString();
    ticket.status = "Working on";
    ticket.timelineStatus = "being_worked_on";
    addHistory(ticket, current.faculty, "Claimed this ticket");
    pushNotification("Content Queries", `${current.faculty} assigned themselves to #${ticket.id}`, ticket.id);
  }
  if (state.role === "content") {
    ticket.claimedBy = current.resolver;
    ticket.status = ticket.status === "Unclaimed" ? "Working on" : ticket.status;
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
  if (state.role === "team") {
    if (!activeOwnsTicket(ticket)) return `This ticket is already claimed by ${owner(ticket)}. Only the manager can reassign it.`;
    if (ticket.revisionRequested) return "Manager requested a revision. Update your resolution and send to review again.";
    if (ticket.status === "Being reviewed") return "Resolution sent to manager for review. Awaiting approval or revision request.";
    if (ticket.status === "Resolution submitted") return "Resolution submitted directly to student. Awaiting student feedback.";
    if (!ticket.resolutionText) return "Write your resolution, then either submit directly to the student or send to manager for review first.";
    if (ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) return "Student was not satisfied. Complete outreach, then mark the escalation resolved so the student can rate it.";
    return "Resolution is submitted and awaiting manager approval.";
  }
  const ownedByAnotherFaculty = state.role === "faculty" && ticket.facultyAssigned && ticket.facultyAssigned !== current.faculty;
  const ownedByAnotherResolver = state.role === "content" && ticket.claimedBy && ticket.claimedBy !== current.resolver;
  if (ownedByAnotherFaculty || ownedByAnotherResolver) return `This ticket is already claimed by ${owner(ticket)}. Only the manager can reassign it.`;
  if (state.role === "faculty") {
    if (!ticket.resolutionText) return "Write an explanation, attach a reference if useful, then submit the resolution.";
    return "Resolution is available. Wait for content review or revise if content sends it back.";
  }
  if (state.role === "content") {
    if (ticket.feedbackType === "thumbs_down" && !ticket.escalationResolved) return "Student was not satisfied. Complete outreach, then mark the call resolved so the student can rate it.";
    if (ticket.routedTo === "content" && !ticket.claimedBy) return "Assign it to yourself, add an internal note if needed, then move it into review.";
    if (ticket.routedTo === "faculty" && !ticket.facultyAssigned) return "Assign it to an eligible resolver. If it remains unclaimed for 24 hours, it will auto-assign by least load.";
    if (ticket.resolutionText && !ticket.finalResolutionText) return "Review the submitted resolution, approve or send back, then finalize the student-facing answer.";
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

function nextSupportTicketId() {
  const existing = db.tickets.filter((t) => t.id.startsWith("NS-")).length;
  return `NS-${String(existing + 1).padStart(4, "0")}`;
}

function categorySuboptions(category) {
  const combined = [...(FACULTY_ROUTED[category] || []), ...(CONTENT_ROUTED[category] || [])];
  return [...new Set(combined)];
}

function ctOpt(list, placeholder) {
  return `<option value="">${placeholder}</option>${list.map(v => `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`).join("")}`;
}

function openCreateTicketModal() {
  const categories = ["Problem with the Answer", "I Have a Doubt", "Can't See Something", "Problem with this Question", "Others"];
  const todayStr = new Date().toISOString().split("T")[0];
  el.modalScrim.hidden = false;
  el.configModal.setAttribute("open", "");
  el.configModal.className = "config-modal ct-wide-modal";
  el.configModal.innerHTML = `
  <div class="modal-head"><strong>Create Support Ticket</strong><button data-close-modal>✕</button></div>
  <div class="modal-body">
    <div class="ct-form">
      <div class="ct-row-2">
        <label>Student Name <span class="field-required">*</span>
          <input class="text-input" id="ctStudentName" type="text" placeholder="Student's full name...">
        </label>
        <label>Category <span class="field-required">*</span>
          <select id="ctCategory">
            ${ctOpt(categories, "Choose category...")}
          </select>
        </label>
      </div>

      <div class="ct-source-block">
        <span class="ct-field-label">Source <span class="field-required">*</span></span>
        <div class="ct-toggle-group">
          <button type="button" class="ct-toggle-btn" data-ct-source="QBank">QBank</button>
          <button type="button" class="ct-toggle-btn" data-ct-source="Test">Tests</button>
        </div>
      </div>

      <div id="ctQBankSection" class="ct-conditional" hidden>
        <div class="ct-row-2">
          <label>Subject <span class="field-required">*</span>
            <select id="ctSubject">${ctOpt(CT_DATA.subjects, "Select subject...")}</select>
          </label>
          <label>Chapter <span class="field-required">*</span>
            <select id="ctChapter" disabled><option value="">Select subject first...</option></select>
          </label>
        </div>
        <div class="ct-row-2">
          <label>Topic <span class="field-required">*</span>
            <select id="ctTopic" disabled><option value="">Select chapter first...</option></select>
          </label>
          <label>Test Name <span class="field-required">*</span>
            <select id="ctQBankTest">${ctOpt(CT_DATA.qbankTests, "Select test set...")}</select>
          </label>
        </div>
        <div class="ct-row-half">
          <label>Question Number <span class="field-required">*</span>
            <input class="text-input" id="ctQBankQNum" type="number" min="1" max="99999" placeholder="e.g. 47">
          </label>
        </div>
      </div>

      <div id="ctTestSection" class="ct-conditional" hidden>
        <label>Test Type <span class="field-required">*</span>
          <select id="ctTestType">
            <option value="">Select test type...</option>
            <option value="live">Live Test</option>
            <option value="pyq">PYQ Test</option>
            <option value="subject">Subject Test</option>
            <option value="mini">Mini Test</option>
            <option value="daily">Daily Test</option>
          </select>
        </label>
        <div id="ctTestTypeFields"></div>
      </div>

      <label>Student Query <span class="field-required">*</span>
        <textarea id="ctQueryText" rows="3" placeholder="Describe the student's doubt or issue as shared via WhatsApp or call..."></textarea>
      </label>

      <div class="ct-source-block">
        <span class="ct-field-label">Raised On <span class="field-required">*</span></span>
        <div class="ct-toggle-group">
          <button type="button" class="ct-toggle-btn active" data-ct-raised="today">Today</button>
          <button type="button" class="ct-toggle-btn" data-ct-raised="custom">Pick a Date</button>
        </div>
        <input class="date-input ct-date-picker" id="ctRaisedDate" type="date" max="${todayStr}" value="${todayStr}" hidden>
      </div>

      <label>Internal Remarks <small class="ct-optional">(optional)</small>
        <input class="text-input" id="ctRemarks" type="text" placeholder="Context for the resolver team — not shown to the student...">
      </label>

      <div class="form-actions">
        <button class="primary" data-submit-new-ticket>Create Ticket</button>
        <button class="ghost" data-close-modal>Cancel</button>
      </div>
    </div>
  </div>`;
}

function updateCtTestTypeFields(testType) {
  const container = document.querySelector("#ctTestTypeFields");
  if (!container) return;
  if (testType === "live") {
    container.innerHTML = `<div class="ct-row-2">
      <label>Test Name <span class="field-required">*</span><select id="ctSpecificTestName">${ctOpt(CT_DATA.liveTests, "Select live test...")}</select></label>
      <label>Question Number <span class="field-required">*</span><input class="text-input" id="ctTestQNum" type="number" min="1" placeholder="e.g. 23"></label>
    </div>`;
  } else if (testType === "pyq") {
    container.innerHTML = `<div class="ct-row-2">
      <label>Test Name <span class="field-required">*</span><select id="ctSpecificTestName">${ctOpt(CT_DATA.pyqTests, "Select PYQ paper...")}</select></label>
      <label>Question Number <span class="field-required">*</span><input class="text-input" id="ctTestQNum" type="number" min="1" placeholder="e.g. 88"></label>
    </div>`;
  } else if (testType === "subject") {
    container.innerHTML = `<div class="ct-row-2">
      <label>Test Name <span class="field-required">*</span><select id="ctSpecificTestName">${ctOpt(CT_DATA.subjectTests, "Select subject test...")}</select></label>
      <label>Question Number <span class="field-required">*</span><input class="text-input" id="ctTestQNum" type="number" min="1" placeholder="e.g. 15"></label>
    </div>`;
  } else if (testType === "mini" || testType === "daily") {
    const label = testType === "mini" ? "Mini Test" : "Daily Test";
    container.innerHTML = `<div class="ct-row-2">
      <label>Test Date <span class="field-required">*</span><input class="date-input" id="ctTestDate" type="date" max="${new Date().toISOString().split("T")[0]}"></label>
      <label>Question Number <span class="field-required">*</span><input class="text-input" id="ctTestQNum" type="number" min="1" placeholder="e.g. 5"></label>
    </div>`;
  } else {
    container.innerHTML = "";
  }
}

function submitNewTicket() {
  const studentName = document.querySelector("#ctStudentName")?.value.trim() || "";
  const category = document.querySelector("#ctCategory")?.value || "";
  const queryText = document.querySelector("#ctQueryText")?.value.trim() || "";
  const remarks = document.querySelector("#ctRemarks")?.value.trim() || "";
  if (!studentName) { toast("Student name is required."); return; }
  if (!category) { toast("Choose a category."); return; }
  if (!queryText || queryText.length < 10) { toast("Student Query needs at least 10 characters."); return; }

  const activeSource = document.querySelector("[data-ct-source].active")?.dataset.ctSource;
  if (!activeSource) { toast("Select a source — QBank or Tests."); return; }

  let subject = "", topic = "", questionId = 0, subOption = "General support query", sourceLabel = activeSource;

  if (activeSource === "QBank") {
    subject = document.querySelector("#ctSubject")?.value || "";
    const chapter = document.querySelector("#ctChapter")?.value || "";
    topic = document.querySelector("#ctTopic")?.value || "";
    const testName = document.querySelector("#ctQBankTest")?.value || "";
    const qNum = Number(document.querySelector("#ctQBankQNum")?.value || 0);
    if (!subject || !chapter || !topic) { toast("Select Subject, Chapter, and Topic for QBank."); return; }
    if (!testName) { toast("Select a QBank Test Name."); return; }
    if (!qNum) { toast("Enter a Question Number."); return; }
    questionId = qNum;
    subOption = chapter;
    sourceLabel = `QBank · ${testName}`;
  } else {
    const testType = document.querySelector("#ctTestType")?.value || "";
    if (!testType) { toast("Select a test type."); return; }
    if (testType === "live" || testType === "pyq" || testType === "subject") {
      const testName = document.querySelector("#ctSpecificTestName")?.value || "";
      const qNum = Number(document.querySelector("#ctTestQNum")?.value || 0);
      if (!testName) { toast("Select a Test Name."); return; }
      if (!qNum) { toast("Enter a Question Number."); return; }
      questionId = qNum;
      subOption = testName;
      const typeLabel = testType === "live" ? "Live Test" : testType === "pyq" ? "PYQ Test" : "Subject Test";
      sourceLabel = `${typeLabel} · ${testName}`;
    } else {
      const testDate = document.querySelector("#ctTestDate")?.value || "";
      const qNum = Number(document.querySelector("#ctTestQNum")?.value || 0);
      if (!testDate) { toast("Select the test date."); return; }
      if (!qNum) { toast("Enter a Question Number."); return; }
      questionId = qNum;
      const typeLabel = testType === "mini" ? "Mini Test" : "Daily Test";
      subOption = `${typeLabel} · ${testDate}`;
      sourceLabel = subOption;
    }
  }

  const raisedCustom = document.querySelector("[data-ct-raised].active")?.dataset.ctRaised === "custom";
  let raisedAt = new Date().toISOString();
  if (raisedCustom) {
    const customDate = document.querySelector("#ctRaisedDate")?.value;
    if (!customDate) { toast("Pick a date for 'Raised On'."); return; }
    raisedAt = new Date(customDate + "T12:00:00").toISOString();
  }

  const id = nextSupportTicketId();
  const ticket = createTicket({
    id, questionId, student: studentName, category,
    subOption, queryText, studentDoubt: queryText,
    ageHours: 0, status: "Unclaimed", timelineStatus: "raised",
    source: sourceLabel, subject, topic, raisedAt,
  });
  if (remarks) ticket.internalNotes = [{ author: current.manager, text: remarks, at: new Date().toISOString() }];
  ticket.history.unshift(eventLine(current.manager, "Ticket created by support team from WhatsApp/call"));
  db.tickets.unshift(ticket);
  pushNotification("Support", `Support ticket created: #${id} — ${studentName}`, id);
  closeModal();
  persistAndRender(id);
  toast(`Ticket #${id} created for ${studentName}.`, "success");
}

function statusCell(ticket, options = {}) {
  const showEngineering = options.showEngineering !== false;
  const engineering = showEngineering && isEngineeringEscalated(ticket) ? `<span class="badge engineering">Engineering Escalation</span>` : "";
  return `<span class="status-stack"><span class="badge ${statusClass(ticket.status)}">${ticket.status}</span>${engineering}</span>`;
}

function isEngineeringEscalated(ticket) {
  return Boolean(ticket.technicalEscalation && owner(ticket) !== "Unclaimed");
}

function statusClass(status) {
  if (status === "Closed") return "closed";
  if (status === "Resolution submitted") return "faculty";
  if (status === "Working on") return "work";
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
  if (score >= 2.5) return "good";
  if (score >= 1.5) return "ok";
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

function durationBetween(start, end) {
  if (!start || !end) return "Pending";
  const minutes = Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = minutes / 60;
  if (hours < 48) return `${hours.toFixed(1)}h`;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  return `${days}d ${remainingHours}h`;
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

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toast(message, tone = "") {
  const item = document.createElement("div");
  item.className = `toast ${tone}`.trim();
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
  state.managerFilter = null;
  closeDrawer();
  render();
});

el.profileSelect.addEventListener("change", (event) => {
  if (state.role === "team") {
    current.operator = event.target.value;
    current.faculty = event.target.value;
    current.resolver = event.target.value;
  }
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

el.resetFiltersButton.addEventListener("click", () => {
  state.search = "";
  state.questionIdSearch = "";
  state.status = "all";
  state.assignee = "all";
  state.dateFrom = "";
  state.dateTo = "";
  el.searchInput.value = "";
  renderFilters();
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


el.tableHead.addEventListener("pointerdown", startColumnResize);

el.tableHead.addEventListener("dblclick", (event) => {
  const handle = event.target.closest("[data-resize-column]");
  if (!handle) return;
  event.preventDefault();
  event.stopPropagation();
  autoFitColumn(handle.dataset.resizeColumn);
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
  if (event.target?.id === "resolutionImageFile") {
    handleResolutionImageChange(event.target);
    return;
  }
  const reportDate = event.target.closest?.("[data-report-date]");
  if (reportDate) {
    if (reportDate.dataset.reportDate === "from") state.dateFrom = reportDate.value;
    if (reportDate.dataset.reportDate === "to") state.dateTo = reportDate.value;
    render();
    return;
  }
  if (event.target?.id === "profileSwitcher") openProfile(event.target.value);
  const tid = event.target?.id;
  if (tid === "ctSubject") {
    const chapters = CT_DATA.chapters[event.target.value] || [];
    const chSel = document.querySelector("#ctChapter");
    const tpSel = document.querySelector("#ctTopic");
    if (chSel) { chSel.innerHTML = ctOpt(chapters, "Select chapter..."); chSel.disabled = !chapters.length; }
    if (tpSel) { tpSel.innerHTML = `<option value="">Select chapter first...</option>`; tpSel.disabled = true; }
  }
  if (tid === "ctChapter") {
    const topics = CT_DATA.topics[event.target.value] || [];
    const tpSel = document.querySelector("#ctTopic");
    if (tpSel) { tpSel.innerHTML = ctOpt(topics, "Select topic..."); tpSel.disabled = !topics.length; }
  }
  if (tid === "ctTestType") updateCtTestTypeFields(event.target.value);
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest("[data-toggle-session-detail]")) {
    const card = target.closest(".session-detail-card");
    const body = card?.querySelector(".session-detail-body");
    const icon = card?.querySelector(".session-toggle-icon");
    if (body) body.hidden = !body.hidden;
    if (icon) icon.textContent = body?.hidden ? "+" : "−";
    return;
  }
  const open = target.closest("[data-open]");
  const rowOpen = target.closest("[data-row-open]");
  const close = target.closest("[data-close-drawer]");
  const profile = target.closest("[data-profile]");
  const showPanel = target.closest("[data-show-panel]");
  const sortButton = target.closest("[data-sort]");
  const reportButton = target.closest("[data-download-report]");
  const studentAttachment = target.closest("[data-view-student-attachment]");
  const resolutionAttachment = target.closest("[data-view-resolution-image]");
  const studentAttachmentDownload = target.closest("[data-download-student-attachment]");
  const resolutionAttachmentDownload = target.closest("[data-download-resolution-image]");
  const studentVoice = target.closest("[data-play-student-voice]");
  if (studentAttachment) {
    openAttachmentPreview(studentAttachment.dataset.viewStudentAttachment, "student");
    return;
  }
  if (resolutionAttachment) {
    openAttachmentPreview(resolutionAttachment.dataset.viewResolutionImage, "resolution");
    return;
  }
  if (studentAttachmentDownload) {
    downloadAttachment(studentAttachmentDownload.dataset.downloadStudentAttachment, "student");
    return;
  }
  if (resolutionAttachmentDownload) {
    downloadAttachment(resolutionAttachmentDownload.dataset.downloadResolutionImage, "resolution");
    return;
  }
  if (studentVoice) {
    playStudentVoiceNote(studentVoice.dataset.playStudentVoice, studentVoice);
    return;
  }
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
  if (target.closest("[data-pull-ticket]")) { pullTicket(); return; }
  if (target.closest("[data-assign-self]")) assignToMe(target.closest("[data-assign-self]").dataset.assignSelf);
  if (target.closest("[data-save-workflow]")) saveWorkflow(target.closest("[data-save-workflow]").dataset.saveWorkflow);
  if (target.closest("[data-faculty-claim]")) facultyClaim(target.closest("[data-faculty-claim]").dataset.facultyClaim);
  if (target.closest("[data-assign-faculty]")) assignToFaculty(target.closest("[data-assign-faculty]").dataset.assignFaculty);
  if (target.closest("[data-trigger-resolution-image]")) triggerResolutionImagePicker();
  if (target.closest("[data-clear-resolution-image]")) clearResolutionImage();
  if (target.closest("[data-toggle-voice-recording]")) toggleVoiceRecording();
  if (target.closest("[data-play-voice-note]")) playVoiceNote();
  if (target.closest("[data-clear-voice-note]")) clearVoiceNote();
  if (target.closest("[data-open-send-to-review]")) { openSendToReviewModal(target.closest("[data-open-send-to-review]").dataset.openSendToReview); return; }
  if (target.closest("[data-confirm-send-to-review]")) { const id = target.closest("[data-confirm-send-to-review]").dataset.confirmSendToReview; closeModal(); submitFacultyResolution(id); return; }
  if (target.closest("[data-submit-resolution-direct]")) { submitResolutionDirect(target.closest("[data-submit-resolution-direct]").dataset.submitResolutionDirect); return; }
  if (target.closest("[data-manager-approve-resolution]")) { managerApproveResolution(target.closest("[data-manager-approve-resolution]").dataset.managerApproveResolution); return; }
  if (target.closest("[data-manager-edit-resolution]")) { managerToggleEdit(target.closest("[data-manager-edit-resolution]").dataset.managerEditResolution, true); return; }
  if (target.closest("[data-manager-cancel-edit]")) { managerToggleEdit(target.closest("[data-manager-cancel-edit]").dataset.managerCancelEdit, false); return; }
  if (target.closest("[data-manager-confirm-edit-resolution]")) { managerConfirmEditResolution(target.closest("[data-manager-confirm-edit-resolution]").dataset.managerConfirmEditResolution); return; }
  if (target.closest("[data-submit-resolution]")) submitFacultyResolution(target.closest("[data-submit-resolution]").dataset.submitResolution);
  if (target.closest("[data-save-note]")) {
    const ticket = ticketById(target.closest("[data-save-note]").dataset.saveNote);
    const text = document.querySelector("#noteText")?.value.trim();
    if (text) {
      ticket.internalNotes.unshift({ author: resolverActorName(), text, at: new Date().toISOString() });
      addHistory(ticket, resolverActorName(), "Added internal note");
      persistAndRender(ticket.id);
    }
  }
  if (target.closest("[data-recall]")) {
    const ticket = ticketById(target.closest("[data-recall]").dataset.recall);
    ticket.facultyAssigned = null;
    ticket.status = "Working on";
    addHistory(ticket, resolverActorName(), "Recalled from resolver");
    persistAndRender(ticket.id);
  }
  if (target.closest("[data-approve-resolution]")) approveFacultyResolution(target.closest("[data-approve-resolution]").dataset.approveResolution);
  if (target.closest("[data-send-revision]")) sendRevision(target.closest("[data-send-revision]").dataset.sendRevision);
  if (target.closest("[data-close-ticket]")) closeTicket(target.closest("[data-close-ticket]").dataset.closeTicket);
  if (target.closest("[data-confirm-escalate-engineering]")) {
    const ticketId = target.closest("[data-confirm-escalate-engineering]").dataset.confirmEscalateEngineering;
    const ticket = ticketById(ticketId);
    const analysis = document.querySelector("#escalateAnalysis")?.value?.trim();
    const confirmText = document.querySelector("#escalateConfirm")?.value?.trim();
    if (!analysis) { toast("Add your analysis before escalating."); return; }
    if (confirmText?.toLowerCase() !== "yes") { toast('Type "yes" in the confirmation field to escalate.'); return; }
    if (state.role === "team" ? !activeOwnsTicket(ticket) : ticket.claimedBy !== current.resolver) {
      toast("Claim this ticket before escalating it to Engineering.");
      return;
    }
    if (ticket.technicalEscalation) {
      toast("This ticket is already escalated to Engineering.");
      return;
    }
    ticket.technicalEscalation = true;
    addHistory(ticket, resolverActorName(), `Escalated to Engineering — ${analysis}`);
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
  if (target.closest("[data-export-all-csv]")) { exportAllCsv(); return; }
  if (target.closest("[data-create-ticket-modal]")) { openCreateTicketModal(); return; }
  if (target.closest("[data-submit-new-ticket]")) { submitNewTicket(); return; }
  const ctSource = target.closest("[data-ct-source]");
  if (ctSource) {
    document.querySelectorAll("[data-ct-source]").forEach(b => b.classList.toggle("active", b === ctSource));
    const isQBank = ctSource.dataset.ctSource === "QBank";
    const qbSec = document.querySelector("#ctQBankSection");
    const tsSec = document.querySelector("#ctTestSection");
    if (qbSec) qbSec.hidden = !isQBank;
    if (tsSec) tsSec.hidden = isQBank;
    return;
  }
  const ctRaised = target.closest("[data-ct-raised]");
  if (ctRaised) {
    document.querySelectorAll("[data-ct-raised]").forEach(b => b.classList.toggle("active", b === ctRaised));
    const picker = document.querySelector("#ctRaisedDate");
    if (picker) picker.hidden = ctRaised.dataset.ctRaised !== "custom";
    return;
  }
  const managerAlert = target.closest("[data-manager-alert]");
  if (managerAlert) {
    const type = managerAlert.dataset.managerAlert;
    state.managerFilter = state.managerFilter?.type === type ? null : { type };
    render(); return;
  }
  const resolverRow = target.closest("[data-manager-filter-resolver]");
  if (resolverRow) {
    const name = resolverRow.dataset.managerFilterResolver;
    state.managerFilter = state.managerFilter?.type === "resolver" && state.managerFilter?.value === name ? null : { type: "resolver", value: name };
    render(); return;
  }
  const qFilter = target.closest("[data-manager-filter-question]");
  if (qFilter) {
    state.managerFilter = { type: "question", value: Number(qFilter.dataset.managerFilterQuestion) };
    render(); return;
  }
  if (target.closest("[data-manager-filter-clear]")) {
    state.managerFilter = null;
    render(); return;
  }
  const resolverSort = target.closest("[data-resolver-sort]");
  if (resolverSort) {
    const k = resolverSort.dataset.resolverSort;
    state.resolverSort = state.resolverSort.key === k
      ? { key: k, dir: state.resolverSort.dir === "asc" ? "desc" : "asc" }
      : { key: k, dir: "desc" };
    renderManagerOverview(); return;
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
