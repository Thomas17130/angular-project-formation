import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() title = ''
  @Input() formation: Formation = {}
  @Output() formationChange =  new EventEmitter<Formation>();


  erreur: String | null = null
  formations: Formation[] = [];
  formationForm!: FormGroup;

  loading = false;
  error: string | null = null;
  isLoggedIn = false;

  constructor(private fs: FormationService) {}

  ajouter(form: NgForm) {
    this.formations.push({ ...this.formation });
    this.fs.addFormation(form.value)

    console.log(form.value);
 
    form.reset()
  }
  
  load(){
    this.fs.getFormation().subscribe({
       next: res => {
        localStorage.setItem('isConnected', 'true')
      },
      error: err => {
        this.error = "il n'y a pas de formations";
      }
    });
    this.formationChange.emit(this.formation)
  }
}
