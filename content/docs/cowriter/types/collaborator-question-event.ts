export interface CollaboratorQuestionEvent {
  /** The recommended AI-generated questions to ask the patient */
  data: Array<{ question: string }>;
}
