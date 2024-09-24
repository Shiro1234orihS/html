import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { addMonths, format } from 'date-fns';
import { ReactiveFormsModule } from '@angular/forms';
import { FinnhubService } from '../../service/apiFinhub/finnhub.service';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent {

  public dateduJour: FormControl;
  public datedeFin: FormControl;
  public nbentreprise: FormControl;

  constructor( private finnhubService: FinnhubService){
    const aujourdhui = new Date();
    const startDate: string = aujourdhui.toISOString().split('T')[0];

    const dateDansUnMois: Date = addMonths(aujourdhui, 1);
    const endDate: string = format(dateDansUnMois, 'yyyy-MM-dd');


    this.dateduJour = new FormControl(startDate);
    this.datedeFin = new FormControl(endDate);
    this.nbentreprise = new FormControl(60);
  }

  // Fonction appelée lorsque l'utilisateur clique sur le bouton pour rechercher des entreprises
  chercheentreprise() {
    const startDate = this.dateduJour.value;  // Date de début
    const endDate = this.datedeFin.value;     // Date de fin
    const nb = this.nbentreprise.value;
    // Utilisation du service pour mettre à jour la plage de dates
    this.finnhubService.setDateRange(startDate, endDate ,nb );
  }
}


    



 
