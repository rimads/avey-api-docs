export enum EventType {
  NEW_FINDINGS = "new_findings",
  NEW_COLLABORATOR_QUESTION = "new_collaborator_question",
  NEW_ALERTS = "new_alerts"
}

export interface ParentConcept {
  /** Unique identifier for the parent concept */
  id: string;
  /** Name of the parent medical concept */
  name: string;
}

export interface Finding {
  /** Unique identifier for the finding */
  id: string;
  /** Name of the clinical finding */
  name: string;
  /** Status of the finding (e.g., "confirmed", "suspected") */
  status: string;
  /** Classification type (e.g., "chronic", "acute") */
  classification: string;
  /** Source that generated this finding */
  publisher: string;
  /** ISO 8601 timestamp when finding was identified */
  time: string;
  /** Whether this is a chief complaint */
  is_chief: boolean;
  /** Related parent medical concept */
  parent_concept: ParentConcept | null;
  /** SNOMED CT identifier */
  snomed_id: string;
}

export interface FindingEvent {
/** Unique identifier for the finding */
  id: string;
  /** Name of the clinical finding */
  name: string;
  /** Status of the finding (e.g., "confirmed", "suspected") */
  status: string;
  /** Classification type (e.g., "chronic", "acute") */
  classification: string;
  /** Source that generated this finding */
  publisher: string;
  /** ISO 8601 timestamp when finding was identified */
  time: string;
  /** Whether this is a chief complaint */
  is_chief: boolean;
  /** Related parent medical concept */
  parent_concept:{  /** Unique identifier for the parent concept */
    id: string;
    /** Name of the parent medical concept */
    name: string;
}| null;
  /** SNOMED CT identifier */
  snomed_id: string;
    
  };


