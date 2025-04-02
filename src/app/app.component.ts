import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  notValid?: string
  submitted: boolean = false

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    fullname: ['', Validators.required],
    age: ['', [Validators.required, Validators.max(120)]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}/) // Expected form (51) 98888-7777
    ]],
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      number: ['', Validators.min(1)],
      neighborhood: ['', Validators.required], // bairro
      city: ['', Validators.required],
    })
  })

  onCreate() {
    if (this.form.invalid) {
      this.notValid = 'Formulário inválido. Por favor, verifique os campos.'
      return
    } 
    this.submitted = true
    this.notValid = undefined
  }
}
