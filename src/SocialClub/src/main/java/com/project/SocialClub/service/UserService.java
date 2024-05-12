package com.project.SocialClub.service;

import java.util.List;




import org.springframework.security.core.userdetails.UserDetailsService;

import com.project.SocialClub.dto.response.user.UsuarioResponse;

public interface UserService {
    UserDetailsService userDetailsService();
    List<UsuarioResponse> getAllUsers();
}
