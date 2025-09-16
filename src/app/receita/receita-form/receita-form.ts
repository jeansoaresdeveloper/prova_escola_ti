import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceitaService } from '../receita';

@Component({
  selector: 'app-receita-form',
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    ReceitaService
  ],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.scss'
})
export class ReceitaForm implements OnInit {

  form: FormGroup<any> = new FormGroup({});
  ingredientForm: FormGroup<any> = new FormGroup({});

  showIngredientes = false;

  constructor(
    private readonly service: ReceitaService,
    private readonly builder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {

    this.form = this.builder.group({
      id: [''],
      nome: [''],
      tempoPreparo: [''],
      custoAproximado: [''],
      ingredientes: this.builder.array([
        {
          id: 'teste',
          nome: 'teste',
        },
        {
          id: 'teste',
          nome: 'teste',
        },
        {
          id: 'teste',
          nome: 'teste',
        }
      ])
    });

  }

  buildFormIngredient() {
    this.ingredientForm = this.builder.group({
      id: [''],
      nome: ['']
    })
  }

  back() {
    this.router.navigate(['']);
  }

  save() {

    if (this.form.invalid) return;

    this.service.create(this.form.value)
      .subscribe();
  }

  openIngredientes() {
    this.showIngredientes = !this.showIngredientes;
  }

  editarIngrediente() {

    if (this.isEdit()) {

    }

  }

  deletarIngrediente() {

    if (this.isEdit()) {

    }
  }

  private isEdit() {
    return this.form.get('id')?.value
  }

}
