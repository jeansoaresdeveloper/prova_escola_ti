import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  receitas: any[] = [
    {
      nome: 'teste',
      tempoPreparo: 2,
      custoAproximado: 12.00,
      ingredientes: [
        {
          nome: 'teste'
        },
        {
          nome: 'teste'
        },
        {
          nome: 'teste'
        }

      ]
    },
    {
      nome: 'teste',
      tempoPreparo: 2,
      custoAproximado: 12.00,
      ingredientes: [
        {
          nome: 'teste'
        },
        {
          nome: 'teste'
        },
        {
          nome: 'teste'
        }

      ]
    },

  ];

  constructor(
    private readonly service: ReceitaService
  ) {}

  ngOnInit(): void {
    // this.service.findAll()
    //   .subscribe(response => this.receitas = response);
  }

  toggleIngrediente(item: any) {
    item['open'] = !item['open'];
  }

  novo() {}

}
