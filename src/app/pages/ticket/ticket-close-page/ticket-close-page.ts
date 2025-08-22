import {Component, OnInit, ViewChild} from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { StorageService } from '../../../services/local-storage-service';
import { TicketService } from '../../../services/ticket-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrepareNewRequest } from '../../../interfaces/prepare-new-request';
import {
  FormField,
  FormSelect,
  FormSelectOption,
  PrepareNewFormResponse
} from '../../../interfaces/preparenew.response.interface';
import { Skeleton } from 'primeng/skeleton';
import { InputText } from 'primeng/inputtext';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService, PrimeTemplate } from 'primeng/api';

import { FileUpload } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';
import { Checkbox } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Observable } from 'rxjs';
import {UploadFileComponent} from '../../../components/upload-file-component/upload-file-component';

@Component({
  selector: 'app-ticket-close-page',
  imports: [
    Skeleton,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea,
    FormsModule,
    Card,
    DatePicker,
    MultiSelect,
    PrimeTemplate,
    TableModule,
    UploadFileComponent,
    Button,
    Toast,
    Checkbox
  ],
  templateUrl: './ticket-close-page.html',
  styleUrl: './ticket-close-page.css'
})
export class TicketClosePage implements OnInit {
  @ViewChild(UploadFileComponent) uploadFileComponent!: UploadFileComponent;
  ticket?: Ticket | null;
  actType?: number | null;
  private readonly TICKET_KEY = 'currentTicket';
  isLoading = true;
  formFields?: PrepareNewFormResponse | null;
  closeTicketForm!: FormGroup;
  isSubmitting = false;
  uploadedFiles: File[] = [];

  // Значения для полей формы
  currentDate: Date = new Date();
  currentTime: Date = new Date();

// Определяем обязательные поля для закрытия заявки
  private requiredFields = [
    'dpl',
    'tc',
    'problemsubcategory_id',
    'performer_name',
    'performer_ids',
    'respondent_name',
    'reason',
    'worked'
  ];

  // Маппинг полей к их отображаемым названиям
  private fieldDisplayNames: { [key: string]: string } = {
    'dpl': 'Дата выполнения',
    'tc': 'Время выполнения',
    'problemsubcategory_id': 'Подкатегория проблемы',
    'performer_name': 'Имя исполнителя',
    'performer_ids': 'ID исполнителей',
    'respondent_name': 'ФИО клиента',
    'respondent_post': 'Должность',
    'reason': 'Причина обращения',
    'worked': 'Выполненные работы'
  };

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    console.log('Start Close ticket');
    this.isLoading = true;
    this.loadTicket();
    this.getFormFields();
    this.isLoading = false;
  }

  private initializeForm(): void {
    // Инициализируем форму с валидаторами для обязательных полей
    this.closeTicketForm = this.fb.group({
      dpl: [new Date(), Validators.required],
      tc: [new Date(), Validators.required],
      problemsubcategory_id: ['', Validators.required],
      performer_name: ['', Validators.required],
      performer_ids: [[], this.arrayNotEmptyValidator],
      respondent_name: ['---', Validators.required],
      respondent_post: ['упр.'],
      reason: ['', Validators.required],
      worked: ['', Validators.required]
    });
  }
  // Кастомный валидатор для проверки непустого массива
  private arrayNotEmptyValidator(control: any) {
    const value = control.value;
    if (!Array.isArray(value) || value.length === 0) {
      return { arrayEmpty: true };
    }
    return null;
  }

  private loadTicket(): void {
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    const userId = Number(this.route.snapshot.paramMap.get('user_id'));
    this.actType = Number(this.route.snapshot.paramMap.get('actType'));
    this.ticket = this.getCurrentTicket();
  }

  getFormFields() {
    if (this.ticket && this.actType) {
      const prepareRequest: PrepareNewRequest = {
        contractor_id: this.ticket.FormData!.contractor_id,
        ticket_id: this.ticket.InternalId,
        client_id: this.ticket.FormData!.client_id,
        ticket_type: this.ticket.FormData!.ticket_type,
        additional_number: this.ticket.ExternalId || '',
        act_type: this.actType,
        customer_name: this.ticket.Shop!
      };

      this.ticketService.get_preparenew(prepareRequest).subscribe({
        next: (preparenewForm) => {
          this.formFields = preparenewForm;
          this.populateFormWithInitialData();
        },
        error: (error) => {
          console.error('Ошибка получения формы:', error);
          this.isLoading = false;
          this.showError('Ошибка загрузки формы');
        }
      });

      console.log(prepareRequest);
    } else {
      this.isLoading = false;
    }
  }

  private populateFormWithInitialData(): void {
    if (this.formFields?.header) {
      const header = this.formFields.header;

      // Заполняем форму начальными данными из API
      this.closeTicketForm.patchValue({
        performer_name: header.performer_name?.value || '',
        reason: header.reason?.value || '',
        worked: header.worked?.value || ''
      });
    }

    // Добавляем динамические поля из body
    this.addDynamicFields(this.formFields?.body || [], 'body');
    // Добавляем динамические поля из footer
    this.addDynamicFields(this.formFields?.footer || [], 'footer');
  }

  private addDynamicFields(fields: FormField[], section: string): void {
    fields.forEach((field, index) => {
      const fieldName = `${section}_${field.id || index}`;
      let defaultValue = this.getDefaultValue(field);

      // Определяем валидаторы для динамических полей
      const validators = this.getDynamicFieldValidators(field);

      // Добавляем контроль в форму
      this.closeTicketForm.addControl(fieldName, this.fb.control(defaultValue, validators));
    });
  };
  private getDynamicFieldValidators(field: FormField): any[] {
    const validators = [];

    // Проверяем, является ли поле обязательным
    if ('required' in field && field.required === true) {
      validators.push(Validators.required);
    }

    // Добавляем дополнительные валидаторы в зависимости от типа поля
    const fieldType = this.getFieldType(field);

    if (fieldType === 'multiselect') {
      validators.push(this.arrayNotEmptyValidator);
    }

    return validators;
  }
  private getDefaultValue(field: FormField): any {
    if ('value' in field && field.value !== undefined) {
      return field.value;
    }

    const fieldType = this.getFieldType(field);

    switch (fieldType) {
      case 'select':
      case 'multiselect':
        return fieldType === 'multiselect' ? [] : '';
      case 'checkbox':
        return false;
      case 'number':
        return 0;
      case 'date':
        return new Date();
      default:
        return '';
    }
  }

  // Метод для проверки валидности формы и отображения ошибок
  private validateForm(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const formControls = this.closeTicketForm.controls;

    // Проверяем основные поля
    this.requiredFields.forEach(fieldName => {
      const control = formControls[fieldName];
      if (control && control.invalid) {
        const displayName = this.fieldDisplayNames[fieldName] || fieldName;

        if (control.errors?.['required']) {
          errors.push(`${displayName} - обязательное поле`);
        } else if (control.errors?.['arrayEmpty']) {
          errors.push(`${displayName} - должно содержать хотя бы один элемент`);
        }
      }
    });

    // Проверяем динамические поля
    Object.keys(formControls).forEach(fieldName => {
      if ((fieldName.startsWith('body_') || fieldName.startsWith('footer_')) && formControls[fieldName].invalid) {
        const field = this.findFieldByName(fieldName);
        const displayName = field?.placeholder || fieldName;

        if (formControls[fieldName].errors?.['required']) {
          errors.push(`${displayName} - обязательное поле`);
        } else if (formControls[fieldName].errors?.['arrayEmpty']) {
          errors.push(`${displayName} - должно содержать хотя бы один элемент`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private findFieldByName(fieldName: string): FormField | null {
    const [section, fieldId] = fieldName.split('_');
    const fields = section === 'body' ? this.formFields?.body : this.formFields?.footer;

    if (fields) {
      return fields.find((field, index) =>
        (field.id && field.id.toString() === fieldId) || index.toString() === fieldId
      ) || null;
    }

    return null;
  }

  private showValidationErrors(errors: string[]): void {
    const errorMessage = errors.join('\n');
    this.messageService.add({
      severity: 'warn',
      summary: 'Не заполнены обязательные поля',
      detail: errorMessage,
      life: 7000
    });
  }

  saveTicket(ticket: Ticket): void {
    this.storage.set(this.TICKET_KEY, ticket);
  }

  getCurrentTicket(): Ticket | null {
    return this.storage.get<Ticket>(this.TICKET_KEY);
  }

  getFieldType(field: FormField): string {
    if ('field_type' in field) {
      return field.field_type;
    }
    return 'unknown';
  }

  isFormSelect(field: FormField): field is FormSelect {
    return this.getFieldType(field) === 'select';
  }

  onCloseTicket(): void {
    if (!this.ticket || this.isSubmitting) {
      return;
    }
    this.uploadFileComponent.uploadAll();

    this.isSubmitting = true;

    // Собираем данные формы
    const formData = this.closeTicketForm.value;

    // Разделяем данные по секциям
    const headerData = this.extractSectionData(formData, 'header');
    const bodyData = this.extractSectionData(formData, 'body');
    const footerData = this.extractSectionData(formData, 'footer');

    // Подготавливаем данные для отправки
    const closeTicketData = {
      ticket_id: this.ticket.InternalId,
      act_type: this.actType,
      contractor_id: this.ticket.FormData!.contractor_id,
      client_id: this.ticket.FormData!.client_id,
      ticket_type: this.ticket.FormData!.ticket_type,
      customer_name: this.ticket.Shop!,
      additional_number: this.ticket.ExternalId || '',

      // Данные header формы
      header: {
        dpl: this.formatDateOnly(formData.dpl),
        tc: this.formatTimeOnly(formData.tc),
        problemsubcategory_id: formData.problemsubcategory_id,
        performer_name: formData.performer_name,
        performer_ids: formData.performer_ids,
        respondent_name: formData.respondent_name,
        respondent_post: formData.respondent_post,
        reason: formData.reason,
        worked: formData.worked
      },

      // Динамические данные из body и footer
      body: bodyData,
      footer: footerData
    };

    console.log('Отправляем данные закрытия заявки:', closeTicketData);

    // Вызываем метод сервиса для закрытия заявки
    this.ticketService.closeTicket(closeTicketData).subscribe({
      next: (response) => {
        console.log('Заявка успешно закрыта:', response);
        this.showSuccess('Заявка успешно закрыта');

        // Перенаправляем обратно к списку заявок или детальной странице
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        console.error('Ошибка при закрытии заявки:', error);
        this.showError('Ошибка при закрытии заявки');
        this.isSubmitting = false;
      }
    });
  }

  private extractSectionData(formData: any, section: string): any {
    const sectionData: any = {};
    const prefix = `${section}_`;

    Object.keys(formData).forEach(key => {
      if (key.startsWith(prefix)) {
        const fieldKey = key.replace(prefix, '');
        sectionData[fieldKey] = formData[key];
      }
    });

    return sectionData;
  }



  formatDateOnly(date: Date): string {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatTimeOnly(date: Date): string {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return(`${hh}:${mm}:${ss}`); // 11:05:07
  }


  private showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Успех',
      detail: message
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: message
    });
  }

  // Вспомогательные методы для работы с динамическими полями
  getDynamicFieldName(field: FormField, section: string, index: number): string {
    return `${section}_${field.id || index}`;
  }

  getDynamicFieldControl(field: FormField, section: string, index: number) {
    const fieldName = this.getDynamicFieldName(field, section, index);
    return this.closeTicketForm.get(fieldName);
  }

  isTextarea(field: FormField): boolean {
    return 'rows' in field && field.rows !== undefined;
  }

  isCheckbox(field: FormField): boolean {
    return this.getFieldType(field) === 'checkbox';
  }

  isMultiSelect(field: FormField): boolean {
    return this.getFieldType(field) === 'multiselect';
  }

  isDateField(field: FormField): boolean {
    return this.getFieldType(field) === 'date';
  }

  getFieldRows(field: FormField): number {
    if ('rows' in field && typeof field.rows === 'number') {
      return field.rows;
    }
    return 3; // значение по умолчанию
  }

  getFieldInputType(field: FormField): string {
    if ('type' in field && typeof field.type === 'string') {
      return field.type;
    }
    return 'text'; // значение по умолчанию
  }
}
