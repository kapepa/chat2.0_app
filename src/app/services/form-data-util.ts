import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataUtil {

  constructor() { }

   createFormData<T>(data: { [key in keyof T]: T[keyof T] }): FormData {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key] as string | Blob;;
        
        formData.append(key, value);
      }
    }
  
    return formData;
  }


  appendFile(formData: FormData, file: File, fieldName: string): void {
    formData.append(fieldName, file, file.name);
  }

  setHeaders(formData: FormData, headers: Record<string, string>): void {
    for (const key of Object.keys(headers)) {
      formData.append(key, headers[key]);
    }
  }

}