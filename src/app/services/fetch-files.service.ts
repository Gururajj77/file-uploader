import { Injectable, inject } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage } from '@angular/fire/storage';
import { Observable, catchError, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchFilesService {

  private readonly storage: Storage = inject(Storage);

  fetchFiles(): Observable<{ name: string, url: string }[]> {
    const storageRef = ref(this.storage, '/');

    return from(listAll(storageRef)).pipe(
      switchMap(result => {
        return from(Promise.all(result.items.map(itemRef =>
          getDownloadURL(itemRef).then(downloadURL => ({ name: itemRef.name, url: downloadURL }))
        )));
      }),
      catchError(error => {
        console.error('Error fetching files:', error);
        return of([]);
      })
    );
  }
}
