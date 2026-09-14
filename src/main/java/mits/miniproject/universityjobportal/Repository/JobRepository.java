package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.CoordinatorEntity;
import mits.miniproject.universityjobportal.Entity.JobEligibilityEntity;
import mits.miniproject.universityjobportal.Entity.JobEntity;
import mits.miniproject.universityjobportal.Utility.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobEntity,Long> {
    List<JobEntity> findByStatus(Status status);
    List<JobEntity> findByCoordinator(CoordinatorEntity coordinator);
}
