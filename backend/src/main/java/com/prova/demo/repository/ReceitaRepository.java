package com.prova.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import com.prova.demo.entity.Receita;

import lombok.NonNull;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query(value = """
            SELECT r FROM Receita r
            JOIN FETCH r.ingredientes
            """)
    List<Receita> findFetch();

    @Query(value = """
            SELECT r FROM Receita r
            JOIN FETCH r.ingredientes
            WHERE r.id = :id
            """)
    Optional<Receita> findById(@Param("id") @NonNull Long id);
}
