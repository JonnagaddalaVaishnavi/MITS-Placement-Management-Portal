package mits.miniproject.universityjobportal.Entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class DocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    private String documentType; // e.g. "RESUME", "MARKS_CARD" - kept as String per the ER diagram
    private String fileName;
    private String filePath;

    @Column(updatable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        this.uploadedAt = LocalDateTime.now();
    }

    public DocumentEntity() {
    }

    public DocumentEntity(Long id, StudentEntity student, String documentType, String fileName, String filePath, LocalDateTime uploadedAt) {
        this.id = id;
        this.student = student;
        this.documentType = documentType;
        this.fileName = fileName;
        this.filePath = filePath;
        this.uploadedAt = uploadedAt;
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

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }
}
