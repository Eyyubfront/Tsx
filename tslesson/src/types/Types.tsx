export interface Language {
  id: number;
  name: string;
  image: string; // Base64 formatındaki görüntüyü temsil eder
  selectedSourceLanguageId: string;  // Add this field
  selectedTranslationId: string;     // Add this field
}
export interface LanguageHomes {
  id?: number;
  isSelected?: boolean;
  sourceLanguage?: string;  
  translationLanguage?: string; 
}


