package com.project.SoccerSocialClub.SoccerSocialClub.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "evento")
public class Evento {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "idCreador")
    @NotNull
    private long idCreador;

    @ManyToMany
    @JoinTable(
            name = "evento_organizadores",
            joinColumns = @JoinColumn(name = "evento_id"),
            inverseJoinColumns = @JoinColumn(name = "organizador_id")
    )
    private List<Usuario> organizadores;

    @Column(name = "nombreEvento")
    @NotNull
    private String nombreEvento;

    @Column(name = "fechaInicioEvento")
    @NotNull
    private LocalDateTime fechaInicioEvento;

    @Column(name = "descripcion")
    @NotNull
    private String descripcion;
    @JsonIgnore
    @ManyToMany
    private List<Usuario> usuariosInscritos;

    @Column(name = "imagen", columnDefinition = "TEXT")
    private String imagen;

    @Column(name = "maxPersonas")
    @NotNull
    private int maxPersonas;

    //0 no confirmado 1 confirmado -1 deshabilitado
    @Column(name="estado")
    @NotNull
    private int estado;

    @Column(name = "descripcionLarga")
    @NotNull
    private String descripcionLarga;

    @Column(name = "ubicacion")
    @NotNull
    private String ubicacion;
}