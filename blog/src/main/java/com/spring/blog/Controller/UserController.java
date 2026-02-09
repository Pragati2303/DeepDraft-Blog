package com.spring.blog.Controller;

import com.spring.blog.Dto.UserRequest;
import com.spring.blog.Dto.UserResponse;
import com.spring.blog.Security.JwtUtil;
import com.spring.blog.Services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService,
            JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // ===================== REGISTER =====================
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @RequestBody UserRequest request) {

        UserResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    // ===================== LOGIN =====================
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody UserRequest request) {

        // 1. Validate credentials
        String username = userService.login(
                request.getUsername(),
                request.getPassword());

        // 2. Generate JWT
        String token = jwtUtil.generateToken(username);

        return ResponseEntity.ok(token);
    }
}
