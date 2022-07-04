import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'UGGuX4JasCrY5CsDcavlkC3kvUMTLJe0'
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs/'
  private _historial: string[] = []

  public resultados: Gif[] = []

  constructor(private _http: HttpClient) {
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase()
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    const params = new HttpParams()
    .set('api_key',this._apiKey)
    .set('q',query)
    .set('limit','25')
    .set('offset','0');

    this._http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, {params})
    .subscribe(
      (response) => {
        this.resultados = response.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      }
    );
  
  }


}
