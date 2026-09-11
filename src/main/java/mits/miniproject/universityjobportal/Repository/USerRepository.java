package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface USerRepository extends JpaRepository<UserEntity,Long> {
}
