import { Component, signal } from '@angular/core';
import { ReceitaForm } from './receita/receita-form/receita-form';
import { ReceitaList } from './receita/receita-list/receita-list';

@Component({
  selector: 'app-root',
  imports: [ReceitaForm, ReceitaList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front');
}
