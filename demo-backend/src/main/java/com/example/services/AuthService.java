package com.example.services;

import com.example.models.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public String authenticate(User user) {
        // Logic for authentication (e.g., check user credentials)
        // Generate and return a JWT token for the user
        return "dummy-jwt-token";
    }
}