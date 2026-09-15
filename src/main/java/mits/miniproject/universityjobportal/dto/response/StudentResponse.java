package mits.miniproject.universityjobportal.dto.response;

import java.math.BigDecimal;

public class StudentResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String usn;
    private String department;
    private BigDecimal cgpa;
    private int backlogs;
    private int graduationYear;

    public StudentResponse() {
    }

    public StudentResponse(Long id, String name, String email, String phone, String usn, String department, BigDecimal cgpa, int backlogs, int graduationYear) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.usn = usn;
        this.department = department;
        this.cgpa = cgpa;
        this.backlogs = backlogs;
        this.graduationYear = graduationYear;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsn() {
        return usn;
    }

    public void setUsn(String usn) {
        this.usn = usn;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getCgpa() {
        return cgpa;
    }

    public void setCgpa(BigDecimal cgpa) {
        this.cgpa = cgpa;
    }

    public int getBacklogs() {
        return backlogs;
    }

    public void setBacklogs(int backlogs) {
        this.backlogs = backlogs;
    }

    public int getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(int graduationYear) {
        this.graduationYear = graduationYear;
    }
}
