export interface Language {
  id: string;
  name: string;
  image: string; // Base64 formatındaki görüntüyü temsil eder
  selectedSourceLanguageId: string;  // Add this field
  selectedTranslationId: string;     // Add this field
}
