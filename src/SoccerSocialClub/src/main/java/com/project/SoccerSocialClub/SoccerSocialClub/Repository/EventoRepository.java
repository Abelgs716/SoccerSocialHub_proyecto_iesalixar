package com.project.SoccerSocialClub.SoccerSocialClub.Repository;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
}
