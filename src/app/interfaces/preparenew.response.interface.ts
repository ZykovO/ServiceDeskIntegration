// Base interface for all form fields
interface BaseFormField {
  id: string;
  placeholder: string;
  readonly?: boolean;
}

// Form Input interface
export interface FormInput extends BaseFormField {
  value?: string | null;
  filed_type: 'input';
}

// Form Textarea interface
export interface FormTextarea extends BaseFormField {
  value?: string | null;
  filed_type: 'textarea';
}

// Form Select Option interface
export interface FormSelectOption {
  value: string;
  text: string;
  selected?: boolean;
}

// Form Select interface
export interface FormSelect extends BaseFormField {
  options: FormSelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  filed_type: 'select';
}

// Form File interface
export interface FormFile {
  id: string;
  accept?: string | null; // ".pdf,.doc" или "image/*,application/pdf"
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  field_type: 'file';
}

// Union type for all form fields
export type FormField = FormInput | FormTextarea | FormSelect | FormFile;

// Main response interface
export interface PrepareNewFormResponse {
  header: FormField[];
  footer: FormField[];
}
