import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';

import {Tariff} from "./tariff";

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  constructor(private http: HttpClient) { }

  private tariffsUrl = 'api/tariffs';
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTariffs():Observable<Tariff[]> {
    return this.http.get<Tariff[]>(this.tariffsUrl)
        .pipe(
            tap(_ => console.log('tariffs received')),
            //catchError(this.handleError<Tariff[]>('getTariffs', []))
        );
  }
}
