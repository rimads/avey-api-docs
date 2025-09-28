export enum EventType {
  NEW_FINDINGS = "new_findings",
  NEW_COLLABORATOR_QUESTION = "new_collaborator_question",
  NEW_ALERTS = "new_alerts",
}

export interface FindingEvent {
  /** Unique identifier for the finding */
  id: string;
  /** Name of the finding */
  name: string;
  /** Status of the finding*/
  status: "present" | "absent" | "unsure";
  /** Classification type */
  classification: "subjective" | "objective";
  /** Source that generated this finding */
  publisher: string;
  /** timestamp when finding was identified */
  time: string;
  /** Whether this is a chief complaint */
  is_chief: boolean;
  /** Related parent medical concept */
  parent_concept: {
    id: string;
    name: string;
  } | null;
  /** SNOMED CT identifier */
  snomed_id: string;
}
