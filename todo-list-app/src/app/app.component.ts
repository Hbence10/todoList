import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // This is the main component of the application. If you check the HTML file, it contains the navigation bar, and the
  // <router-outlet> where the other pages' contents get rendered.
}
