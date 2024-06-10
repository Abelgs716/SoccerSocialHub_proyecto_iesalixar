package com.project.SoccerSocialClub.SoccerSocialClub.Service;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Role;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Exception.CustomException;
import com.project.SoccerSocialClub.SoccerSocialClub.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public List<Usuario> getAllUsuariosNuevos() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");

        return usuarioRepository.findAll(sort);
    }

    public List<Usuario> getAllUsuariosAntiguos() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");

        return usuarioRepository.findAll(sort);
    }

    public Usuario getUsuariorById(Long id) {
        Optional<Usuario> trabajadorOptional = usuarioRepository.findById(id);
        return trabajadorOptional.orElseThrow(() -> new CustomException("El Usuario con ID " + id + " no existe"));
    }

    public List<Usuario> getAllAdmins() {
        return usuarioRepository.findAllByRole(Role.ADMIN);
    }

    public Usuario createUsuario(Usuario trabajador) {
        try {
            return usuarioRepository.save(trabajador);
        } catch (Exception e) {
            throw new CustomException("Error al crear el Usuario: " + e.getMessage());
        }
    }

    public void deleteUsuario(Long id) {
        Optional<Usuario> optionalTrabajador = usuarioRepository.findById(id);
        optionalTrabajador.orElseThrow(() -> new CustomException("El Usuario con ID " + id + " no existe"));

        usuarioRepository.deleteById(id);
    }

    public Usuario updateUsuario(Long id, Usuario trabajador) {
        Optional<Usuario> optionalTrabajador = usuarioRepository.findById(id);
        optionalTrabajador.orElseThrow(() -> new CustomException("El Usuario con ID " + id + " no existe"));

        trabajador.setId(id);

        return usuarioRepository.save(trabajador);
    }

    public Usuario getUsuarioByEmail(String email)
    {
        Optional<Usuario> optionalTrabajador = usuarioRepository.findByEmail(email);
        return optionalTrabajador.orElseThrow(() -> new CustomException("El Usuario con email " + email + " no existe"));
    }
}
