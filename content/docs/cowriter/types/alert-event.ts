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
