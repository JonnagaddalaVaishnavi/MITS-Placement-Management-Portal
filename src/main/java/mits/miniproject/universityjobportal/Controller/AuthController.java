package mits.miniproject.universityjobportal.Controller;

import mits.miniproject.universityjobportal.Service.UserService;
import mits.miniproject.universityjobportal.dto.request.LoginRequest;
import mits.miniproject.universityjobportal.dto.request.SignupRequest;
import mits.miniproject.universityjobportal.dto.response.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest signupRequest){
        UserResponse response = service.signUp(signupRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest loginRequest){
        UserResponse response = service.logIn(loginRequest);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
