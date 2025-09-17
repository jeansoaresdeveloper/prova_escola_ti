import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ReceitaService } from '../receita';

@Component({
  selector: 'app-receita-list',
  imports: [
    CommonModule
  ],
  providers: [
    ReceitaService
  ],
  templateUrl: './receita-list.html',
  styleUrl: './receita-list.scss'
})
export class ReceitaList implements OnInit {

  receitas: WritableSignal<any> = signal([]);

  constructor(
    private readonly service: ReceitaService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service.findAll()
      .subscribe(response => this.receitas.set(response));
  }

  toggleIngrediente(item: any) {
    item['open'] = !item['open'];
  }

  novo() {
    this.router.navigate(['/receita', 'new']);
  }

  editar(id: number) {
    this.router.navigate(['/receita', `${id}`]);
  }

  deletar(id: number) {
    this.service.delete(id)
      .subscribe(() => this.receitas.update(receitas => receitas.filter((receita: any) => receita.id !== id)));
  }

}
