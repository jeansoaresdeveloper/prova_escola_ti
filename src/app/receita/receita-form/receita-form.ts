import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceitaService } from '../receita';

@Component({
  selector: 'app-receita-form',
  imports: [ReactiveFormsModule],
  providers: [ReceitaService],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.scss',
})
export class ReceitaForm implements OnInit {
  form: FormGroup<any> = new FormGroup({});
  ingredientForm: FormGroup<any> = new FormGroup({});

  showIngredientes = false;
  showModal = false;

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
          nome: 'Jean',
        },
        {
          id: 'teste',
          nome: 'teste',
        },
        {
          id: 'teste',
          nome: 'teste',
        },
      ]),
    });
  }

  buildFormIngredient() {
    this.ingredientForm = this.builder.group({
      id: [''],
      nome: ['']
    });
  }

  back() {
    this.router.navigate(['']);
  }

  save() {
    if (this.form.invalid) return;

    this.service.create(this.form.value).subscribe(() => this.back());
  }

  openIngredientes() {
    this.showIngredientes = !this.showIngredientes;
  }

  deletarIngrediente(id: any) {
    if (this.isEdit()) {
      this.service
        .deleteIngrediente(id)
        .subscribe(() => this.removeIngredienteById(id));
      return;
    }

    this.removeIngredienteById(id);
  }

  criarIngrediente() {
    this.buildFormIngredient();
    this.toggleModal();
  }

  editarIngrediente(item: any) {
    this.buildFormIngredient();
    this.ingredientForm.patchValue(item);
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  salvarIngrediente() {
    if (this.isEditIngredient()) {
      this.saveAndReplaceIngredient();
      return;
    }

    this.saveAndAddIngredient();
  }

  private saveAndReplaceIngredient() {
    const id = this.ingredientForm.get('id')?.value;

    if (this.isEdit()) {
      this.service.putIngrediente(id, this.ingredientForm).subscribe(() => {
        const index = this.findIndexIngredient(id);

        if (index !== -1) {
          (this.form.get('ingredientes') as FormArray).at(index).patchValue(this.ingredientForm);
        }

        this.ingredientForm.reset();
        this.toggleModal();
      });

      return;
    }

    const index = this.findIndexIngredient(id);

    if (index !== -1) {
      (this.form.get('ingredientes') as FormArray).at(index).patchValue(this.ingredientForm);
    }

    this.ingredientForm.reset();
    this.toggleModal();
  }

  private saveAndAddIngredient() {

    if (this.isEdit()) {
      this.service
        .createIngrediente(this.form.get('id')?.value, this.ingredientForm)
        .subscribe(() => {
          this.addIngredientInIngredientes();
          this.ingredientForm.reset();
          this.toggleModal();
        });

      return;
    }

    this.addIngredientInIngredientes();
    this.ingredientForm.reset();
    this.toggleModal();
  }

  private findIndexIngredient(id: any) {
    const ingredientes = this.form.get('ingredientes') as FormArray;
    return ingredientes.value.findIndex((item: any) => item.id == id);
  }

  private removeIngredienteById(id: any) {
    const index = this.findIndexIngredient(id);

    if (index !== -1) (this.form.get('ingredientes') as FormArray).removeAt(index);
  }

  private addIngredientInIngredientes() {
    (this.form.get('ingredientes') as FormArray).push(this.ingredientForm);
  }

  private isEdit() {
    return this.form.get('id')?.value;
  }

  private isEditIngredient() {
    return this.ingredientForm.get('id')?.value;
  }
}
