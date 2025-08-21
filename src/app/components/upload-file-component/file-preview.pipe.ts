import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'filePreview' })
export class FilePreviewPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(file: File | { name: string, url: string | SafeResourceUrl }): string | SafeResourceUrl {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    } else if (typeof file.url === 'string') {
      return this.sanitizer.bypassSecurityTrustUrl(file.url);
    }
    return file.url; // SafeResourceUrl как есть
  }

}
