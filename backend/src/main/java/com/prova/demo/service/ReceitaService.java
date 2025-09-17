package com.prova.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prova.demo.entity.Ingrediente;
import com.prova.demo.entity.Receita;
import com.prova.demo.repository.IngredienteRepository;
import com.prova.demo.repository.ReceitaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReceitaService {

    private final ReceitaRepository repository;
    private final IngredienteRepository ingredienteRepository;

    public List<Receita> find() {
        return repository.findFetch();
    }

    public Receita findById(final Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Receita not found"));
    }

    public void create(final Receita receita) {
        repository.save(receita);
    }

    public void update(final Receita receita) {
        findById(receita.getId());
        repository.save(receita);
    }

    public void delete(final Long id) {
        findById(id);
        repository.deleteById(id);
    }

    public Ingrediente createIngrediente(final Long id, final Ingrediente ingrediente) {
        final Receita receita = findById(id);
        receita.adicionaIngrediente(ingrediente);
        repository.save(receita);
        final Ingrediente ingredienteSaved = ingredienteRepository.save(ingrediente);
        return ingredienteSaved;
    }

    public void putIngrediente(final Long id, final Ingrediente ingrediente) {
        findIngrediente(id);
        ingredienteRepository.save(ingrediente);
    }

    public void deleteIngrediente(final Long id, final Long idIngrediente) {
        final Receita receita = findById(id);
        final Ingrediente ingrediente = findIngrediente(idIngrediente);
        receita.removeIngrediente(ingrediente);
        repository.save(receita);
    }

    private Ingrediente findIngrediente(final Long id) {
        return this.ingredienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ingrediente not found"));
    }


}
