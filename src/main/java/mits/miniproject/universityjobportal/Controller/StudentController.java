package mits.miniproject.universityjobportal.Controller;

import mits.miniproject.universityjobportal.Service.StudentService;
import mits.miniproject.universityjobportal.dto.request.StudentRegisterRequest;
import mits.miniproject.universityjobportal.dto.response.StudentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<StudentResponse> register(@RequestBody StudentRegisterRequest registerRequest){
        StudentResponse response = studentService.studentRegister(registerRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getById(@PathVariable Long id){
        StudentResponse response = studentService.getByID(id);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
