import { Component, ViewChild } from '@angular/core';
import { FormationComponent } from "../formation/formation";

@Component({
  selector: 'app-home',
  imports: [FormationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  @ViewChild(FormationComponent) fils!: FormationComponent
}
