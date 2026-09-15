package mits.miniproject.universityjobportal.Controller;

import jakarta.persistence.SqlResultSetMapping;
import mits.miniproject.universityjobportal.Service.JobService;
import mits.miniproject.universityjobportal.dto.request.JobCreateRequest;
import mits.miniproject.universityjobportal.dto.response.JobResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/postJob")
    public ResponseEntity<JobResponse> createJob(@RequestBody JobCreateRequest createRequest){
        JobResponse response = jobService.createJob(createRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getById(@PathVariable Long id){
        JobResponse response = jobService.getById(id);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
