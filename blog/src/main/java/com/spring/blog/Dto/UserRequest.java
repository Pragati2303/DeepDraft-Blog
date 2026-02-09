package com.spring.blog.Dto;

public class UserRequest {

   //@NotBlank(message = "Username is required")
    private String username;

   //@NotBlank(message = "Password is required")
    private String password;

    private String email;

    // getters & setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
}

