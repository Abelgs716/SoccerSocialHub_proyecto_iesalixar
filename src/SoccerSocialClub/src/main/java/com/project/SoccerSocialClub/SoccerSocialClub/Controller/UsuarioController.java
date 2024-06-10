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
    public ResponseEntity<List<Usuario>>getAlltrabajadores(){
        List<Usuario>usuario= usuarioService.getAllUsuarios();
        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }

    @GetMapping("/nuevos")
    public ResponseEntity<List<Usuario>>getAllTrabajadoresDesc(){
        List<Usuario>usus= usuarioService.getAllUsuariosNuevos();
        return new ResponseEntity<>(usus, HttpStatus.OK);
    }

    @GetMapping("/antiguos")
    public ResponseEntity<List<Usuario>>getAllTrabajadoresAsc(){
        List<Usuario>usus= usuarioService.getAllUsuariosAntiguos();
        return new ResponseEntity<>(usus, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario>getTrabajadorById(@PathVariable("id")Long id){
        Usuario trabajador= usuarioService.getUsuariorById(id);
        return new ResponseEntity<>(trabajador,HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Usuario>createTrabajador(@Valid @RequestBody Usuario trabajador){

        Usuario createdTrabajador= usuarioService.createUsuario(trabajador);
        return new ResponseEntity<>(createdTrabajador,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario>updateTrabajador(@Valid @PathVariable("id")Long id, @RequestBody Usuario trabajador){
        Usuario updatedTrabajador= usuarioService.updateUsuario(id,trabajador);
        return new ResponseEntity<>(updatedTrabajador,HttpStatus.OK);
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario>getTrabajadorByEmail(@PathVariable("email")String email){
        Usuario trabajador=usuarioService.getUsuarioByEmail(email);
        return new ResponseEntity<>(trabajador,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrabajador(@PathVariable("id") Long id, String motivo) {
        Usuario trabajador  = usuarioService.getUsuariorById(id);


        emailController.mensajeRechazo(trabajador, motivo);

        usuarioService.deleteUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("updateEstado/{id}")
    public ResponseEntity<Usuario>updateEstadoTrabajador(@Valid @PathVariable("id")Long id){
        Usuario trabajador= usuarioService.getUsuariorById(id);

        trabajador.setEstado(1);

        emailController.notificarConfirmacionCuenta(trabajador);

        trabajador = usuarioService.updateUsuario(id, trabajador);

        return new ResponseEntity<>(trabajador,HttpStatus.OK);
    }
}