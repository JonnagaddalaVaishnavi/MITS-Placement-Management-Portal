package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.JobEligibilityEntity;
import mits.miniproject.universityjobportal.Entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobEligibilityRepository extends JpaRepository<JobEligibilityEntity,Long> {
    Optional<JobEligibilityEntity> findByJob(JobEntity job);
}
