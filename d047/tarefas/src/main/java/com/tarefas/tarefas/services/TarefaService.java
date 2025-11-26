package com.tarefas.tarefas.services;

import com.tarefas.tarefas.exceptions.TarefaNaoEncontradaException;
import com.tarefas.tarefas.model.Tarefa;
import com.tarefas.tarefas.repositories.TarefaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TarefaService {
    public final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public Tarefa addTarefa(Tarefa tarefa) {
        if(tarefaRepository.existsByTitulo(tarefa.getTitulo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um item com este título");
        }

        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> findAllTarefa() {
        return tarefaRepository.findAll();
    }

    public Tarefa findTarefaById(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa não encontrada"));
    }

    public Tarefa atualizarTarefa(Tarefa newTarefa) {
        Tarefa tarefa = tarefaRepository.findById(newTarefa.getId())
                .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa não encontrada"));

        if(!tarefa.getTitulo().equals(newTarefa.getTitulo()) && tarefaRepository.existsByTitulo(newTarefa.getTitulo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma tarefa com este título");
        }

        tarefa.setTitulo(newTarefa.getTitulo());
        tarefa.setDescricao(newTarefa.getDescricao());
        tarefa.setConcluida(newTarefa.isConcluida());

        return tarefaRepository.save(tarefa);
    }

    public Tarefa deleteTarefa(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException(
                        "Tarefa não encontrada!"
                ));

        tarefaRepository.delete(tarefa);

        return tarefa;
    }
}
