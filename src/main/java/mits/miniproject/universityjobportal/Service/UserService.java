package mits.miniproject.universityjobportal.Service;

import mits.miniproject.universityjobportal.Entity.UserEntity;
import mits.miniproject.universityjobportal.Repository.UserRepository;
import mits.miniproject.universityjobportal.dto.request.LoginRequest;
import mits.miniproject.universityjobportal.dto.request.SignupRequest;
import mits.miniproject.universityjobportal.dto.response.UserResponse;
import mits.miniproject.universityjobportal.exception.DuplicateResourceException;
import mits.miniproject.universityjobportal.exception.InvalidCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    //Constructor injection
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public UserResponse signUp(SignupRequest signupRequest){
        if(userRepository.findByEmail(signupRequest.getEmail()).isPresent()){
            throw new DuplicateResourceException("User already exists");
        }

        UserEntity entity = new UserEntity();
        entity.setName(signupRequest.getName());
        entity.setEmail(signupRequest.getEmail());
        entity.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        entity.setPhone(signupRequest.getPhone());
        entity.setRole(signupRequest.getRole());
        entity.setActive(true);

        UserEntity user = userRepository.save(entity);

        return mapToResponse(user);
    }


    public UserResponse logIn(LoginRequest request) {
        UserEntity res = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new InvalidCredentialsException("Invalid credentials"));

        if(!passwordEncoder.matches(request.getPassword(),res.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");

        }

        return mapToResponse(res);
    }

    private UserResponse mapToResponse(UserEntity entity){
        return new UserResponse(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getRole(),
                entity.getActive(),
                entity.getCreatedAt()
        );
    }

//    public UserService()
}
