import { Component } from '@angular/core';
import { EarningsCallComponent } from './../../componants/earnings-call/earnings-call.component';
import { FiltreComponent } from '../../componants/filtre/filtre.component';
import { InformationComponent } from '../../componants/inforamtion/inforamtion.component'; // Utilisez le nom correct

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EarningsCallComponent, FiltreComponent, InformationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Assurez-vous que c'est styleUrls et non styleUrl
})
export class HomeComponent { }
