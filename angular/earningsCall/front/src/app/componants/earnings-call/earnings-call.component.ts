import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinnhubService } from '../../service/apiFinhub/finnhub.service';
import { Entreprise } from '../../models/entreprisemodel/entreprise.model';
import { EntrepriseService } from '../../service/entreprise/entreprise.service';

@Component({
  selector: 'app-earnings-call',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earnings-call.component.html',
  styleUrls: ['./earnings-call.component.scss']
})
export class EarningsCallComponent implements OnInit, AfterViewInit {

  public entreprises: Entreprise[] = [];
  public today: Date = new Date();
  public year: number = this.today.getFullYear();
  public month: number = this.today.getMonth();
  public day: number = this.today.getDate();
  public monthTag: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  public selectedDay: Date | undefined;
  public setDate: Date | undefined;
  public days: HTMLCollectionOf<HTMLTableCellElement> | undefined;
  public daysLen: number | undefined;

  constructor(private finnhubService: FinnhubService, private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.finnhubService.RechercheLesEarningCall().then(() => {
      this.entreprises = this.finnhubService.ListeEntreprise;
      this.days = document.getElementsByTagName('td');
      this.daysLen = this.days.length;
      this.draw();
    });
  }

  ngAfterViewInit(): void {
    const reset = document.getElementById('reset');
    const pre = document.getElementsByClassName('pre-button');
    const next = document.getElementsByClassName('next-button');

    pre[0].addEventListener('click', () => { this.preMonth(); });
    next[0].addEventListener('click', () => { this.nextMonth(); });
    reset?.addEventListener('click', () => { this.reset(); });

    for (let i = 0; i < this.daysLen!; i++) {
      this.days![i].addEventListener('click', () => { this.clickDay(this.days![i]); });
    }
  }

  draw(): void {
    this.getCookie('selected_day');
    this.getOptions();
    this.drawDays();
  }

  drawHeader(e?: number): void {
    const headDay = document.getElementsByClassName('head-day');
    const headMonth = document.getElementsByClassName('head-month');

    headDay[0].innerHTML = e ? e.toString() : this.day.toString();
    headMonth[0].innerHTML = this.monthTag[this.month] + " - " + this.year;
  }

  drawDays(): void {
    const startDay = new Date(this.year, this.month, 1).getDay();
    const nDays = new Date(this.year, this.month + 1, 0).getDate();
    let n = startDay;

    for (let k = 0; k < 42; k++) {
      this.days![k].innerHTML = '';
      this.days![k].id = '';
      this.days![k].className = '';
    }

    for (let i = 1; i <= nDays; i++) {
      this.days![n].innerHTML = i.toString();
      n++;
    }

    for (let j = 0; j < 42; j++) {
      if (this.days![j].innerHTML === "") {
        this.days![j].id = "disabled";
      } else if (j === this.day + startDay - 1) {
        if ((this.setDate && (this.month === this.setDate.getMonth()) && (this.year === this.setDate.getFullYear())) || (!this.setDate && (this.month === this.today.getMonth()) && (this.year === this.today.getFullYear()))) {
          this.drawHeader(this.day);
          this.days![j].id = "today";
        }
      }
      if (this.selectedDay) {
        if ((j === this.selectedDay.getDate() + startDay - 1) && (this.month === this.selectedDay.getMonth()) && (this.year === this.selectedDay.getFullYear())) {
          this.days![j].className = "selected";
          this.drawHeader(this.selectedDay.getDate());
        }
      }

      const dayDate = new Date(this.year, this.month, parseInt(this.days![j].innerHTML));
      this.entreprises.forEach(entreprise => {
        const entrepriseDate = new Date(entreprise.dateEarningsCall);
        if (dayDate.getFullYear() === entrepriseDate.getFullYear() &&
            dayDate.getMonth() === entrepriseDate.getMonth() &&
            dayDate.getDate() === entrepriseDate.getDate()) {
          const logoElement = document.createElement('img');
          logoElement.src = entreprise.image;
          logoElement.alt = entreprise.nom;
          logoElement.classList.add('icone-entreprise');
          logoElement.addEventListener('click', () => {
            this.viewEntrepriseDetails(entreprise.symbol);
          });
          this.days![j].appendChild(logoElement);
        }
      });
    }
  }

  viewEntrepriseDetails(symbol: string): void {
    this.entrepriseService.RechercherInfoEntreprise(symbol);
  }

  clickDay(o: HTMLTableCellElement): void {
    const selected = document.getElementsByClassName("selected");
    if (selected.length !== 0) {
      selected[0].className = "";
    }
    o.className = "selected";
    this.selectedDay = new Date(this.year, this.month, parseInt(o.innerHTML));
    this.drawHeader(parseInt(o.innerHTML));
    this.setCookie('selected_day', 1);
  }

  preMonth(): void {
    if (this.month < 1) {
      this.month = 11;
      this.year = this.year - 1;
    } else {
      this.month = this.month - 1;
    }
    this.drawHeader(1);
    this.drawDays();
  }

  nextMonth(): void {
    if (this.month >= 11) {
      this.month = 0;
      this.year = this.year + 1;
    } else {
      this.month = this.month + 1;
    }
    this.drawHeader(1);
    this.drawDays();
  }

  getOptions(): void {
    if (this.setDate) {
      const sets = this.setDate.toISOString().split('-');
      this.setDate = new Date(parseInt(sets[0]), parseInt(sets[1]) - 1, parseInt(sets[2]));
      this.day = this.setDate.getDate();
      this.year = this.setDate.getFullYear();
      this.month = this.setDate.getMonth();
    }
  }

  reset(): void {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
    this.day = this.today.getDate();
    this.setDate = undefined;
    this.drawDays();
  }

  setCookie(name: string, expiredays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (expiredays * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + this.selectedDay + expires + "; path=/";
  }

  getCookie(name: string): void {
    if (document.cookie.length) {
      const arrCookie = document.cookie.split(';');
      const nameEQ = name + "=";
      for (let i = 0; i < arrCookie.length; i++) {
        let c = arrCookie[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          this.selectedDay = new Date(c.substring(nameEQ.length, c.length));
        }
      }
    }
  }
}
