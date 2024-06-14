package com.project.SoccerSocialClub.SoccerSocialClub.Service;

import com.project.SoccerSocialClub.SoccerSocialClub.Config.JwtService;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.EmailController;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.AuthResponse;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.AuthenticationRequest;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.RegisterRequest;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Role;
import com.project.SoccerSocialClub.SoccerSocialClub.Entity.Usuario;
import com.project.SoccerSocialClub.SoccerSocialClub.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final UsuarioService usuarioService;

    private final EmailController emailController;

    @Override
    public AuthResponse register(RegisterRequest request) {
        var usuario= Usuario.builder()
                .email(request.getEmail())
                .nombreUsuario(request.getNombreUsuario())
                .nombre(request.getNombre())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        usuarioRepository.save(usuario);
        var jwtToken=jwtService.generateToken(usuario);

        emailController.notificarAdmins(usuarioService.getAllAdmins());

        return AuthResponse.builder().token(jwtToken).build();
    }
    @Override
    public AuthResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getNombreUsuario(),
                        request.getPassword()
                )
        );
        var usuario= usuarioRepository.findUsuarioByEmail(request.getNombreUsuario()).orElseThrow();
        var jwtToken=jwtService.generateToken(usuario);
        return AuthResponse.builder().token(jwtToken).build();
    }
}