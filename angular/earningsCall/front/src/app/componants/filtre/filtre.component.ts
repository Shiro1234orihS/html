import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { addMonths, format } from 'date-fns';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(){
    const aujourdhui = new Date();
    const startDate: string = aujourdhui.toISOString().split('T')[0];

    const dateDansUnMois: Date = addMonths(aujourdhui, 1);
    const endDate: string = format(dateDansUnMois, 'yyyy-MM-dd');


    this.dateduJour = new FormControl(startDate);
    this.datedeFin = new FormControl(endDate);
    this.nbentreprise = new FormControl(60);
  }

}
