export interface Language {
  id: number;
  name: string;
  image: string; 
  selectedSourceLanguageId: string;  
  selectedTranslationId: string;  
}
export interface LanguageHomes {
  id?: number;
  isSelected?: boolean;
  sourceLanguage?: string;  
  translationLanguage?: string; 
}


