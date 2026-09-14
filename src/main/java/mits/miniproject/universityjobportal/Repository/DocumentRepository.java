package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.DocumentEntity;
import mits.miniproject.universityjobportal.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<DocumentEntity,Long> {
    List<DocumentEntity> findByStudent(StudentEntity student);
}
