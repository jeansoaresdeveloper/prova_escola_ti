import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private readonly URL = 'http://localhost:8080/receitas';

  constructor(
    private readonly client: HttpClient
  ) {}


  findAll() {
    return this.client.get<any>(this.URL);
  }


  findById(id: string) {
    return this.client.get<any>(`${this.URL}/${id}`);
  }


  create(body: any) {
    return this.client.post<any>(this.URL, body);
  }


  put(id: string) {
    return this.client.get<any>(`${this.URL}/${id}`);
  }

  delete(id: string) {
    return this.client.delete(`${this.URL}/${id}`);
  }

  addIngrediente(idReceita: any, body: any) {
    return this.client.post<any>(`${this.URL}/${idReceita}/ingredientes`, body);
  }

  removeIngrediente(idReceita: any, idIngrediente: any) {
    return this.client.delete<any>(`${this.URL}/${idReceita}/ingredientes/${idIngrediente}`);
  }

}
