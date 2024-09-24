import { Injectable } from '@angular/core';
import { Entreprise } from '../../models/entreprisemodel/entreprise.model';
import { BehaviorSubject } from 'rxjs';
import { addMonths, format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  public ListeEntreprise: Entreprise[] = [];
  private apiKey: string = 'cqh9bv9r01qm46d7drkgcqh9bv9r01qm46d7drl0';

  // Utilisation d'un BehaviorSubject pour partager les dates
  private dateRangeSubject = new BehaviorSubject<{ startDate: string, endDate: string }>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: format(addMonths(new Date(), 1), 'yyyy-MM-dd')
  });

  // Observable qui permettra aux composants de s'abonner aux changements de dates
  public dateRange$ = this.dateRangeSubject.asObservable();

  // Permet de mettre à jour la plage de dates
  public setDateRange(startDate: string, endDate: string) {
    this.dateRangeSubject.next({ startDate, endDate });
  }

  async RechercheLesEarningCall(debut: string, fin: string): Promise<void> {
    try {
      const response = await fetch(`https://finnhub.io/api/v1/calendar/earnings?from=${debut}&to=${fin}&token=${this.apiKey}`);
      const data = await response.json();

      if (data.earningsCalendar && data.earningsCalendar.length > 0) {
        const earningsWithInfo: Earning[] = await Promise.all(data.earningsCalendar.map(async (earning: Earning) => {
          const companyInfo = await this.fetchCompanyInfo(earning.symbol, 1000);
          return { ...earning, companyInfo };
        }));

        const sortedEarnings = earningsWithInfo
          .filter(item => item.companyInfo && item.companyInfo.marketCapitalization)
          .sort((a, b) => b.companyInfo!.marketCapitalization - a.companyInfo!.marketCapitalization)
          .slice(0, 10);

        this.ListeEntreprise = sortedEarnings.map(earning => {
          const companyInfo = earning.companyInfo!;
          return new Entreprise(companyInfo.name, companyInfo.logo, earning.symbol, earning.date, "test");
        });

        console.log(this.ListeEntreprise);
      } else {
        console.log('Aucune donnée d\'earnings trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

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
  logo: string;
}

interface Earning {
  symbol: string;
  date: string;
  hour: string;
  epsEstimate: number;
  epsActual: number;
  companyInfo?: CompanyInfo;
}
