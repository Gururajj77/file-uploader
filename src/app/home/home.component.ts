import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable, listAll } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FetchFilesService } from '../services/fetch-files.service';
import { UploadFileService } from '../services/upload-file.service';
@Component({
  selector: 'Home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly storage: Storage = inject(Storage);
  private fileService: FetchFilesService = inject(FetchFilesService);
  private uploadFileService: UploadFileService = inject(UploadFileService)

  constructor() { }

  ngOnInit() {
    this.fileService.fetchFiles().subscribe((data) => {
      console.log(data);
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {

      if (input.files[0].size > 50000000) {
        alert('File size should not exceed 50MB');
      }
      this.uploadFiles(input);
    }
  }

  private uploadFiles(input: HTMLInputElement) {
    this.uploadFileService.uploadFiles(input);
  }
}
