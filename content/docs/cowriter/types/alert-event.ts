export interface AlertEvent {
  /** Avey unified terminology ID for the alert */
  aut_id: string;
  /** Name of the alert */
  name: string;
  /** Array of problems associated with this alert */
  problems: {
    /** Whether the problem has been fixed */
    fixed: boolean;
    /** Message template enum identifier */
    message_template_enum: string;
  }[];
  section: "procedure" | "medication" | "assessment";
}

const customToc = [
  { id: "overview", title: "Overview", depth: 2 },
  { id: "usage", title: "How to use the API", depth: 2 },
  { id: "input", title: "Input Parameters", depth: 3 },
  { id: "output", title: "Output", depth: 3 },
  { id: "workflow", title: "How it works", depth: 2 },
];
