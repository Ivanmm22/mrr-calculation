import { Opportunity, OppType, Stage, Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "The Standard Renewal",
    description: "A simple scenario with a clear renewal and a subsequent insertion order.",
    opportunities: [
      { id: "001", name: "FY23 Renewal", type: OppType.Renewal, stage: Stage.ClosedWon, amount: 10000, closeDate: "2023-12-01", serviceDate: "2024-01-01" },
      { id: "002", name: "Q1 Seat Add-on", type: OppType.InsertionOrder, stage: Stage.ClosedWon, amount: 2000, closeDate: "2024-03-15", serviceDate: "2024-03-15" },
      { id: "003", name: "Consulting Hours", type: OppType.Variable, stage: Stage.ClosedWon, amount: 5000, closeDate: "2024-04-01", serviceDate: "2024-04-01" }
    ]
  },
  {
    id: 2,
    title: "The Confusing Extension",
    description: "Watch out for prohibited opportunity types and date logic.",
    opportunities: [
      { id: "004", name: "Old Contract", type: OppType.NewTerm, stage: Stage.ClosedWon, amount: 8000, closeDate: "2022-01-01", serviceDate: "2022-02-01" },
      { id: "005", name: "Bridge Extension", type: OppType.Extension, stage: Stage.ClosedWon, amount: 8000, closeDate: "2024-01-01", serviceDate: "2024-02-01" },
      { id: "006", name: "FY24 Renewal", type: OppType.Renewal, stage: Stage.ClosedWon, amount: 12000, closeDate: "2024-02-15", serviceDate: "2024-03-01" },
      { id: "007", name: "Pre-Renewal Add-on", type: OppType.Amendment, stage: Stage.ClosedWon, amount: 500, closeDate: "2024-01-15", serviceDate: "2024-01-20" }
    ]
  },
  {
    id: 3,
    title: "Multiple Bases & Lost Deals",
    description: "Identify the correct base when multiple exist and filter out lost deals.",
    opportunities: [
      { id: "008", name: "Proposed Renewal (High)", type: OppType.Renewal, stage: Stage.Negotiation, amount: 25000, closeDate: "2024-06-01", serviceDate: "2024-07-01" },
      { id: "009", name: "New Term Contract", type: OppType.NewTerm, stage: Stage.ClosedWon, amount: 20000, closeDate: "2024-01-01", serviceDate: "2024-01-01" },
      { id: "010", name: "Upsell Self-Serve", type: OppType.UpsellSelfServe, stage: Stage.ClosedWon, amount: 21000, closeDate: "2024-02-01", serviceDate: "2024-02-01" },
      { id: "011", name: "Bad Debt Amendment", type: OppType.Amendment, stage: Stage.ClosedLost, amount: -5000, closeDate: "2024-03-01", serviceDate: "2024-03-01" },
      { id: "012", name: "Valid IO", type: OppType.InsertionOrder, stage: Stage.ClosedWon, amount: 1000, closeDate: "2024-04-01", serviceDate: "2024-04-01" }
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    question: "Which of the following Opportunity Types should ALWAYS be ignored?",
    options: ["New Term", "Insertion Order", "Extension", "Renewal"],
    correct: 2 // Extension
  },
  {
    question: "If multiple Base Opportunities exist (e.g., a Renewal and an Upsell Self-Serve New), which one do you pick?",
    options: [
      "The one with the highest amount",
      "The one with the latest Close Date",
      "The one with the earliest Service Date",
      "Combine both of them"
    ],
    correct: 1 // Latest Close Date
  },
  {
    question: "To include an Insertion Order in the calculation, its Service Date must be...",
    options: [
      "After the Close Date of the Base Opportunity",
      "Before the Service Date of the Base Opportunity",
      "After the Service Date of the Base Opportunity",
      "In the same month as the Base Opportunity"
    ],
    correct: 2 // After Service Date
  },
  {
    question: "How is ACV calculated from the final MRR?",
    options: [
      "MRR * 12",
      "MRR * Contract Term Months",
      "MRR + One-time Fees",
      "It is the same as the Total Contract Value field"
    ],
    correct: 0 // MRR * 12
  }
];
