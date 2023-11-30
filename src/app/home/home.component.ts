import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {

      if (input.files[0].size > 50000000) { // 50MB in bytes
        alert('File size should not exceed 50MB');
      }
      this.uploadFiles(input.files);
    }
  }

  private uploadFiles(files: FileList) {
    // Handle file uploading logic here
    console.log(files);
  }
}
