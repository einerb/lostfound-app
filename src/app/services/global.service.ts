import jwt_decode from 'jwt-decode';

import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Api } from "../shared/api/api";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  private headers;
  private options;
  private httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "",
      }),
    };
  }

  /**
   * @description Manejo de errores en las peticiones.
   */
  private handleError(error: HttpErrorResponse) {
    const stylesLogErrors = `
      background: linear-gradient(#a30b34, #571402);
      border: 1px solid #3E0E02;
      color: white;
      display: block;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.4) inset,
        0 5px 3px -5px rgba(0, 0, 0, 0.5),
        0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset;
      text-align: center;
      font-weight: bold;
    `;

    if (!Api.PRODUCTION) {
      // console.log(`%c handleError %c ${window['emoticons'].bomb}`, stylesLogErrors, 'padding-left: 10px; font-size: 20px;');
      console.log(error);
      // console.log('%c End HandleError', stylesLogErrors);
    }

    return throwError({
      code: error.statusText,
      message: error.error.message ? error.error.message : error.error.message,
      handleError: true,
      error: error.error,
    });
  }

  /**
   * @description Obtener token de autententication
   * @returns String
   */
  public getToken() {
    return localStorage.getItem("token");
  }

  public getDecodedToken() {
    return jwt_decode(localStorage.getItem("token"));
  }

  /**
   * @description Obtener cabecera por defecto
   * @return HttpHeaders {any}
   */
  getHeader() {
    const token = "Bearer " + this.getToken();
    this.httpOptions.headers.Authorization = token;
    return this.httpOptions;
  }

  /**
   * @description Peticiones por el metodo post
   * @param url string
   * @param data Object
   * @param header? HttpHeaders
   * @return Observable
   */
  post(url: string, data?: any, headerOptions?: any): Observable<any> {
    return this.httpClient
      .post(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo GET
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  get(url: string, headerOptions?: any): Observable<any> {
    return this.httpClient
      .get(url, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo PUT
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  put(url: string, data?: any, headerOptions?: any): Observable<any> {
    return this.httpClient
      .put(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo DEL
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  delete(url: string, headerOptions?: any): Observable<any> {
    return this.httpClient
      .delete(url, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }
}
