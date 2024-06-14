package com.project.SoccerSocialClub.SoccerSocialClub.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Email(message = "El correo electrónico debe ser válido")
    @NotNull(message = "El correo electrónico es obligatorio")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Column(unique = true)
    private String nombreUsuario;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;



    @JsonIgnore
    @ManyToMany
    private List<Evento> eventosInscritos;

    // 0 no confirmado, 1 confirmado, -1 baneado
    @NotNull
    private int estado;

    @Enumerated(EnumType.ORDINAL)
    private Role role;

    @JsonIgnore
    @ManyToMany(mappedBy = "organizadores")
    private List<Evento> eventosOrganizados;




    public Usuario(String prueba, String email) {
        this.nombre = prueba;
        this.email = email;
    }
    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return estado != 0;
    }
}



