package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
}
