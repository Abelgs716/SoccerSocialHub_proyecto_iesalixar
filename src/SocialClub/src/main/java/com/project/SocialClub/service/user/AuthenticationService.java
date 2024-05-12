package com.project.SocialClub.service.user;

import com.project.SocialClub.dto.request.SignUpRequest;

import com.project.SocialClub.dto.request.SigninRequest;
import com.project.SocialClub.dto.response.user.JwtAuthenticationResponse;

public interface AuthenticationService {
	
	/** REGISTRO */
    JwtAuthenticationResponse signup(SignUpRequest request);
    /** ACCESO a Token JWT */
    JwtAuthenticationResponse signin(SigninRequest request);
}
