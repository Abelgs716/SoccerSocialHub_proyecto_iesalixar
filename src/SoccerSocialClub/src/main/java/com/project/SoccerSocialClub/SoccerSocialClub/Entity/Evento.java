package com.project.SoccerSocialClub.SoccerSocialClub.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    @NotNull(message = "El ID del creador es obligatorio")
    private long idCreador;

    @NotNull(message = "Debe haber al menos un organizador")
    @ManyToMany
    @JoinTable(
            name = "evento_organizadores",
            joinColumns = @JoinColumn(name = "evento_id"),
            inverseJoinColumns = @JoinColumn(name = "organizador_id")
    )
    private List<Usuario> organizadores;

    @Column(name = "nombreEvento")
    @NotBlank(message = "El nombre del evento es obligatorio")
    private String nombreEvento;

    @Column(name = "fechaInicioEvento")
    @NotNull(message = "La fecha de inicio del evento es obligatoria")
    private LocalDateTime fechaInicioEvento;

    @Column(name = "descripcion")
    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    @JsonIgnore
    @ManyToMany
    private List<Usuario> usuariosInscritos;

    @Column(name = "imagen", columnDefinition = "LONGTEXT")
    private String imagen;

    @Column(name = "maxPersonas")
    @NotNull(message = "El número máximo de personas es obligatorio")
    private int maxPersonas;

    //0 no confirmado 1 confirmado -1 deshabilitado
    @Column(name="estado")
    @NotNull(message = "El estado es obligatorio")
    private int estado;

    @Column(name = "descripcionLarga")
    @NotBlank(message = "La descripción larga es obligatoria")
    private String descripcionLarga;

    @Column(name = "ubicacion")
    @NotBlank(message = "La ubicación es obligatoria")
    private String ubicacion;
}