package mits.miniproject.universityjobportal.Entity;

import jakarta.persistence.*;
import mits.miniproject.universityjobportal.Utility.ApplicationStatus;

import java.time.LocalDateTime;


@Entity
// The uniqueConstraints line enforces "one application per student per job" at the DB level -
// even if your service layer logic has a bug, the database itself will reject a duplicate.
//@Table(name = "applications", uniqueConstraints = {
//        @UniqueConstraint(columnNames = {"student_id", "job_id"})
//})
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobEntity job;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(updatable = false)
    private LocalDateTime appliedAt;

    private LocalDateTime updatedAt;

    private String notes;

    @PrePersist
    protected void onCreate() {
        this.appliedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = ApplicationStatus.APPLIED; // sensible default for a brand-new application
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public ApplicationEntity() {
    }

    public ApplicationEntity(Long id, StudentEntity student, JobEntity job, ApplicationStatus status, LocalDateTime appliedAt, LocalDateTime updatedAt, String notes) {
        this.id = id;
        this.student = student;
        this.job = job;
        this.status = status;
        this.appliedAt = appliedAt;
        this.updatedAt = updatedAt;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentEntity getStudent() {
        return student;
    }

    public void setStudent(StudentEntity student) {
        this.student = student;
    }

    public JobEntity getJob() {
        return job;
    }

    public void setJob(JobEntity job) {
        this.job = job;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
