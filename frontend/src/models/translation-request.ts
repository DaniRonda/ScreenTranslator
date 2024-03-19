
export class CaptureText{
  language?: string;
  imageBase?: string;
}
export class CaptureText2{
  language?: string;
  content?: string;
}

export interface DetectedLanguage {
  Language: string;
  Score: number;
}
export interface Translation {
  Text: string;
  To: string;
}
export interface TranslationRequest {
  targetLanguage: string;
  content: string;
}
export interface TranslationResponse {
  DetectedLanguage: DetectedLanguage;
  Translations: Translation[];
}
