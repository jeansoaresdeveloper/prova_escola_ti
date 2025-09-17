package com.prova.demo.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@ToString
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String nome;

    private Long tempoPreparo;

    private BigDecimal custoAproximado;

    @JoinColumn(name = "receita_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Ingrediente> ingredientes = new ArrayList<>();

    public void adicionaIngrediente(final Ingrediente ingrediente) {
        ingredientes.add(ingrediente);
    }

    public void removeIngrediente(final Ingrediente ingrediente) {
        ingredientes.remove(ingrediente);
    }
}
