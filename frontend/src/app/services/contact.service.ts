import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// 聯絡表單接口
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  /**
   * 發送聯絡表單
   * 目前模擬 API 呼叫，實際實現時應連接到後端 API
   */
  sendContactForm(formData: ContactForm): Observable<{ success: boolean, message: string }> {
    console.log('發送的表單數據:', formData);
    
    // 模擬 API 調用 (2秒延遲)
    return of({
      success: true,
      message: '您的訊息已成功送出！我們將盡快回覆您。'
    }).pipe(
      delay(2000)
    );
    
    // 實際實現時，應使用 HttpClient 發送請求到後端 API
    // return this.http.post<{success: boolean, message: string}>('/api/contact', formData);
  }
}
