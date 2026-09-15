package mits.miniproject.universityjobportal.Service;

import mits.miniproject.universityjobportal.Entity.CoordinatorEntity;
import mits.miniproject.universityjobportal.Entity.UserEntity;
import mits.miniproject.universityjobportal.Repository.CoordinatorRepository;
import mits.miniproject.universityjobportal.Repository.UserRepository;
import mits.miniproject.universityjobportal.Utility.Role;
import mits.miniproject.universityjobportal.dto.request.CoordinatorRegisterRequest;
import mits.miniproject.universityjobportal.dto.response.CoordinatorResponse;
import mits.miniproject.universityjobportal.exception.DuplicateResourceException;
import mits.miniproject.universityjobportal.exception.InvalidRoleException;
import mits.miniproject.universityjobportal.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CoordinatorService {

    private final CoordinatorRepository coordinatorRepository;
    private final UserRepository userRepository;

    public CoordinatorService(CoordinatorRepository coordinatorRepository, UserRepository userRepository) {
        this.coordinatorRepository = coordinatorRepository;
        this.userRepository = userRepository;
    }

    public CoordinatorResponse register(CoordinatorRegisterRequest registerRequest){
        UserEntity entity = userRepository.findById(registerRequest.getUserId()).orElseThrow(()-> new ResourceNotFoundException("No user found with id: "+registerRequest.getUserId()));

        if(entity.getRole() != Role.COORDINATOR){
            throw new InvalidRoleException("User with id "+registerRequest.getUserId()+" is not registered as a coordinator");
        }

        if(coordinatorRepository.findById(registerRequest.getUserId()).isPresent()){
            throw new DuplicateResourceException("A coordinator profile already exists for user id: "+registerRequest.getUserId());
        }

        CoordinatorEntity coordinator = new CoordinatorEntity();
        coordinator.setUser(entity);
        coordinator.setDepartment(registerRequest.getDepartment());
        coordinator.setDesignation(registerRequest.getDesignation());

        CoordinatorEntity coordinatorEntity = coordinatorRepository.save(coordinator);

        return mapToResponse(coordinatorEntity);
    }

    public CoordinatorResponse getById(Long id){
        CoordinatorEntity coordinator = coordinatorRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No coordinator dound with id: "+id));
        return mapToResponse(coordinator);
    }

    private CoordinatorResponse mapToResponse(CoordinatorEntity coordinator) {
        UserEntity user = coordinator.getUser();
        return new CoordinatorResponse(
                coordinator.getId(),
                user.getName(),
                user.getEmail(),
                coordinator.getDepartment(),
                coordinator.getDesignation()
        );
    }
}
