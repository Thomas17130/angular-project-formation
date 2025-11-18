import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';


@Component({
  selector: 'app-form-personne',
  imports: [FormsModule],
  templateUrl: './formulaire-user.html',
  styleUrl: './formulaire-user.css'
})
export class FormulaireUserComponent {
  @Input() title = ''
  @Input() personne: User = {}
  @Output() personneChange = new EventEmitter<User>();


  enregistrer(form: NgForm) {
    this.personneChange.emit(this.personne)
    form.reset()

  }
}
