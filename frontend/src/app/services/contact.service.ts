import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// 聯絡表單接口
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API回應接口
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl || 'http://localhost:8000/api';
  private version = environment.version || new Date().getTime();

  constructor(private http: HttpClient) { }

  /**
   * 發送聯絡表單到後端API
   */
  sendContactForm(formData: ContactForm): Observable<ApiResponse> {
    // 添加版本參數避免快取
    const url = `${this.apiUrl}/contacts/?v=${this.version}`;
    
    return this.http.post<ApiResponse>(url, formData)
      .pipe(
        map(response => {
          console.log('API回應:', response);
          return response;
        }),
        catchError(error => {
          console.error('聯絡表單提交錯誤:', error);
          
          // 從錯誤響應中提取有用的信息
          let errorMessage = '發送訊息時出錯，請稍後再試。';
          
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          
          return of({
            success: false,
            message: errorMessage,
            errors: error.error?.errors || {}
          });
        })
      );
  }
}
