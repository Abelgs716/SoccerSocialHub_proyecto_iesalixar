package com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest
{
    private String nombreUsuario;
    private String password;
}
