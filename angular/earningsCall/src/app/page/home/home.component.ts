import { Component } from '@angular/core';
import { EarningsCallComponent} from './../../componants/earnings-call/earnings-call.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EarningsCallComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
