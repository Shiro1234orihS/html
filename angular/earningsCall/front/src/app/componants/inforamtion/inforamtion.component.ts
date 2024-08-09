import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepriseService } from '../../service/entreprise/entreprise.service';
import { Entreprise } from '../../models/entreprisemodel/entreprise.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inforamtion.component.html',
  styleUrls: ['./inforamtion.component.scss']
})
export class InformationComponent implements OnInit {

  public entreprise: Entreprise | null = null;

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.entrepriseService.currentEntreprise.subscribe(entreprise => {
      this.entreprise = entreprise;
    });
  }
}
