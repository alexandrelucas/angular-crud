import { Product } from "./product.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";

import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl: string = "http://localhost:3001/products";
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "Fechar", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  errorHandler(e: HttpErrorResponse): Observable<any> {
    // Resposta do Servidor
    const errorMessage: string = (e.status == 0) ? 'Não foi possível se comunicar com o servidor.' : e.statusText;

    this.showMessage(errorMessage, true);
    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    // retorna um Observable
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  readById(id: number): Observable<Product> {
    const reqUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(reqUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  update(product: Product): Observable<Product> {
    const reqUrl = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(reqUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  delete(id: number): Observable<Product> {
    const reqUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(reqUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
