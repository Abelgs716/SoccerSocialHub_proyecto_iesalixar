package com.project.SoccerSocialClub.SoccerSocialClub.Repository;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Role;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT t FROM Usuario t WHERE t.email = :identifier")
    Optional<Usuario> findUsuarioByEmailOrDas(@Param("identifier") String identifier);
    List<Usuario> findAllByRole(Role role);
    Optional<Usuario> findByEmail(String email);
}
