package com.project.SoccerSocialClub.SoccerSocialClub.Service;

import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.AuthResponse;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.AuthenticationRequest;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);
    AuthResponse authenticate(AuthenticationRequest request);
}