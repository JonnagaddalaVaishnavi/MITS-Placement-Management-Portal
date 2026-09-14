package mits.miniproject.universityjobportal.Repository;

import mits.miniproject.universityjobportal.Entity.NotificationEntity;
import mits.miniproject.universityjobportal.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity,Long> {
    List<NotificationEntity> findByUser(UserEntity user);
}
