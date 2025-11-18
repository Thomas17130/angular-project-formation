import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { Formation } from '../../models/formation';
import { CommonModule } from '@angular/common';
import { FormationService } from '../../services/formation';

@Component({
  selector: 'app-formation',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './formation.html',
  styleUrl: './formation.css'
})
export class FormationComponent {
  erreur: String | null = null
  formations: Formation[] = [];
  formation: Formation = {};
  formationForm!: FormGroup;

  loading = false;
  error: string | null = null;
  isLoggedIn = false;

  constructor(private fs: FormationService) {

  }

  ajouter(form: NgForm) {
    this.formations.push({ ...this.formation });
    this.fs.addFormation(form.value)
    // this.personnes.push(form.value);
    console.log(form.value);
    // this.personne = {}
    form.reset()
  }

  // addFormation(form: NgForm) {
  //   if (this.formationForm.invalid) return;

  //   const formation: Formation = this.formationForm.value;

  //   this.formationService.addFormation(formation).subscribe({
  //     next: (created: Formation) => {
  //       this.formations.push(created);
  //       this.formationForm.reset();
  //     },
  //     error: err => {
  //     console.log('erreur')
  //     this.erreur = "le nom est obligatoire"
  //     this.erreur = "la description est obligatoire"
  //   }
  //   });
  // }

  // deleteFormation(formation: Formation): void {
  //   if (!formation.id) return;

  //   this.formationService.deleteFormation(formation.id).subscribe({
  //     next: () => {
  //       this.formations = this.formations.filter(f => f.id !== formation.id);
  //     }
  //   });
  // }
}
