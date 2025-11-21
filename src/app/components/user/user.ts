import { Component, Input, ViewChild } from '@angular/core';
import { JwtService } from '../../services/jwt';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthComponent } from '../auth/auth';
import { RegisterComponent } from "../register/register";

@Component({
  selector: 'app-user',
  imports: [AuthComponent, RegisterComponent],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
    @Input() token: string | null = null
    @ViewChild(AuthComponent) fils!: AuthComponent
    user: User = {}
  erreur: string | null = null
  constructor(private router: Router, private jwtService: JwtService) { }

}
