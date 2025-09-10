export enum AlertSection {
  PROCEDURE = "procedure",
  MEDICATION = "medication",
  ASSESSMENT = "assessment"
}

export interface AlertProblem {
  /** Whether the problem has been fixed */
  fixed: boolean;
  /** Message template enum identifier */
  message_template_enum: string;
}

export interface Alert {
  /** Unique identifier for the alert */
  aut_id: string;
  /** Name of the alert */
  name: string;
  /** Array of problems associated with this alert */
  problems: AlertProblem[];
  /** Section where this alert applies */
  section: AlertSection;
}

export interface AlertEvent {
  /** Unique identifier for the alert */
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
