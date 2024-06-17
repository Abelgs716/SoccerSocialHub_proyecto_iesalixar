package com.project.SoccerSocialClub.SoccerSocialClub.Config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Data
@Service
@NoArgsConstructor
public class EmailDTO {
    private String nombreApp = "SoccerSocialHub";
    private String asunto = "Tiene una notificación nueva en SoccerSocialHub.";
    private String finalMensaje = "Atentamente, " + nombreApp;
    private String urlAdmin = "http://localhost:8100/admin";
    private String UrlAdminEventos = "http://localhost:8100/admin-control-eventos";
    private String urlHome = "http://localhost:8100/home";
    private String urlRecuperarClave = "http://localhost:8100/recuperar_clave";
    private String urlLogin= "http://localhost:8100/login";
    private String destinatario;
    private String cuerpo;
    private String titulo;
    private String motivo;
}