package api.api.Auth;

import api.api.Model.User;

public class AuthResponse {

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private User user;
    private String accessToken;

    public AuthResponse(){

    }

    public AuthResponse(User user, String accessToken){
        this.user = user;
        this.accessToken = accessToken;
    }
}
