package com.project.SoccerSocialClub.SoccerSocialClub.Service;

import com.project.SoccerSocialClub.SoccerSocialClub.Config.EmailDTO;
import com.project.SoccerSocialClub.SoccerSocialClub.Exception.CustomException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void enviarCorreo(EmailDTO emailDTO, String url) {
        try {
            Context context = new Context();
            context.setVariable("titulo", emailDTO.getTitulo());
            context.setVariable("cuerpo", emailDTO.getCuerpo());
            context.setVariable("finalMensaje", emailDTO.getFinalMensaje());
            context.setVariable("motivo", emailDTO.getMotivo());

            if (!url.isEmpty()) {
                context.setVariable("url", url);
            }

            String cuerpoHTML = templateEngine.process("email", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(emailDTO.getDestinatario());
            helper.setSubject(emailDTO.getAsunto());
            helper.setText(cuerpoHTML, true);

            mailSender.send(message);
        }
        catch (Exception e) {
            throw new CustomException("Error al enviar el correo.");
        }
    }
}