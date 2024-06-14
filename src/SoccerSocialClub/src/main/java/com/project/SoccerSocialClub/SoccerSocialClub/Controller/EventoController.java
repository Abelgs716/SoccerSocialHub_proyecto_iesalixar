package com.project.SoccerSocialClub.SoccerSocialClub.Controller;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Evento;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Service.EventoService;
import com.project.SoccerSocialClub.SoccerSocialClub.Service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/evento")
public class EventoController {
    @Autowired
    private EventoService eventoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmailController emailController;

    @GetMapping
    public ResponseEntity<List<Evento>>getAllEventos(){
        List<Evento>evento=eventoService.getAllEventos();
        return new ResponseEntity<>(evento, HttpStatus.OK);
    }

    @GetMapping("/nuevos")
    public ResponseEntity<List<Evento>>getAllEventosDesc(){
        List<Evento>evento=eventoService.getAllEventosFechaNuevos();
        return new ResponseEntity<>(evento, HttpStatus.OK);
    }

    @GetMapping("/antiguos")
    public ResponseEntity<List<Evento>>getAllEventosAsc(){
        List<Evento>evento=eventoService.getAllEventosFechaAntiguos();
        return new ResponseEntity<>(evento, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento>getEventoById(@PathVariable("id")Long id){
        Evento evento=eventoService.getEventoById(id);
        return new ResponseEntity<>(evento,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Evento> createEvento(@Valid @RequestBody Evento evento) {
        try {
            // Validar que los campos requeridos no estén vacíos
            if (evento.getNombreEvento().trim().isEmpty() ||
                    evento.getDescripcion().trim().isEmpty() ||
                    evento.getDescripcionLarga().trim().isEmpty() ||
                    evento.getUbicacion().trim().isEmpty() ||
                    evento.getMaxPersonas() <= 0 ||
                    evento.getFechaInicioEvento() == null) {

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            // Crear el evento
            Evento createdEvento = eventoService.createEvento(evento);

            // Obtener la lista de administradores y enviar notificaciones
            List<Usuario> admins = usuarioService.getAllAdmins();
            if (admins.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            } else {
                emailController.notificarAdminsEvento(admins);
            }

            return new ResponseEntity<>(createdEvento, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento>updateEvento(@Valid @PathVariable("id")Long id, @RequestBody Evento evento){
        Evento updateEvento=eventoService.updateEvento(id,evento);
        return new ResponseEntity<>(updateEvento,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvento(@PathVariable("id") Long id) {
        Evento evento = eventoService.getEventoById(id);

        if (evento != null) {
            // Desasociar el evento de los usuarios
            for (Usuario organizador : evento.getOrganizadores()) {
                organizador.getEventosOrganizados().remove(evento);
            }

            for (Usuario usuario : evento.getUsuariosInscritos()) {
                usuario.getEventosInscritos().remove(evento);
            }

            eventoService.deleteEvento(id);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/unirse")
    public ResponseEntity<?> unirseEvento(@RequestBody Map<String, Object> request) {
        try {
            Long idEvento = Long.parseLong(request.get("idEvento").toString());
            String email = request.get("email").toString();

            boolean yaInscrito = eventoService.yaInscritoEnEvento(email, idEvento);
            if (yaInscrito) {
                return ResponseEntity.badRequest().body("El usuario ya está inscrito en este evento.");
            } else {
                eventoService.unirseEvento(idEvento, email);
                return ResponseEntity.ok().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("El ID del evento no es válido.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/desapuntarse")
    public ResponseEntity<?> desapuntarseEvento(@RequestBody Map<String, Object> request) {
        try {
            Long idEvento = Long.parseLong(request.get("idEvento").toString());
            String email = request.get("email").toString();

            eventoService.desapuntarseEvento(idEvento, email);
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("El ID del evento no es válido.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/usuarios_inscritos/{id}")
    public ResponseEntity<List<Usuario>>getUsuariosInscritosById(@PathVariable Long id){
        Evento evento=eventoService.getEventoById(id);
        return new ResponseEntity<>(evento.getUsuariosInscritos() ,HttpStatus.OK);
    }

    @PutMapping("updateEstado/{id}")
    public ResponseEntity<Evento>updateEstadoEvento(@Valid @PathVariable("id")Long id){
        Evento evento=eventoService.getEventoById(id);
        Usuario usuario= usuarioService.getUsuariorById(evento.getIdCreador());
        evento.setEstado(1);
        emailController.notificarConfirmacionEvento(evento,usuario);
        evento=eventoService.updateEvento(id,evento);
        return new ResponseEntity<>(evento,HttpStatus.OK);
    }

    @PutMapping("/rechazarEvento/{id}")
    public ResponseEntity<Evento>rechazarEvento(@PathVariable("id") Long id, String motivo) {
        Evento evento = eventoService.getEventoById(id);
        Usuario usuario= usuarioService.getUsuariorById(evento.getIdCreador());
        emailController.mensajeRechazoEvento(evento,usuario ,motivo);
        evento.setEstado(-1);
        evento=eventoService.updateEvento(id,evento);
        return new ResponseEntity<>(evento,HttpStatus.OK);
    }
    @GetMapping("/{idEvento}/organizadores")
    public ResponseEntity<List<Usuario>> getOrganizadores(@PathVariable Long idEvento) {
        List<Usuario> organizadores = eventoService.getOrganizadoresByEventoId(idEvento);
        return new ResponseEntity<>(organizadores, HttpStatus.OK);
    }
}