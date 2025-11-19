import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserComponent } from '../user/user';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  @Input() title = ''
  @Input() user: User = {}
  @Output() userChange = new EventEmitter<User>();
  @ViewChild(RegisterComponent) fils!: UserComponent

  erreur: String | null = null
  constructor(private router: Router, private jwtService: JwtService) { }

  enregistrer(form: NgForm) {
        this.user.grantType = 'PASSWORD'
    this.jwtService.getTokens(this.user).subscribe({
      next: res => {
        localStorage.setItem('isConnected', 'true')
        localStorage.setItem('accessToken', res.accessToken ?? '')
        localStorage.setItem('refreshToken', res.refreshToken ?? '')
        localStorage.setItem('user', JSON.stringify(this.user))
        const url = this.router.createUrlTree([''])
        this.router.navigateByUrl(url)
      },
      error: err => {
        console.log('erreur')
        this.erreur = "Identifiants incorrects"
      }


    })
    this.userChange.emit(this.user)
    form.reset()

  }

}
