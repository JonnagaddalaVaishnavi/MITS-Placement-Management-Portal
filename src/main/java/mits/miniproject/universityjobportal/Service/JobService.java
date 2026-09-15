package mits.miniproject.universityjobportal.Service;

import mits.miniproject.universityjobportal.Entity.CoordinatorEntity;
import mits.miniproject.universityjobportal.Entity.JobEligibilityEntity;
import mits.miniproject.universityjobportal.Entity.JobEntity;
import mits.miniproject.universityjobportal.Repository.CoordinatorRepository;
import mits.miniproject.universityjobportal.Repository.JobEligibilityRepository;
import mits.miniproject.universityjobportal.Repository.JobRepository;
import mits.miniproject.universityjobportal.Utility.Status;
import mits.miniproject.universityjobportal.dto.request.JobCreateRequest;
import mits.miniproject.universityjobportal.dto.response.JobEligibilityResponse;
import mits.miniproject.universityjobportal.dto.response.JobResponse;
import mits.miniproject.universityjobportal.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final JobEligibilityRepository jobEligibilityRepository;
    private final CoordinatorRepository coordinatorRepository;


    public JobService(JobRepository jobRepository, JobEligibilityRepository jobEligibilityRepository, CoordinatorRepository coordinatorRepository) {
        this.jobRepository = jobRepository;
        this.jobEligibilityRepository = jobEligibilityRepository;
        this.coordinatorRepository = coordinatorRepository;
    }

    public JobResponse createJob(JobCreateRequest request){
        CoordinatorEntity coordinator = coordinatorRepository.findById(request.getCoordinatorId()).orElseThrow(()-> new ResourceNotFoundException("No coordinator fount with id :"+request.getCoordinatorId()));

        JobEntity entity = new JobEntity();
        entity.setCoordinatorId(coordinator);
        entity.setTitle(request.getTitle());
        entity.setCompanyName(request.getCompanyName());
        entity.setDescription(request.getDescription());
        entity.setLocation(request.getLocation());
        entity.setSalary(request.getSalary());
        entity.setApplicationStartDate(request.getApplicationStartDate());
        entity.setApplicationEndDate(request.getApplicationEndDate());
        entity.setStatus(Status.PUBLISHED);

        JobEntity saveJob = jobRepository.save(entity);

        JobEligibilityEntity eligibility = new JobEligibilityEntity();
        eligibility.setJob(saveJob);
        eligibility.setMinCgpa(request.getEligibility().getMinCgpa());
        eligibility.setMaxBacklogs(request.getEligibility().getMaxBacklogs());
        eligibility.setGraduationYear(request.getEligibility().getGraduationYear());
        eligibility.setAdditionalCriteria(request.getEligibility().getAdditionalCriteria());
        eligibility.setEligibleDepartments(request.getEligibility().getEligibleDepartments());


        JobEligibilityEntity saveEligibility = jobEligibilityRepository.save(eligibility);

        return mapToResponse(saveJob,saveEligibility);

    }

    public JobResponse getById(Long id){
        JobEntity job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No job found with id: "+id));
        JobEligibilityEntity eligibility = jobEligibilityRepository.findByJob(job).orElseThrow(() -> new ResourceNotFoundException("No eligibility criteria found for job id: "+id));

        return mapToResponse(job,eligibility);
    }

    private JobResponse mapToResponse(JobEntity job, JobEligibilityEntity eligibility) {
        JobEligibilityResponse eligibilityResponse = new JobEligibilityResponse(
                eligibility.getMinCgpa(),
                eligibility.getMaxBacklogs(),
                eligibility.getEligibleDepartments(),
                eligibility.getGraduationYear(),
                eligibility.getAdditionalCriteria()
        );

        return new JobResponse(
                job.getId(),
                job.getCoordinatorId().getUser().getName(),
                job.getCoordinatorId().getDepartment(),
                job.getTitle(),
                job.getCompanyName(),
                job.getDescription(),
                job.getLocation(),
                job.getSalary(),
                job.getApplicationStartDate(),
                job.getApplicationEndDate(),
                job.getStatus(),
                eligibilityResponse
        );
    }
}
