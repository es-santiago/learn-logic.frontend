interface Question {
  number: string;
  title: string;
  description: string;
  level: any; 
  status: any; 
  tags: string[];
  codeSnippet: string; 
  solutionIdentifier: string;
  points: number; 
  userId: string; 
  imageBase64: string; 
  items: QuestionItems[];
  imageName: string;
  id: string;
  creationDate: string;
  changeDate: string;
  activated: boolean;
}
