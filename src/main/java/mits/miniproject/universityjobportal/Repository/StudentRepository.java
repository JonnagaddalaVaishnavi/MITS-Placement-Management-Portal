package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentEntity,Long> {
}
