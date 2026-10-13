export type WorkflowKind = "trigger" | "ai" | "human" | "result";

export type WorkflowStep = {
  kind: WorkflowKind;
  label: string;
  detail: string;
};

export type Scenario = {
  id: string;
  title: string;
  prompt: string;
  steps: WorkflowStep[];
};

export const heroPrompt =
  "Build a support workflow that answers customer questions, flags angry customers for a person, and logs every ticket.";

export const heroSteps: WorkflowStep[] = [
  { kind: "trigger", label: "Message arrives", detail: "Email · WhatsApp · Web chat" },
  { kind: "ai", label: "Answer common questions", detail: "Match a verified help article" },
  { kind: "ai", label: "Check tone", detail: "Spot frustration or urgency" },
  { kind: "human", label: "Angry? Alert a person", detail: "Pause and hand over with context" },
  { kind: "result", label: "Log ticket with priority", detail: "Keep a searchable record" },
];

export const scenarios: Scenario[] = [
  {
    id: "replies",
    title: "Instant replies",
    prompt:
      "Receive messages from email and WhatsApp. Detect the language and topic. Reply right away to common questions using our help articles.",
    steps: [
      { kind: "trigger", label: "Message arrives", detail: "Email or WhatsApp" },
      { kind: "ai", label: "Detect language and topic", detail: "Understand the customer's request" },
      { kind: "ai", label: "Match to help article", detail: "Use an approved answer" },
      { kind: "ai", label: "Send reply", detail: "Respond in the right language" },
      { kind: "result", label: "Log ticket", detail: "Keep the conversation on record" },
    ],
  },
  {
    id: "complaints",
    title: "Escalate complaints",
    prompt:
      "If a customer sounds angry or mentions cancelling, stop automatic replies, mark the ticket urgent and alert a human agent.",
    steps: [
      { kind: "trigger", label: "Message arrives", detail: "A new customer conversation" },
      { kind: "ai", label: "Check tone and keywords", detail: "Listen for frustration or cancellation" },
      { kind: "ai", label: "Mark ticket urgent", detail: "Give the issue the right priority" },
      { kind: "human", label: "Alert human agent", detail: "Share context and next steps" },
      { kind: "result", label: "Pause automatic replies", detail: "A person takes the lead" },
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    prompt:
      "When a customer asks for a refund, check the order status, explain the policy, and ask a manager to approve anything over 5,000.",
    steps: [
      { kind: "trigger", label: "Refund request", detail: "A customer asks for money back" },
      { kind: "ai", label: "Look up order", detail: "Check the order status" },
      { kind: "ai", label: "Explain policy", detail: "Share the relevant refund terms" },
      { kind: "human", label: "Manager approves large refunds", detail: "Review anything over 5,000" },
      { kind: "result", label: "Update order and confirm", detail: "Close the loop with the customer" },
    ],
  },
  {
    id: "survey",
    title: "Satisfaction survey",
    prompt:
      "When a ticket is resolved, wait one hour, send a 1 to 5 rating request, and alert the team lead for any score below 3.",
    steps: [
      { kind: "trigger", label: "Ticket resolved", detail: "The conversation is complete" },
      { kind: "ai", label: "Wait one hour", detail: "Give the customer a moment" },
      { kind: "ai", label: "Send rating request", detail: "Ask for a 1 to 5 score" },
      { kind: "ai", label: "Score below 3?", detail: "Check the response" },
      { kind: "human", label: "Alert team lead", detail: "Follow up on low scores" },
    ],
  },
];

export const audiences = [
  {
    id: "agency",
    short: "Agencies",
    label: "Digital marketing agency",
    title: "Launch client support automation in a day, not two weeks.",
    description: "Separate workspaces, polished handoffs, and a repeatable service your clients can see.",
    benefits: ["Separate workspace per client", "White-label sharing", "Sell AI support as a monthly service"],
    plan: "Agency",
    action: "Book an agency demo",
    icon: "agency",
    prompt:
      "Set up a support workflow for a client: answer FAQs on WhatsApp, escalate complaints to the account manager, log tickets.",
  },
  {
    id: "institute",
    short: "Institutes",
    label: "Institute or academy",
    title: "Teach strategy, not setup.",
    description: "Give every cohort the room to learn by building, not by wrestling with tool setup.",
    benefits: ["Cohort licences", "Curriculum kit and instructor training", "Student project showcase"],
    plan: "Education",
    action: "Request the education pack",
    icon: "institute",
    prompt:
      "Answer student questions about timetables and fees, and pass admission queries to the counsellor.",
  },
  {
    id: "freelancer",
    short: "Freelancers",
    label: "Freelancer",
    title: "Deliver in an afternoon what used to take a week.",
    description: "Take on the right clients without trading away more of your time.",
    benefits: ["Affordable plan and free tier", "Template marketplace", "Shareable workflow link for client approval"],
    plan: "Pro",
    action: "Start free",
    icon: "freelancer",
    prompt:
      "Reply to my client's customers, tag urgent issues and send me a daily summary.",
  },
  {
    id: "support",
    short: "Support teams",
    label: "Support or CX team",
    title: "Describe your process once and let it run around the clock.",
    description: "Handle predictable work automatically while urgent moments reach your team quickly.",
    benefits: ["Absorb sale-season spikes", "Helpdesk and chat integrations", "Security review and pilot"],
    plan: "Enterprise",
    action: "Book a demo",
    icon: "support",
    prompt:
      "Handle order-status questions automatically and send refund requests to a manager for approval.",
  },
];

export const howSteps = [
  { number: "01", title: "Write the prompt", text: "Use plain language. Name the channels, the rules, and the moments a person should step in. Good prompts say who, when, and what should happen." },
  { number: "02", title: "Read the generated workflow", text: "Each trigger, AI step, condition, and action is laid out in order. Click any step to change it." },
  { number: "03", title: "Add human checkpoints", text: "Refunds, complaints, and anything sensitive can wait for approval before the workflow acts." },
  { number: "04", title: "Test in a sandbox", text: "Send sample customer messages and watch every decision the workflow makes." },
  { number: "05", title: "Deploy and monitor", text: "Go live, track response time and escalations, and keep version history to roll back." },
];

export const templates = [
  { category: "Support", title: "Instant replies", description: "Answer common questions in any language and log every ticket.", saved: "About 45 min", icon: "message" },
  { category: "Support", title: "Complaint escalation", description: "Spot angry customers and hand them to a person with context.", saved: "About 50 min", icon: "alert" },
  { category: "Support", title: "Refund handling", description: "Check orders and route large refunds for approval.", saved: "About 1 hr", icon: "refund" },
  { category: "Agency", title: "Client onboarding", description: "Collect client details, create tasks, and send a welcome message.", saved: "About 1 hr", icon: "agency" },
  { category: "Agency", title: "Monthly report reminders", description: "Chase approvals and send reports on schedule.", saved: "About 40 min", icon: "report" },
  { category: "Education", title: "Student query desk", description: "Answer batch timetable and fee questions for an institute.", saved: "About 45 min", icon: "education" },
];

export const plans = [
  { id: "free", name: "Free", for: "Everyone", price: "Free", amount: 0, description: "Try your first workflow.", features: ["Limited generations", "Public templates"], action: "Start free" },
  { id: "pro", name: "Pro", for: "Freelancers", price: "$19", amount: 19, description: "Room to take on more.", features: ["More generations", "Private templates", "Standard integrations"], action: "Start free" },
  { id: "agency", name: "Agency", for: "Agencies", price: "$79", amount: 79, description: "Built for client work.", features: ["Multi-client workspaces", "White-label sharing", "Team seats", "Priority support"], action: "Book a demo", popular: true },
  { id: "education", name: "Education", for: "Institutes", price: "Talk to us", amount: null, description: "For whole cohorts.", features: ["Cohort licences", "Instructor tools", "Curriculum kit"], action: "Request a pack" },
  { id: "enterprise", name: "Enterprise", for: "Support teams", price: "Talk to us", amount: null, description: "A considered rollout.", features: ["Security review", "Custom integrations", "Dedicated manager"], action: "Book a demo" },
];

export const faqItems = [
  { question: "Can I edit what the AI builds?", answer: "Yes. Every step is editable and nothing goes live until you deploy it." },
  { question: "Is customer data safe?", answer: "Publish your security and data-handling terms here, including encryption and access controls." },
  { question: "Do you offer education discounts?", answer: "Yes. The Education plan covers whole cohorts and includes a curriculum kit." },
];
