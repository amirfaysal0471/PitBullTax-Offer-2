export const site = {
  logo: "/brand/pitbulltax-software.png",
  phone: "954-748-2855",
  phoneHref: "tel:+19547482855",
  privacyHref: "https://pitbulltax.com/page/privacy-policy.html",
  termsHref: "https://pitbulltax.com/page/terms-and-conditions.html",
};

export const meta = {
  title: "PitBullTax — Move every tax resolution case forward",
  description:
    "Bring client intake, IRS transcripts, financial analysis, resolution options, forms, and case work together in one connected tax resolution platform.",
};

export const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Case workflow", href: "#case-workflow" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const headerCta = "Book a walkthrough";

export const videos = {
  id: "KY9KkFmeW8A",
  title: "PitBullTax platform walkthrough",
};

const walkthroughSuccess =
  "Thank you. We received your request and will contact you to arrange your platform walkthrough.";

export const hero = {
  eyebrow: "Tax resolution software for practitioners",
  title: "Move every tax resolution case forward with one connected platform.",
  body: "Bring client intake, IRS transcripts, financial analysis, resolution options, forms, and case work together. PitBullTax helps your team prepare the details and focus on the decisions that matter.",
  primary: "Book a platform walkthrough",
  secondary: "Explore the case workflow",
  visual: {
    src: "/screens/step-by-step-workflow.jpg",
    width: 966,
    height: 579,
    alt: "PitBullTax Step-by-Step Workflow case overview with client tools, case steps such as client questionnaire, power of attorney and IRS transcripts, and their status",
  },
  form: {
    title: "Show me the platform",
    helper:
      "Tell us about your practice and we will tailor the walkthrough to your work.",
    submit: "Request a platform walkthrough",
    note: "By submitting, you agree that PitBullTax may contact you about this request.",
    success: walkthroughSuccess,
  },
};

export const proofStrip = {
  label: "A connected resolution workflow",
  items: [
    { title: "Client intake", body: "Gather the information needed to begin." },
    { title: "IRS records", body: "Keep transcripts close to the case." },
    { title: "Analysis", body: "Organize finances and possible paths." },
    { title: "Forms", body: "Prepare documents from case information." },
    { title: "Follow-up", body: "Keep the next steps visible." },
  ],
};

export type EventTone = "event" | "review" | "question" | "next";

type TimelineEvent = {
  code: string;
  pos: string;
  date: string;
  label: string;
  amount: string;
  tone: EventTone;
  detail: string;
};

export const transcriptExample = {
  title: "See how IRS records inform the case.",
  subtitle:
    "Explore an illustrative tax period, then see how account activity can become part of a broader case assessment.",
  example: "Illustrative example. No real client information.",
  scale: ["2023", "Jul 2023", "Jan 2024", "Jul 2024", "Jan 2025"],
  legend: [
    { label: "Account event", tone: "event" },
    { label: "Review point", tone: "review" },
    { label: "Client question", tone: "question" },
    { label: "Next step", tone: "next" },
  ] satisfies { label: string; tone: EventTone }[],
  events: [
    {
      code: "TC 150",
      pos: "9%",
      date: "May 15, 2023",
      label: "Return filed and assessed",
      amount: "$18,420",
      tone: "event",
      detail:
        "The original return posted and the tax was assessed for this period.",
    },
    {
      code: "TC 806",
      pos: "17%",
      date: "May 15, 2023",
      label: "Withholding credit applied",
      amount: "-$6,110",
      tone: "event",
      detail:
        "Credits from W-2 withholding reduced the assessed balance for the period.",
    },
    {
      code: "TC 196",
      pos: "36%",
      date: "Jul 24, 2023",
      label: "Interest assessed",
      amount: "$412",
      tone: "review",
      detail:
        "Interest was assessed on the unpaid balance. Note it as part of the balance under review.",
    },
    {
      code: "TC 582",
      pos: "44%",
      date: "Jan 08, 2024",
      label: "Lien filed",
      amount: "$0.00",
      tone: "review",
      detail:
        "The account shows a notice of federal tax lien for the unpaid assessment. Review it alongside the client’s financial picture.",
    },
    {
      code: "TC 670",
      pos: "58%",
      date: "Jun 03, 2024",
      label: "Subsequent payment received",
      amount: "-$1,500",
      tone: "question",
      detail:
        "A payment posted to the period. Confirm the payment details with the client as part of intake.",
    },
    {
      code: "TC 971",
      pos: "86%",
      date: "Jun 10, 2024",
      label: "Account notice identified",
      amount: "$0.00",
      tone: "next",
      detail:
        "Review the notice, confirm the underlying account activity, and consider what information is needed before choosing a resolution path.",
    },
  ] satisfies TimelineEvent[],
};

export const audience = {
  label: "Built for the teams guiding tax resolution cases",
  items: [
    "Enrolled Agents",
    "CPAs",
    "Tax Attorneys",
    "Firm Owners",
    "Case Staff",
  ],
};

export const comparison = {
  eyebrow: "Why teams switch",
  title: "Keep the case moving without rebuilding the work.",
  body: "When client information, IRS records, analysis, and forms live in separate places, teams repeat steps. A connected case workflow makes it easier to see what comes next.",
  manual: {
    title: "The disconnected workflow",
    badge: "Disconnected",
    items: [
      "Collect the same facts more than once.",
      "Switch between transcripts and spreadsheets.",
      "Re-enter information into forms.",
      "Track milestones in separate notes.",
    ],
  },
  focused: {
    title: "With PitBullTax",
    badge: "Connected",
    items: [
      "Collect client information in a questionnaire.",
      "Bring IRS records into the case.",
      "Organize financial review and potential paths.",
      "Prepare forms and track the next step.",
    ],
  },
};

export const platform = {
  eyebrow: "The platform",
  title: "The tools your resolution team uses in one place.",
  body: "Connect the work from client intake to IRS records, analysis, forms, and follow-up.",
  cards: [
    {
      title: "Intake",
      body: "Collect client facts and documents through a guided questionnaire.",
      links: ["Client questionnaire", "Case details"],
      // Real menu labels from the PitBullTax client "Tools" sidebar.
      menu: {
        title: "Client Tools",
        items: [
          "Client Questionnaire",
          "Case Diagnostics",
          "Resolution Evaluation",
          "Client Summary",
          "IRS Transcripts Delivery",
        ],
      },
    },
    {
      title: "Transcripts",
      body: "Request and review authorized IRS records that inform the case.",
      links: ["Requests", "Account activity"],
      image: {
        src: "/screens/irs-tax-liability-rows.webp",
        width: 920,
        height: 372,
        alt: "PitBullTax IRS tax liability table listing sample clients with total liability, tax forms and periods, earliest CSED and current resolution",
      },
    },
    {
      title: "Analysis",
      body: "Organize tax periods, balances, and financial information for practitioner review.",
      links: ["Financial review", "Resolution options"],
    },
    {
      title: "Forms",
      body: "Use case information to prepare relevant IRS forms and client documents.",
      links: ["IRS forms", "Documents"],
    },
    {
      title: "Case work",
      body: "Keep tasks, files, and communication connected to the client matter.",
      links: ["Tasks", "Follow-up"],
    },
  ],
};

export const offerings = {
  title: "Two ways PitBullTax supports your practice",
  items: [
    {
      kicker: "01",
      title: "Tax Resolution",
      body: "Prepare and manage client matters from intake through analysis, forms, and follow-up.",
      points: ["Client questionnaire", "Financial review", "Forms", "Case workflow"],
    },
    {
      kicker: "02",
      title: "Transcript Delivery & Monitoring",
      body: "Request, interpret, and monitor IRS records that inform the case.",
      points: ["Bulk requests", "Account activity", "Alerts", "Reports"],
    },
  ],
};

export const product = {
  eyebrow: "Inside the software",
  title: "See a resolution case move through PitBullTax.",
  body: "Follow an example from intake and IRS records through analysis, forms, and a client-facing case summary.",
  videoLabel: "Watch the PitBullTax platform walkthrough",
  videoCaption: "See the connected workflow in action.",
  shots: [
    {
      src: "/screens/transcripts-dashboard.webp",
      alt: "PitBullTax dashboard showing IRS tax liability by client, tax periods, earliest CSED and current resolution",
      title: "Client intake and analysis",
      caption: "Keep case information organized for review.",
    },
    {
      src: "/screens/account-activity-report.webp",
      alt: "PitBullTax IRS tax liability table with balances, tax periods, earliest CSED and current resolution, above Offer in Compromise filing results",
      title: "Forms and case progress",
      caption: "Carry the work through the next steps.",
    },
  ],
};

export const caseJourney = {
  eyebrow: "Case workflow",
  title: "From client intake to a working resolution plan.",
  body: "See how the case moves through five connected stages. Your team reviews the facts and determines the appropriate strategy.",
  // Tool names are real labels from the PitBullTax client sidebar and workflow.
  stages: [
    {
      title: "Client intake",
      body: "Gather client facts and documents through a guided questionnaire.",
      tools: ["Client Questionnaire", "Client Portal Activity"],
    },
    {
      title: "Authorization and IRS records",
      body: "Keep authorization steps connected and bring IRS records into the case.",
      tools: ["Bulk 2848/8821", "E-Signature", "IRS Transcripts Delivery"],
    },
    {
      title: "Financial review",
      body: "Organize tax periods, balances, and financial information for practitioner review.",
      tools: ["Case Diagnostics", "Client Summary"],
    },
    {
      title: "Resolution options",
      body: "Review potential paths side by side. Your team makes the professional determination.",
      tools: ["Resolution Evaluation", "Scenario Simulator"],
    },
    {
      title: "Forms and follow-up",
      body: "Prepare relevant forms from case information and keep the next step visible.",
      tools: ["Form 433-A / 433-A (OIC)", "Step-by-Step Workflow"],
    },
  ],
  toolsLabel: "In PitBullTax",
  footnote:
    "Illustrative workflow. The steps and appropriate resolution options depend on the client matter.",
};

export const steps = {
  eyebrow: "How it works",
  title: "See how the platform fits your practice in three steps.",
  items: [
    {
      n: "1",
      title: "Book a walkthrough",
      body: "Tell us about your practice focus and the cases your team handles.",
      image: "/steps/step-1-walkthrough-call.webp",
      alt: "A PitBullTax walkthrough call on a laptop",
      video: true,
    },
    {
      n: "2",
      title: "See your workflow",
      body: "We will demonstrate the tools most relevant to your work, from intake to forms.",
      image: "/screens/step-by-step-workflow.jpg",
      alt: "PitBullTax Step-by-Step Workflow screen showing case steps, including the client questionnaire, power of attorney and IRS transcripts, with their status",
      video: false,
    },
    {
      n: "3",
      title: "Plan the next step",
      body: "Discuss training, access, and how your team would use the platform.",
      image: "/steps/step-3-training-library.webp",
      alt: "PitBullTax Video Tutorials library showing tax resolution software demonstrations",
      video: false,
    },
  ],
};

export const professionalTypes = [
  "Enrolled Agent",
  "CPA",
  "Tax Attorney",
  "Tax Preparer",
  "Firm Owner",
  "Tax Staff",
  "Other",
];

export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "Puerto Rico", "Outside the U.S.",
];

export const walkthrough = {
  eyebrow: "Personalized platform walkthrough",
  title: "See how the platform fits your practice.",
  body: "Book a personalized 30-minute look at the tax resolution workflow. Tell us where your team spends the most time, and we will focus on the tools that matter to you.",
  agenda: [
    { time: "01", title: "Start with client intake", body: "Gather the information your team needs." },
    { time: "02", title: "Connect IRS records", body: "Bring transcript activity into the case." },
    { time: "03", title: "Review the financial picture", body: "Organize balances and client information." },
    { time: "04", title: "Prepare the work", body: "See forms, documents, and case steps together." },
    { time: "05", title: "Ask your questions", body: "Walk through a scenario relevant to your practice." },
  ],
  form: {
    title: "Book your platform walkthrough",
    helper: "Submit your details and our team will follow up to arrange a time.",
    submit: "Request a platform walkthrough",
    note: "By submitting this form, you agree that PitBullTax may contact you about this request.",
    success: walkthroughSuccess,
  },
};

export const feedback = {
  eyebrow: "Built for practitioners",
  title: "Bring the pieces of a resolution case together.",
  body: "PitBullTax helps your team work from client information and IRS records through analysis, forms, and follow-up in one platform.",
  cta: "See it for your firm",
  items: [
    { title: "Prepare", body: "Collect and organize client facts for case review." },
    { title: "Assess", body: "Bring account and financial information into view." },
    { title: "Act", body: "Prepare forms, documents, and the next client update." },
  ],
};

export const guidance = {
  title: "A guided start for your team",
  body: "See the platform with a PitBullTax team member and review the training resources available for your practice.",
  cta: "Book a platform walkthrough",
};

export const faq = {
  eyebrow: "Before you book",
  title: "Questions, answered.",
  items: [
    {
      q: "Is PitBullTax only for IRS transcripts?",
      a: "No. The platform also supports client intake, case analysis, forms, and workflow tools for tax resolution work.",
    },
    {
      q: "How do transcripts fit into a case?",
      a: "Authorized IRS records can help your team understand account activity and inform the case assessment. The walkthrough shows how those records appear in the platform.",
    },
    {
      q: "Will the software choose a resolution option for me?",
      a: "PitBullTax helps organize relevant information and potential paths. A qualified practitioner reviews the facts and makes the professional determination.",
    },
    {
      q: "Can my team prepare IRS forms?",
      a: "The platform supports form preparation using information collected in the case. We can demonstrate the currently available forms during your walkthrough.",
    },
    {
      q: "Is training available?",
      a: "Our team can explain the current training and support resources available with the platform.",
    },
    {
      q: "What happens after I request a walkthrough?",
      a: "Our team will contact you to arrange a time and learn which part of the platform you want to see.",
    },
  ],
};

export const finalCta = {
  line1: "Keep the case",
  line2: "moving.",
  body: "See how PitBullTax connects the tools your tax resolution team uses every day.",
  cta: "Book a platform walkthrough",
};

export const footer = {
  copyright: "© 2026 PitBullTax Software. All rights reserved.",
  links: [
    { label: "Platform", href: "#platform" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Privacy Policy", href: site.privacyHref },
    { label: "Terms & Conditions", href: site.termsHref },
  ],
};
