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
    
    //Acceso local
    private String urlAdmin = "http://localhost:8100/admin";
    private String UrlAdminEventos = "http://localhost:8100/admin-control-eventos";
    private String urlHome = "http://localhost:8100/home";
    private String urlRecuperarClave = "http://localhost:8100/recuperar_clave";
    private String urlLogin= "http://localhost:8100/login";

    //Acceso desplegado
    private String urlAdminDesp = "http://elasticbeanstalk-us-east-1-300878465235.s3-website-us-east-1.amazonaws.com/admin";
    private String UrlAdminEventosDes = "http://elasticbeanstalk-us-east-1-300878465235.s3-website-us-east-1.amazonaws.com/admin-control-eventos";
    private String urlHomeDes = "http://elasticbeanstalk-us-east-1-300878465235.s3-website-us-east-1.amazonaws.com/home";
    private String urlLoginDes= "http://elasticbeanstalk-us-east-1-300878465235.s3-website-us-east-1.amazonaws.com/login";
    private String destinatario;
    private String cuerpo;
    private String titulo;
    private String motivo;
}