import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  private _filterList: string = '';

  public get filterList(){
    return this._filterList;
  }

  public set filterList(value: string){
    this._filterList = value;
    this.eventosFiltrados = this.filterList ? this.eventFilter(this.filterList) : this.eventos;
  }

  eventFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (e:any) => e.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      e.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  imgShow(){
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
      this.eventos = response
      this.eventosFiltrados = this.eventos
    },
      error => console.log(error)
    );
  }

}
