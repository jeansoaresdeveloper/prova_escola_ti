import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-receita-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.scss'
})
export class ReceitaForm implements OnInit {

  form: FormGroup<any> = new FormGroup({});

  constructor(
    private readonly builder: UntypedFormBuilder
  ) {}

  ngOnInit() {

    this.form = this.builder.group({
      id: [''],
      nome: [''],
      tempoPreparo: [''],
    });

  }

}
