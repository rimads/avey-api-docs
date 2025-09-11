
export interface LiveTranscriptionResponse {
  /** Unique identifier for the transcription message */
  id: number;
  /** Whether the transcribed text is the end of a sentence */
  is_final: boolean;
  /** Locale code of transcription */
  locale: "en" | "ar";
  /** Unix timestamp of transcription instance */
  timestamp: number;
  /** Transcription text and metadata, duration and offset are measured in milliseconds  */
  transcription_info: {
    /** Transcribed text snippet */
    text: string;
    /** Duration of audio segment (ms) */
    duration: number;
    /** Offset into the audio (ms) */
    offset: number;
  };
}

export interface PathParamsTranscriptionRequest {
  /** Unique session identifier */
  session_id: string;
  /** Locale of transcription: English or Arabic */
  locale: "en" | "ar";
}

