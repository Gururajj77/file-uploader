import { Injectable, inject } from '@angular/core';
import { ref, uploadBytesResumable, Storage, UploadTaskSnapshot, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private readonly storage: Storage = inject(Storage);


  uploadFiles(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, `file-uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const uploadObservable = new Observable<UploadTaskSnapshot>(observer => {
          uploadTask.on('state_changed',
            (snapshot) => observer.next(snapshot),
            (error) => observer.error(error),
            () => observer.complete()
          );
        });

        uploadObservable.subscribe({
          next: (snapshot) => {
            console.log(`Progress: ${snapshot.bytesTransferred / snapshot.totalBytes * 100}%`);
          },
          error: (error) => {
            throw new Error('Upload failed:', error);
          },
          complete: () => {
            getDownloadURL(storageRef).then(downloadURL => {
              console.log('File available at', downloadURL);
            });
          }
        });
      }
    }
  }
}
