package com.prova.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prova.demo.entity.Ingrediente;
import com.prova.demo.entity.Receita;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
}
