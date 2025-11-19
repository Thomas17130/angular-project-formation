import { Routes } from '@angular/router';
import { FormationComponent } from './components/formation/formation';
import { UserComponent } from './components/user/user';
import { HomeComponent } from './components/home/home';
import { AuthComponent } from './components/auth/auth';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
        { path: '', component: HomeComponent },
        { path: 'formation', component: FormationComponent },
        { path: 'auth', component: AuthComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'user', component: UserComponent },

];
