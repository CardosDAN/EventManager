package api.api.Auth;

import javax.validation.Valid;


import api.api.Model.User;
import api.api.Repository.RoleRepository;
import api.api.Repository.UserRepository;
import api.api.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;


@RestController
public class AuthApi {
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtTokenUtil jwtUtil;

    @Autowired
    UserService userService;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/publisher/authenticate")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword())
            );

            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user, accessToken);

            return ResponseEntity.ok().body(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/publisher/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setCreation_date(Date.valueOf(java.time.LocalDate.now()));


        user.addRole(roleRepository.findByName("ROLE_USER"));

        userService.save(user);
        return ResponseEntity.ok(user);
    }

}
