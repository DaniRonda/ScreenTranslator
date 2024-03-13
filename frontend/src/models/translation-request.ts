export interface DetectedLanguage {
  Language: string;
  Score: number;
}
export interface Translation {
  Text: string;
  To: string;
}
export interface TranslationRequest {
  TargetLanguage: string;
  Content: string;
}
export interface TranslationResponse {
  DetectedLanguage: DetectedLanguage;
  Translations: Translation[];
}
