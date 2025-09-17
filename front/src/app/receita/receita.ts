import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private readonly URL = 'http://localhost:8080/api/receitas';

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

  put(id: number, body: any) {
    return this.client.put<any>(`${this.URL}/${id}`, body);
  }

  delete(id: number) {
    return this.client.delete(`${this.URL}/${id}`);
  }

  createIngrediente(idReceita: number, body: any) {
    return this.client.post<any>(`${this.URL}/${idReceita}/ingredientes`, body);
  }

  putIngrediente(id: number, body: any) {
    return this.client.put<any>(`${this.URL}/ingredientes/${id}`, body);
  }

  deleteIngrediente(id: number, idIngrediente: number) {
    return this.client.delete<any>(`${this.URL}/${id}/ingredientes/${idIngrediente}`);
  }

}
