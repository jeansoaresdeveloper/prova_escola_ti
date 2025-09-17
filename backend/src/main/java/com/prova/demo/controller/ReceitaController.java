package com.prova.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prova.demo.entity.Ingrediente;
import com.prova.demo.entity.Receita;
import com.prova.demo.service.ReceitaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/receitas")
public class ReceitaController {

    private final ReceitaService service;

    @GetMapping
    public List<Receita> find() {
        return this.service.find();
    }

    @GetMapping("/{id}")
    public Receita find(@PathVariable final Long id) {
        return this.service.findById(id);
    }

    @PostMapping
    public void create(@RequestBody final Receita receita) {
        this.service.create(receita);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable final Long id, @RequestBody final Receita receita) {
        this.service.update(receita);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable final Long id) {
        this.service.delete(id);
    }

    @PostMapping("/{id}/ingredientes")
    public Ingrediente createIngrediente(@PathVariable Long id, @RequestBody final Ingrediente ingrediente) {
        return this.service.createIngrediente(id, ingrediente);
    }

    @PutMapping("/ingredientes/{id}")
    public void putIngrediente(@PathVariable final Long id, @RequestBody final Ingrediente ingrediente) {
        this.service.putIngrediente(id, ingrediente);
    }

    @DeleteMapping("/{id}/ingredientes/{idIngrediente}")
    public void deleteIngrediente(@PathVariable Long id, @PathVariable Long idIngrediente) {
        this.service.deleteIngrediente(id, idIngrediente);
    }
}
