package com.project.SoccerSocialClub.SoccerSocialClub.Controller;

import com.project.SoccerSocialClub.SoccerSocialClub.Config.EmailDTO;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Evento;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmailController {

    @Autowired
    EmailService emailService;

    public void mensajeRechazo(Usuario usuario, String motivo)
    {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setTitulo("Estimado " + usuario.getNombre() + ", tiene una notificación nueva.");
        emailDTO.setCuerpo("Su cuenta ha sido rechazada por siguiente motivo: ");
        emailDTO.setDestinatario(usuario.getEmail());
        emailDTO.setMotivo(motivo);
        emailService.enviarCorreo(emailDTO, "");
    }

    public void notificarAdmins(List<Usuario> admins) {
        for (Usuario admin : admins) {
            EmailDTO emailDTO = new EmailDTO();
            emailDTO.setTitulo("Estimado " + admin.getNombre() +", tiene una solicitud nueva de creación de cuenta.");
            emailDTO.setCuerpo("Para confirmar o rechazar la solicitud acceda a la app.");
            emailDTO.setDestinatario(admin.getEmail());
            emailService.enviarCorreo(emailDTO, emailDTO.getUrlAdmin());
        }
    }
    public void notificarAdminsEvento(List<Usuario> admins) {
        for (Usuario admin : admins) {
            EmailDTO emailDTO = new EmailDTO();
            emailDTO.setTitulo("Estimado " + admin.getNombre() + ", tiene una solicitud nueva de creación de evento.");
            emailDTO.setCuerpo("Para confirmar o rechazar la solicitud acceda a la app.");
            emailDTO.setDestinatario(admin.getEmail());
            emailService.enviarCorreo(emailDTO, emailDTO.getUrlAdminEventos());
        }
    }
    public void recuperarPassword(Usuario usuario) {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setTitulo("Estimado " + usuario.getNombre() +", tiene una notificación nueva.");
        emailDTO.setCuerpo("Si usted no ha solicitado recuperación de contraseña, ¡ignore este mensaje!\nEn caso contrario, ya puede recuperar la contraseña.");
        emailDTO.setDestinatario(usuario.getEmail());
        emailService.enviarCorreo(emailDTO, emailDTO.getUrlRecuperarClave());
    }

    public void notificarConfirmacionCuenta(Usuario usuario) {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setTitulo("Estimado " + usuario.getNombre() + ", tiene una notificación nueva.");
        emailDTO.setCuerpo("Su cuenta ha sido revisada y activada por parte de administradores de " + emailDTO.getNombreApp() + ", ya puede acceder a su cuenta.");
        emailDTO.setDestinatario(usuario.getEmail());
        emailService.enviarCorreo(emailDTO, emailDTO.getUrlLogin());
    }

    public void mensajeRechazoEvento(Evento evento, Usuario usuario, String motivo)
    {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setTitulo("Estimado " + usuario.getNombre() + ", tiene una notificación nueva.");
        emailDTO.setCuerpo("Su evento "+ evento.getNombreEvento() +" ha sido rechazado por siguiente motivo: ");
        emailDTO.setDestinatario(usuario.getEmail());
        emailDTO.setMotivo(motivo);
        emailService.enviarCorreo(emailDTO, "");
    }
    public void notificarConfirmacionEvento(Evento evento,Usuario usuario) {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setTitulo("Estimado " + usuario.getNombre() +", tiene una notificación nueva.");
        emailDTO.setCuerpo("Su evento "+ evento.getNombreEvento()+" ha sido revisado y activado por parte de administradores de " + emailDTO.getNombreApp() + ".");
        emailDTO.setDestinatario(usuario.getEmail());
        emailService.enviarCorreo(emailDTO, emailDTO.getUrlLogin());
    }


}