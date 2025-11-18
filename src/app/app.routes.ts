import { Routes } from '@angular/router';
import { FormationComponent } from './components/formation/formation';
import { UserComponent } from './components/user/user';
import { HomeComponent } from './components/home/home';
import { FormulaireComponent } from './components/formulaire/formulaire';
import { AuthComponent } from './components/auth/auth';
import { RegisterComponent } from './components/register/register';
import { FormulaireUserComponent } from './components/formulaire-user/formulaire-user';

export const routes: Routes = [
        { path: '', component: HomeComponent },
        { path: 'formation', component: FormationComponent },
        { path: 'auth', component: AuthComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'user', component: UserComponent },
        { path: 'formulaire', component: FormulaireComponent },
        { path: 'formulaire-user', component: FormulaireUserComponent },
];
