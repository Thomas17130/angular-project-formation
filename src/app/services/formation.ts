import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/formation';
import { environment } from '../../environnement/environnement.devlopments'; // à vérifier aussi

interface Page {
  content: Formation[];
  size: number;
}

@Injectable({
  providedIn: 'root'
})

export class FormationService {

  path = 'formations'; // par exemple

  constructor(private http: HttpClient) {}

  // Récupérer les formations de l'utilisateur connecté
  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${environment.BACKEND_URL}/${this.path}`);
  }
  // Récupérer les formations de l'utilisateur connecté
  getLastFormations(): Observable<Page> {
    return this.http.get<Page>(`${environment.BACKEND_URL}/${this.path}/latest`);
  }

  // Ajouter une formation
  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${environment.BACKEND_URL}/${this.path}/add`, formation)
  }

  // Supprimer une formation
  deleteFormation(id: number): Observable<Formation> {
    return this.http.delete<Formation>(`${environment.BACKEND_URL}/${this.path}/${id}`);
  }
}
