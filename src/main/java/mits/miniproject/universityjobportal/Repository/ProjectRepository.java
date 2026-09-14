package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.ProjectEntity;
import mits.miniproject.universityjobportal.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity,Long> {
    List<ProjectEntity> findByStudent(StudentEntity student);
}
