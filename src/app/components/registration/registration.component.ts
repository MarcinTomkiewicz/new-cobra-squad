import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/authService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  user: IUser | null | undefined;

  activeModal = inject(NgbActiveModal);

  registrationForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])
  });
  showPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    if (!this.registrationForm.value.username || !this.registrationForm.value.password || !this.registrationForm.value.name) {
      return;
    }
    this.authService.createUser(this.registrationForm.value.username, this.registrationForm.value.password,this.registrationForm.value.name)
    this.activeModal.close();
    this.registrationForm.reset();
  }

  onCancel() {
    this.registrationForm.reset();
  }
}
