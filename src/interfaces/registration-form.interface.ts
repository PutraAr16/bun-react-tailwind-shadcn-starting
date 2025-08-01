export interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  age: number;
  birthdate: string;
  gender: 'Male' | 'Female';
  learningPath: string[];
  addNotes: boolean;
  notes?: string; // Optional field
}

export interface Participant extends RegistrationFormData {
  id: string;
  registeredAt: string;
}