import { Injectable } from '@angular/core';
import { Entreprise } from '../../models/entreprisemodel/entreprise.model';
import { addMonths, format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  constructor() { }

  public ListeEntreprise: Entreprise[] = [];

  private apiKey: string = 'cqh9bv9r01qm46d7drkgcqh9bv9r01qm46d7drl0';

  private aujourdhui: Date = new Date();
  private dateISO: string = this.aujourdhui.toISOString().split('T')[0];

  private dateDansUnMois: Date = addMonths(this.aujourdhui, 1);
  private dateFormatee: string = format(this.dateDansUnMois, 'yyyy-MM-dd');

  // Définir les dates de début et de fin pour la plage de dates souhaitée
  private startDate: string = this.dateISO;
  private endDate: string = this.dateFormatee;

  private earningsUrl = `https://finnhub.io/api/v1/calendar/earnings?from=${this.startDate}&to=${this.endDate}&token=${this.apiKey}`;

  async RechercheLesEarningCall(): Promise<void> {
    try {
      const response = await fetch(this.earningsUrl);
      const data = await response.json();

      if (data.earningsCalendar && data.earningsCalendar.length > 0) {
        // Trier les entreprises par capitalisation boursière décroissante et sélectionner les 20 premières
        const earningsWithInfo: Earning[] = await Promise.all(data.earningsCalendar.map(async (earning: Earning) => {
          const companyInfo = await this.fetchCompanyInfo(earning.symbol, 1000); // Délai de 1000ms entre chaque requête
          return { ...earning, companyInfo };
        }));

        // Trier par capitalisation boursière décroissante
        const sortedEarnings = earningsWithInfo
          .filter(item => item.companyInfo && item.companyInfo.marketCapitalization)
          .sort((a, b) => b.companyInfo!.marketCapitalization - a.companyInfo!.marketCapitalization)
          .slice(0, 60);

        this.ListeEntreprise = sortedEarnings.map(earning => {
          const companyInfo = earning.companyInfo!;
          return new Entreprise(companyInfo.name, companyInfo.logo,earning.symbol, earning.date , "test");
        });

        console.log(this.ListeEntreprise);
      } else {
        console.log('Aucune donnée d\'earnings trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }


  async RechercheLesEarningCall2(debut:Date , fin:Date): Promise<void> {
    try {
      const response = await fetch(`https://finnhub.io/api/v1/calendar/earnings?from=${debut}&to=${fin}&token=${this.apiKey}`);
      const data = await response.json();

      if (data.earningsCalendar && data.earningsCalendar.length > 0) {
        // Trier les entreprises par capitalisation boursière décroissante et sélectionner les 20 premières
        const earningsWithInfo: Earning[] = await Promise.all(data.earningsCalendar.map(async (earning: Earning) => {
          const companyInfo = await this.fetchCompanyInfo(earning.symbol, 1000); // Délai de 1000ms entre chaque requête
          return { ...earning, companyInfo };
        }));

        // Trier par capitalisation boursière décroissante
        const sortedEarnings = earningsWithInfo
          .filter(item => item.companyInfo && item.companyInfo.marketCapitalization)
          .sort((a, b) => b.companyInfo!.marketCapitalization - a.companyInfo!.marketCapitalization)
          .slice(0, 3);

        this.ListeEntreprise = sortedEarnings.map(earning => {
          const companyInfo = earning.companyInfo!;
          return new Entreprise(companyInfo.name, companyInfo.logo,earning.symbol, earning.date, 'test');
        });

        console.log(this.ListeEntreprise);
      } else {
        console.log('Aucune donnée d\'earnings trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  // Fonction pour obtenir les informations de l'entreprise à partir du symbole avec délai
  async fetchCompanyInfo(symbol: string, delay: number): Promise<CompanyInfo | null> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const companyUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${this.apiKey}`;
        try {
          const response = await fetch(companyUrl);
          const data: CompanyInfo = await response.json();
          resolve(data);
        } catch (error) {
          console.error('Erreur lors de la récupération des informations de l\'entreprise:', error);
          resolve(null);
        }
      }, delay);
    });
  }
}

interface CompanyInfo {
  name: string;
  marketCapitalization: number;
  exchange: string;
  logo: string;  // Ajouter cette ligne
}

interface Earning {
  symbol: string;
  date: string;
  hour: string;
  epsEstimate: number;
  epsActual: number;
  companyInfo?: CompanyInfo;
}
