import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, ContactForm } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage: { type: 'success' | 'error', text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  // 檢查表單控制項是否無效且已被訪問
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // 獲取錯誤訊息
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (!field) return '';
    
    if (field.hasError('required')) {
      return '此欄位為必填項';
    }
    
    if (field.hasError('email')) {
      return '請輸入有效的電子郵件地址';
    }
    
    if (field.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `此欄位至少需要 ${minLength} 個字元`;
    }
    
    return '此欄位無效';
  }

  // 提交表單
  onSubmit(): void {
    if (this.contactForm.invalid) {
      // 標記所有欄位為已訪問，以顯示錯誤訊息
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = null;
    
    const formData: ContactForm = this.contactForm.value;
    
    this.contactService.sendContactForm(formData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.submitMessage = {
              type: 'success',
              text: response.message
            };
            this.contactForm.reset();
          } else {
            this.submitMessage = {
              type: 'error',
              text: response.message || '發送訊息時出錯，請稍後再試。'
            };
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitMessage = {
            type: 'error',
            text: '發送訊息時出錯，請稍後再試。'
          };
          console.error('聯絡表單提交錯誤:', error);
        }
      });
  }
}
