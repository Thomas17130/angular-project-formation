import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  imports: [],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.css',
})
export class FormulaireComponent {

  users: User[] = []
  userForm: FormGroup

  constructor() {
      this.userForm = new FormGroup({
    nom: new FormControl('', checkNomValidator),
    prenom: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z \-]{2,29}/)]),
    age: new FormControl(0, Validators.min(15)),
    adresse: new FormGroup({
      rue: new FormControl(''),
      ville: new FormControl(''),
      codePostal: new FormControl(''),
    })
  })
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      nom: 'Doe',
      adresse: {
        ville: 'Marseille'
      }
    })
  }
  afficher() {
    console.log(this.userForm); // instance de FormGroup
    console.log(this.userForm.value); //valeurs
    console.log(this.userForm.controls['nom']);
    console.log(this.userForm.get('nom'));
    console.log(this.userForm.controls['nom'].value);
    console.log(this.userForm.get('nom')?.value);
    this.users.push(this.userForm.value)
    this.userForm.reset()
  }


  public get nom() {
    return this.userForm.controls['nom']
  }

  public get prenom() {
    return this.userForm.controls['prenom']
  }

  public get age() {
    return this.userForm.controls['age']
  }
}
function checkNomValidator(formControl: { value: string | number[] | null | undefined; }) {
  if (formControl.value == null || formControl.value == undefined || formControl.value == '') {
    return {
      vide: 'Ce champ est obligatoire'
    }
  }
  if (formControl.value[0] < 'A' || formControl.value[0] > 'Z') {
    return {
      majuscule: 'Ce champ doit commencer par une majuscule'
    }
  }
  return null
}
