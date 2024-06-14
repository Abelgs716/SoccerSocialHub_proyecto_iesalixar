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
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        return usuarioOptional.orElseThrow(() -> new CustomException("El Usuario con ID " + id + " no existe"));
    }

    public List<Usuario> getAllAdmins() {
        return usuarioRepository.findAllByRole(Role.ADMIN);
    }

    public Usuario createUsuario(Usuario usuario) {
        try {
            return usuarioRepository.save(usuario);
        } catch (Exception e) {
            throw new CustomException("Error al crear el Usuario: " + e.getMessage());
        }
    }

    public void deleteUsuario(Long id) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        optionalUsuario.orElseThrow(() -> new CustomException("El Usuario con ID " + id + " no existe"));

        usuarioRepository.deleteById(id);
    }

    public Usuario updateUsuario(Long id, Usuario usuario) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        optionalUsuario.orElseThrow(() -> new CustomException("El Usuario con ID " + id + " no existe"));

        usuario.setId(id);

        return usuarioRepository.save(usuario);
    }

    public Usuario getUsuarioByEmail(String email)
    {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        return optionalUsuario.orElseThrow(() -> new CustomException("El Usuario con email " + email + " no existe"));
    }
}
