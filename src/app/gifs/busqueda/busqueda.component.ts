import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent{

  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(private _gifsService: GifsService) { }

  buscar(){
    
    const v = this.txtBuscar.nativeElement.value;
    if(v.trim().length == 0){
      return;
    }
    this._gifsService.buscarGifs(v);
    this.txtBuscar.nativeElement.value = '';
  }

}
