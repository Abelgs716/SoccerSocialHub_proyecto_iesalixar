package com.project.SoccerSocialClub.SoccerSocialClub.Controller;

import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.AuthResponse;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.AuthenticationRequest;
import com.project.SoccerSocialClub.SoccerSocialClub.Controller.Models.RegisterRequest;
import com.project.SoccerSocialClub.SoccerSocialClub.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse>register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse>authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }
}