// upload-file-component.ts
import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {TicketService} from '../../services/ticket-service';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {FileUpload} from 'primeng/fileupload';
import {NgForOf, NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {Image} from 'primeng/image';
import {Carousel} from 'primeng/carousel';
import {Badge} from 'primeng/badge';
import {Tooltip} from 'primeng/tooltip';
import {FilePreviewPipe} from './file-preview.pipe';

@Component({
  selector: 'app-upload-file-component',
  imports: [
    Card,
    PrimeTemplate,
    FileUpload,
    NgForOf,
    NgIf,
    ButtonDirective,
    Image,
    Carousel,
    Badge,
    Tooltip,
    FilePreviewPipe
  ],
  templateUrl: './upload-file-component.html',
  styleUrl: './upload-file-component.css'
})
export class UploadFileComponent {
  @Input() ticketId!: number;

  uploadedFiles: File[] = [];
  initialFiles: { name: string, url: SafeUrl }[] = [];
  session!: string;

  // Настройки карусели для мобильных устройств
  carouselResponsiveOptions = [
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private ticketService: TicketService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadInitialFiles();
  }

  loadInitialFiles() {
    this.ticketService.getTicketAttachments(this.ticketId).subscribe(res => {
      this.session = res.session;
      this.initialFiles = res.files.map(f => ({
        name: this.extractFileName(f),
        url: this.sanitizer.bypassSecurityTrustUrl(this.extractCustomUrl(f))
      }));
    });
  }

  onFileSelect(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  removeFile(file: File | { name: string, url: SafeUrl }) {
    if (file instanceof File) {
      this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
    } else {
      this.initialFiles = this.initialFiles.filter(f => f !== file);
      this.ticketService.deleteTicketAttachment(file.name).subscribe();
    }
  }

  extractFileName(url: string): string {
    return url.split('/').pop() || url;
  }

  extractCustomUrl(url: string): string {
    return `${this.ticketService.API_URL}/tickets/preparenew/file?url=${url}`;
  }

  isImage(fileName: string): boolean {
    return /(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
  }

  uploadAll() {
    if (!this.uploadedFiles.length) return;

    const formData = new FormData();
    formData.append('id', this.ticketId.toString());
    this.uploadedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    this.ticketService.uploadTicketAttachments(this.ticketId, formData, this.session)
      .subscribe({
        next: (res) => {
          console.log('Файлы загружены', res);
          this.uploadedFiles = [];
          this.loadInitialFiles();
        },
        error: (err) => {
          console.error('Ошибка загрузки файлов', err);
        }
      });
  }

  get allFiles() {
    return [...this.initialFiles, ...this.uploadedFiles];
  }

  get totalFilesCount() {
    return this.initialFiles.length + this.uploadedFiles.length;
  }

  // Получение иконки файла по типу
  getFileIcon(fileName: string): string {
    const ext = fileName.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf': return 'pi-file-pdf';
      case 'doc':
      case 'docx': return 'pi-file-word';
      case 'xls':
      case 'xlsx': return 'pi-file-excel';
      case 'zip':
      case 'rar': return 'pi-folder';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp': return 'pi-image';
      default: return 'pi-file';
    }
  }

  // Сокращение имени файла
  truncateFileName(fileName: string, maxLength: number = 15): string {
    if (fileName.length <= maxLength) return fileName;
    const ext = fileName.split('.').pop();
    const name = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = name.substring(0, maxLength - ext!.length - 4);
    return `${truncatedName}...${ext}`;
  }

  // Функция для trackBy в ngFor
  trackByFn(index: number, item: any): any {
    return item.name || item.url || index;
  }

  // Просмотр изображения
  previewImage(file: any): void {
    // Логика для открытия модального окна просмотра
    // Можно использовать PrimeNG Dialog или Image preview
    console.log('Preview image:', file);
  }
}
