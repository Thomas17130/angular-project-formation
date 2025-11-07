import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Formation } from '../../models/formation';
import { FormationService } from '../../services/formation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './formation.css'
})
export class FormationComponent implements OnInit {

  formations: Formation[] = [];
  formationForm!: FormGroup;

  loading = false;
  error: string | null = null;
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    // 🔹 Utiliser la même clé que dans AuthComponent
    // si tu fais localStorage.setItem('isConnected', 'true')
    this.isLoggedIn = localStorage.getItem('isConnected') === 'true';

    this.formationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['']
    });

    if (this.isLoggedIn) {
      this.loadFormations();
    }
  }

  loadFormations(): void {
    this.loading = true;
    this.error = null;

    this.formationService.getFormation().subscribe({
      next: (data: Formation[]) => {
        this.formations = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des formations';
        this.loading = false;
      }
    });
  }

  addFormation(): void {
    if (this.formationForm.invalid) return;

    const formation: Formation = this.formationForm.value;

    this.formationService.addFormation(formation).subscribe({
      next: (created: Formation) => {
        this.formations.push(created);
        this.formationForm.reset();
      }
    });
  }

  deleteFormation(formation: Formation): void {
    if (!formation.id) return;

    this.formationService.deleteFormation(formation.id).subscribe({
      next: () => {
        this.formations = this.formations.filter(f => f.id !== formation.id);
      }
    });
  }
}
