package com.tarefas.tarefas.controller;

import com.tarefas.tarefas.model.Tarefa;
import com.tarefas.tarefas.repositories.TarefaRepository;
import com.tarefas.tarefas.services.TarefaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {
    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @PostMapping
    public ResponseEntity<Tarefa> save(@RequestBody Tarefa tarefa) {
        Tarefa tarefaCreated = tarefaService.addTarefa(tarefa);
        return new ResponseEntity<Tarefa>(tarefaCreated, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> findAll() {
        List<Tarefa> tarefas = tarefaService.findAllTarefa();
        return new ResponseEntity<>(tarefas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> findById(@PathVariable Long id) {
        Tarefa tarefa = tarefaService.findTarefaById(id);
        return new ResponseEntity<>(tarefa, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> update(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        tarefa.setId(id);
        Tarefa tarefaCreated = tarefaService.atualizarTarefa(tarefa);
        return new ResponseEntity<>(tarefaCreated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Tarefa> delete(@PathVariable Long id) {
        Tarefa tarefa = tarefaService.deleteTarefa(id);
        return new ResponseEntity<>(tarefa, HttpStatus.OK);
    }
}
