package com.project.SocialClub.config;

import java.util.Locale;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project.SocialClub.entities.Role;
import com.project.SocialClub.entities.Usuario;

import com.project.SocialClub.repository.UserRepository;
import com.github.javafaker.Faker;

@Profile("soccerSocialHub")
@Component
public class InitializationData implements CommandLineRunner {

    @Autowired
    private UserRepository usuarioRepository;
    
     private final boolean borrarEntidad = true; 

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
    	
    	if (borrarEntidad) {
    		usuarioRepository.deleteAll(); 
            //}
    	
    
    		// Usuario 1 - Rol USER
            Usuario usuario1 = new Usuario();
            usuario1.setFirstName("Abel");
            usuario1.setEmail("abel.garcia@gmail.com");
            usuario1.setPassword(passwordEncoder.encode("abelabel"));
            usuario1.getRoles().add(Role.ROLE_USER);
            usuarioRepository.save(usuario1);

            // Usuario 2 - Rol ADMIN
            Usuario usuario2 = new Usuario();
            usuario2.setFirstName("Paco"); 
            usuario2.setEmail("paco.perez@gmail.com");
            usuario2.setPassword(passwordEncoder.encode("1234"));
            usuario2.getRoles().add(Role.ROLE_ADMIN);
            usuarioRepository.save(usuario2);

            // Usuario 3 - Rol USER
            Usuario usuario3 = new Usuario();
            usuario3.setFirstName("Carmen");
            usuario3.setEmail("carmen.sanchez@gmail.com");
            usuario3.setPassword(passwordEncoder.encode("5678"));
            usuario3.getRoles().add(Role.ROLE_USER);
            usuarioRepository.save(usuario3);
            
            
    }
}
}

      
