export interface FindingEvent {
  /** Concept of the finding */
  concept: {
    id: string;
    term: string;
    coding: "snomed" | "aut";
  };
  /** timestamp when finding was identified */
  time: string;
  /** Whether this is a chief complaint */
  is_chief: boolean;
  /** Source that generated this finding, Practitioner or Avey's Maven Model */
  publisher: "maven" | "practitioner";
  /** Classification type */
  classification: "objective" | "subjective";
  /** Status of the finding*/
  status: "absent" | "unsure" | "present";
}
