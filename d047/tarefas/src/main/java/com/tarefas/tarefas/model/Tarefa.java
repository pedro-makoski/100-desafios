package com.tarefas.tarefas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(unique = true)
    @Length(max = 100, message = "O título deve ter no máximo 100 caracteres")
    @NotBlank(message = "Deve conter um título em pessoa")
    String titulo;

    @Length(max = 500, message = "Descrição deve conter no máximo 500 caracteres")
    String descricao;
    boolean concluida = false;
    LocalDateTime dataCriacao;

    public Tarefa(
            long id,
            String titulo,
            String descricao,
            boolean concluida,
            LocalDateTime dataCriacao
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluida = concluida;
        this.dataCriacao = dataCriacao;
    }

    public Tarefa() {this.concluida = false;}

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
    }

    public long getId() {return this.id;}
    public void setId(long id) {this.id = id;}
    public String getTitulo() {return this.titulo;}
    public void setTitulo(String titulo) {this.titulo = titulo;}
    public String getDescricao() {return this.descricao;}
    public void setDescricao(String descricao) {this.descricao = descricao;}
    public boolean isConcluida() {return this.concluida;}
    public void setConcluida(boolean concluida) {this.concluida = concluida;}
    public LocalDateTime getDataCriacao() {return this.dataCriacao;}
}
