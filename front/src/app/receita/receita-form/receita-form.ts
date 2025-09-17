import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  ingredientes: WritableSignal<any[]> = signal([]);
  oldIngrediente: any = null;


  constructor(
    private readonly service: ReceitaService,
    private readonly builder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      id: [''],
      nome: [''],
      tempoPreparo: [''],
      custoAproximado: [''],
      ingredientes: this.builder.array([]),
    });

    const { id } = this.activatedRoute.snapshot.params;

    if (!isNaN(id)) {
      this.service.findById(id)
        .subscribe((response) => this.populateForm(response));
    }

  }

  buildFormIngredient() {
    const form = this.builder.group({
      id: [''],
      nome: ['']
    });

    return form;
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

  deletarIngrediente(ingrediente: any) {

    this.oldIngrediente = ingrediente;

    if (this.isEdit() && this.isEditIngredient()) {
      this.service
        .deleteIngrediente(this.form.get('id')?.value, ingrediente.id)
        .subscribe(() => {
          this.removeIngredienteById(ingrediente.id);
          this.oldIngrediente = null;
        });
      return;
    }

    this.removeIngredienteById(ingrediente.id, ingrediente.nome);
    this.oldIngrediente = null;
  }

  criarIngrediente() {
    this.ingredientForm = this.buildFormIngredient();
    this.toggleModal();
  }

  editarIngrediente(item: any) {
    this.oldIngrediente = item;
    this.ingredientForm = this.buildFormIngredient();
    this.ingredientForm.patchValue(item);
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  salvarIngrediente() {

    if (this.isEditIngredient()) {
      this.saveAndReplaceIngredient();
      this.oldIngrediente = null;
      return;
    }

    this.saveAndAddIngredient();
    this.oldIngrediente = null;
  }

  private saveAndReplaceIngredient() {
    const id = this.ingredientForm.get('id')?.value;
    const nome = this.ingredientForm.get('nome')?.value;
    const index = this.findIndexIngredient(id, nome);

    if (this.isEdit()) {
      this.service.putIngrediente(id, this.ingredientForm.value).subscribe(() => {

        if (index !== -1) {
          (this.form.get('ingredientes') as FormArray).at(index).patchValue({ ...this.ingredientForm.value});
          this.updateIngredientesSignal(id, this.ingredientForm.value);
        }

        this.ingredientForm.reset();
        this.toggleModal();
      });

      return;
    }

    if (index !== -1) {
      (this.form.get('ingredientes') as FormArray).at(index).patchValue({ ...this.ingredientForm.value});
      this.updateIngredientesSignal(id, this.ingredientForm.value);
    }

    this.ingredientForm.reset();
    this.toggleModal();
  }

  private saveAndAddIngredient() {

    if (this.isEdit()) {
      this.service
        .createIngrediente(this.form.get('id')?.value, this.ingredientForm.value)
        .subscribe((response) => {
          this.ingredientForm.patchValue(response);
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

  private findIndexIngredient(id: any, nome?: any) {
    console.log(id, nome);

    const ingredientes = this.form.get('ingredientes') as FormArray;
    return ingredientes.value.findIndex((item: any) => item.id == id || item.nome === nome);
  }

  private removeIngredienteById(id: any, nome?: any) {
    const index = this.findIndexIngredient(id, nome);

    if (index !== -1) {
      (this.form.get('ingredientes') as FormArray).removeAt(index);
      this.ingredientes.update(ingredientes => ingredientes.filter((unused: any, indexValue) => indexValue !== index));
    }
  }

  private addIngredientInIngredientes() {

    const form = this.buildFormIngredient();
    form.patchValue(this.ingredientForm.value);

    (this.form.get('ingredientes') as FormArray).push(form);
    this.ingredientes.update(ingredientes => [...ingredientes, this.ingredientForm.value]);
    console.log(this.ingredientes());
  }

  private isEdit() {
    return this.form.get('id')?.value;
  }

  private isEditIngredient() {
    const nameExists = this.ingredientes().findIndex(ingrediente => ingrediente.nome == this.oldIngrediente?.nome) !== -1;
    return this.ingredientForm.get('id')?.value || nameExists;
  }

  private populateForm(receita: any) {

    this.form.patchValue(receita);

    receita.ingredientes.forEach((ingrediente: any) => {
      const form = this.buildFormIngredient();
      form.patchValue(ingrediente);
      (this.form.get('ingredientes') as FormArray).push(form);
      this.ingredientes.update(ingredientes => [...ingredientes, ingrediente]);
    });

  }

  private updateIngredientesSignal(id: number, ingrediente: any) {

    this.ingredientes.update(ingredientes => {

      const index = ingredientes.findIndex(value => value.id === id);

      if (index !== -1)
        ingredientes[index] = ingrediente;

      return ingredientes;
    });


  }

}
