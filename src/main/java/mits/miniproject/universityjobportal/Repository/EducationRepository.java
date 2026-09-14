package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.EducationEntity;
import mits.miniproject.universityjobportal.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<EducationEntity,Long> {
    List<EducationEntity> findByStudent(StudentEntity student);
}
