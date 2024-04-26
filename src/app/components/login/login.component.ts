import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/authService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user: IUser | null | undefined;

  activeModal = inject(NgbActiveModal);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
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

  onLogin() {
    if (
      !this.loginForm.value.username ||
      !this.loginForm.value.password
    ) {
      return;
    }
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .then(() => {
        this.activeModal.close();
        this.loginForm.reset();
      })
      .catch((error) => {
        // Handle authentication error.
        console.error(error);
      });
  }

  onCancel() {
    this.loginForm.reset();
  }
}
