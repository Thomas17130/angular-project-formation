import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "./components/menu/menu";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, MenuComponent, ]
})
export class App {

  
}