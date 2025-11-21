import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { JwtService } from '../../services/jwt';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  newUser: User = {}

  constructor(private router: Router, private registerService: RegisterService) {

  }
  register() {
    this.registerService.register(this.newUser).subscribe({
      next: res => {
        console.log('Inscription réussie');
        const url = this.router.createUrlTree(['/auth']);
        this.router.navigateByUrl(url);
      }
    });
    //console.log(form.value);
  }
  // supprimer(ind: number) {
  //   this.us.remove(ind)
  // }
}
