package com.project.SoccerSocialClub.SoccerSocialClub.Service;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Evento;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Exception.CustomException;
import com.project.SoccerSocialClub.SoccerSocialClub.Repository.EventoRepository;
import com.project.SoccerSocialClub.SoccerSocialClub.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Evento>getAllEventos(){
        return eventoRepository.findAll();
    }

    public List<Evento> getAllEventosFechaNuevos() {
        Sort sort = Sort.by(Sort.Direction.DESC, "fechaInicioEvento");

        return eventoRepository.findAll(sort);
    }

    public List<Evento> getAllEventosFechaAntiguos() {
        Sort sort = Sort.by(Sort.Direction.ASC, "fechaInicioEvento");

        return eventoRepository.findAll(sort);
    }

    public Evento getEventoById(Long id) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        return optionalEvento.orElseThrow(() -> new CustomException("El evento con ID " + id + " no existe"));

    }

    public Evento createEvento(Evento evento){
        try
        {
            return eventoRepository.save(evento);
        }catch (Exception e){
            throw new CustomException("Error al crear el evento: " + e.getMessage());
        }
    }

    public void deleteEvento(Long id){
        try
        {
            eventoRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e)
        {
            throw new CustomException("El evento con ID " +id + " no existe");
        }
        catch (Exception e)
        {
            throw new CustomException("Error al eliminar el evento " + e.getMessage());
        }
    }

    public Evento updateEvento(Long id, Evento evento)
    {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        optionalEvento.orElseThrow(() -> new CustomException("El evento con ID " + id + " no existe"));

        evento.setId(id);

        try
        {
            return eventoRepository.save(evento);
        }
        catch (Exception e)
        {
            throw new CustomException("Error al actualizar el evento: " + e.getMessage());
        }
    }
    public void unirseEvento(Long idEvento, String email) {
        // Obtener el evento por su ID
        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new CustomException("El evento con ID " + idEvento + " no existe"));

        // Obtener el usuario por su email
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("El usuario con email " + email + " no existe"));

        // Agregar el usuario al evento
        evento.getUsuariosInscritos().add(usuario);
        usuario.getEventosInscritos().add(evento);
        eventoRepository.save(evento);
        usuarioRepository.save(usuario);
    }

    public boolean yaInscritoEnEvento(String email, Long idEvento) {
        Optional<Evento> optionalEvento = eventoRepository.findById(idEvento);
        optionalEvento.orElseThrow(() -> new CustomException("El evento con ID " + idEvento + " no existe"));

        Evento evento = optionalEvento.get();

        List<Usuario> usuariosInscritosInscritos = evento.getUsuariosInscritos();

        for (Usuario usuario : usuariosInscritosInscritos) {
            if (usuario.getEmail().equals(email)) {
                return true;
            }
        }
        return false;
    }

    public void desapuntarseEvento(Long idEvento, String email) {
        // Obtener el evento por su ID
        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new CustomException("El evento con ID " + idEvento + " no existe"));

        // Obtener el usuario por su email
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("El usuario con email " + email + " no existe"));

        // Eliminar el usuario del evento
        evento.getUsuariosInscritos().remove(usuario);
        usuario.getEventosInscritos().remove(evento);

        eventoRepository.save(evento);
        usuarioRepository.save(usuario);
    }
    public List<Usuario> getOrganizadoresByEventoId(Long idEvento) {
        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new CustomException("El evento con ID " + idEvento + " no existe"));
        return evento.getOrganizadores();
    }
}