import { Component } from '@angular/core';
import { EarningsCallComponent} from './../../componants/earnings-call/earnings-call.component'
import { FiltreComponent } from '../../componants/filtre/filtre.component';
import { InforamtionComponent } from '../../componants/inforamtion/inforamtion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EarningsCallComponent , FiltreComponent ,InforamtionComponent] ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
