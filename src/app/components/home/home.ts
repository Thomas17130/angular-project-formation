import { Component, OnInit, ViewChild } from '@angular/core';
import { FormationComponent } from "../formation/formation";
import { FormationService } from '../../services/formation';
import { Formation } from '../../models/formation';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(HomeComponent) fils!: FormationComponent
  formations: Formation[] = [];

  constructor(private fs : FormationService) { }
  ngOnInit(): void {
    this.fs.getLastFormations().subscribe({
      next: res => {
        this.formations = res.content;
      }
    });
  }
}
