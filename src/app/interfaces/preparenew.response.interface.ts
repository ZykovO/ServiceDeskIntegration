// Base interface for all form fields
interface BaseFormField {
  id: string;
  placeholder: string;
  readonly?: boolean;
}

// Form Input interface
export interface FormInput extends BaseFormField {
  value?: string | null;
  field_type: 'input';
  type: 'text' | 'date' | 'time';
}

// Form Textarea interface
export interface FormTextarea extends BaseFormField {
  value?: string | null;
  field_type: 'textarea';
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
  field_type: 'select';
}

// Form File interface
export interface FormFile extends BaseFormField {
  accept?: string | null;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  field_type: 'file';
}

// Union type for all form fields
export type FormField = FormInput | FormTextarea | FormSelect | FormFile;

// Main response interface
export interface PrepareNewFormResponse {
  header: FormField[];
  footer: FormField[];
}
