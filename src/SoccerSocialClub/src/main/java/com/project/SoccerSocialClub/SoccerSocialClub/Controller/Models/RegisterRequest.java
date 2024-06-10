package com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String nombreUsuario;
    private String password;
    private String nombre;
    private String apellidos;
}
