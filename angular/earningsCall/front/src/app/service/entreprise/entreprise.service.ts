import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entreprise } from '../../models/entreprisemodel/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor() { }

  private apiKey: string = 'cqh9bv9r01qm46d7drkgcqh9bv9r01qm46d7drl0';
  public entreprise: Entreprise = new Entreprise('test', 'test', 'test', 'test', "test");

  private entrepriseSource = new BehaviorSubject<Entreprise | null>(null);
  currentEntreprise = this.entrepriseSource.asObservable();

  changeEntreprise(entreprise: Entreprise) {
    this.entrepriseSource.next(entreprise);
  }

  async RechercherInfoEntreprise(symbol: string) {
    const earningsUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${this.apiKey}`;

    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch(earningsUrl);
          const data: CompanyInfo = await response.json();
          console.log(data)
          this.entreprise = new Entreprise(data.name,  data.logo ,symbol, "test" , data.country);
          this.changeEntreprise(this.entreprise);
          resolve(data);
        } catch (error) {
          console.error('Erreur lors de la récupération des informations de l\'entreprise:', error);
          resolve(null);
        }
      });
    });
  }
}

interface CompanyInfo {
  name: string;
  marketCapitalization: number;
  exchange: string;
  logo: string;
  country : string;
}
