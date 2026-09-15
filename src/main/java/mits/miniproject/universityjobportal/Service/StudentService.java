package mits.miniproject.universityjobportal.Service;

import mits.miniproject.universityjobportal.Entity.StudentEntity;
import mits.miniproject.universityjobportal.Entity.UserEntity;
import mits.miniproject.universityjobportal.Repository.StudentRepository;
import mits.miniproject.universityjobportal.Repository.UserRepository;
import mits.miniproject.universityjobportal.Utility.Role;
import mits.miniproject.universityjobportal.dto.request.StudentRegisterRequest;
import mits.miniproject.universityjobportal.dto.response.StudentResponse;
import mits.miniproject.universityjobportal.exception.DuplicateResourceException;
import mits.miniproject.universityjobportal.exception.InvalidRoleException;
import mits.miniproject.universityjobportal.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;


    public StudentService(StudentRepository studentRepository, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    public StudentResponse studentRegister(StudentRegisterRequest registerRequest){
        UserEntity user = userRepository.findById(registerRequest.getUserId()).orElseThrow(()-> new ResourceNotFoundException("No user found with id: "+registerRequest.getUserId()));
        if(user.getRole() != Role.STUDENT){
            throw new InvalidRoleException("User with id "+registerRequest.getUserId()+" is not registered as student");
        }
        if(studentRepository.findById(registerRequest.getUserId()).isPresent()){
            throw new DuplicateResourceException("A student profile with id "+registerRequest.getUserId()+" already exists");
        }

        StudentEntity student = new StudentEntity();
        student.setUser(user);
        student.setUsn(registerRequest.getUsn());
        student.setDepartment(registerRequest.getDepartment());
        student.setCgpa(registerRequest.getCgpa());
        student.setBacklogs(registerRequest.getBacklogs());
        student.setGraduationYear(registerRequest.getGraduationYear());

        StudentEntity savedStudent = studentRepository.save(student);

        return mapToResponse(savedStudent);
    }

    public StudentResponse getByID(Long id){
        StudentEntity entity = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No student found with id: "+id ));
        return mapToResponse(entity);
    }

    private StudentResponse mapToResponse(StudentEntity student) {
        UserEntity user = student.getUser();
        return new StudentResponse(
                student.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                student.getUsn(),
                student.getDepartment(),
                student.getCgpa(),
                student.getBacklogs(),
                student.getGraduationYear()
        );
    }
}
