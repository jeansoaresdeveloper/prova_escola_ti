import { Routes } from '@angular/router';
import { ReceitaForm } from './receita/receita-form/receita-form';
import { ReceitaList } from './receita/receita-list/receita-list';

export const routes: Routes = [
  {
    path: '',
    component: ReceitaList
  },
  {
    path: 'receita/:id',
    component: ReceitaForm
  }
];
