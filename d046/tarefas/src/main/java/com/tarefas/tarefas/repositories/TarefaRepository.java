package com.tarefas.tarefas.repositories;

import com.tarefas.tarefas.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    boolean existsByTitulo(String titulo);
}
