package com.project.SoccerSocialClub.SoccerSocialClub.Controller;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Repository.UsuarioRepository;
import com.project.SoccerSocialClub.SoccerSocialClub.Service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    EmailController emailController;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Usuario>>getAllUsuarios(){
        List<Usuario>usuario= usuarioService.getAllUsuarios();
        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }

    @GetMapping("/nuevos")
    public ResponseEntity<List<Usuario>>getAllUsuariosDesc(){
        List<Usuario>usus= usuarioService.getAllUsuariosNuevos();
        return new ResponseEntity<>(usus, HttpStatus.OK);
    }

    @GetMapping("/antiguos")
    public ResponseEntity<List<Usuario>>getAllUsuariosAsc(){
        List<Usuario>usus= usuarioService.getAllUsuariosAntiguos();
        return new ResponseEntity<>(usus, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario>getUsuarioById(@PathVariable("id")Long id){
        Usuario usuario= usuarioService.getUsuariorById(id);
        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Usuario>createUsuario(@Valid @RequestBody Usuario usuario){

        Usuario createdUsuario= usuarioService.createUsuario(usuario);
        return new ResponseEntity<>(createdUsuario,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario>updateUsuario(@Valid @PathVariable("id")Long id, @RequestBody Usuario usuario){
        Usuario updatedUsuario= usuarioService.updateUsuario(id,usuario);
        return new ResponseEntity<>(updatedUsuario,HttpStatus.OK);
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario>getUsuarioByEmail(@PathVariable("email")String email){
        Usuario usuario=usuarioService.getUsuarioByEmail(email);
        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable("id") Long id, String motivo) {
        Usuario usuario  = usuarioService.getUsuariorById(id);


        emailController.mensajeRechazo(usuario, motivo);

        usuarioService.deleteUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("updateEstado/{id}")
    public ResponseEntity<Usuario>updateEstadoUsuario(@Valid @PathVariable("id")Long id){
        Usuario usuario= usuarioService.getUsuariorById(id);

        usuario.setEstado(1);

        emailController.notificarConfirmacionCuenta(usuario);

        usuario = usuarioService.updateUsuario(id, usuario);

        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }
}