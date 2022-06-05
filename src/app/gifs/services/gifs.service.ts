import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'UGGuX4JasCrY5CsDcavlkC3kvUMTLJe0'
  private _historial: string[] = []

  public resultados: any[] = []

  constructor(private _http: HttpClient) { }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase()
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)
    }
    this._http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=25&offset=0&rating=g&lang=en`)
    .subscribe(
      (response: any) => {
        this.resultados = response.data
      }
    );
  
  }


}
