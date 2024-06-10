package com.project.SoccerSocialClub.SoccerSocialClub.Config;

import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request ->
                        request
                                // EVENTOS
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/evento/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/evento/**").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/api/evento/**").authenticated()
                                .requestMatchers(HttpMethod.DELETE, "/api/evento/**").authenticated()
                                // TRABAJADORES
                                .requestMatchers(HttpMethod.GET, "/api/usuario/**").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/api/usuario/**").hasAnyAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.DELETE, "/api/usuario/**").hasAnyAuthority(Role.ADMIN.toString())
                                .anyRequest().authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}