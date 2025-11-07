// src/app/components/register/register.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  user: User = {
    username: '',
    password: ''
  };

  erreur: string | null = null;
  success: string | null = null;

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  onRegister(form: NgForm) {
    if (form.invalid) return;

    this.erreur = null;
    this.success = null;

    // this.jwtService.register(this.user).subscribe({
    //   next: () => {
    //     this.success = 'Compte créé avec succès';
    //     // tu peux rediriger vers la page de login
    //     this.router.navigate(['/user']); // ou '/auth', selon ta route de connexion
    //   },
    //   error: () => {
    //     this.erreur = 'Erreur lors de la création du compte';
    //   }
    // });
  }
}
