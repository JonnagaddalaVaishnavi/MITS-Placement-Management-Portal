package mits.miniproject.universityjobportal.dto.response;

import mits.miniproject.universityjobportal.Utility.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class JobResponse {

    private Long id;
    private String coordinatorName;
    private String coordinatorDepartment;
    private String title;
    private String companyName;
    private String description;
    private String location;
    private BigDecimal salary;
    private LocalDateTime applicationStartDate;
    private LocalDateTime applicationEndDate;
    private Status status;
    private JobEligibilityResponse eligibility;

    public JobResponse() {
    }

    public JobResponse(Long id, String coordinatorName, String coordinatorDepartment, String title,
                       String companyName, String description, String location, BigDecimal salary,
                       LocalDateTime applicationStartDate, LocalDateTime applicationEndDate,
                       Status status, JobEligibilityResponse eligibility) {
        this.id = id;
        this.coordinatorName = coordinatorName;
        this.coordinatorDepartment = coordinatorDepartment;
        this.title = title;
        this.companyName = companyName;
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.applicationStartDate = applicationStartDate;
        this.applicationEndDate = applicationEndDate;
        this.status = status;
        this.eligibility = eligibility;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoordinatorName() {
        return coordinatorName;
    }

    public void setCoordinatorName(String coordinatorName) {
        this.coordinatorName = coordinatorName;
    }

    public String getCoordinatorDepartment() {
        return coordinatorDepartment;
    }

    public void setCoordinatorDepartment(String coordinatorDepartment) {
        this.coordinatorDepartment = coordinatorDepartment;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public LocalDateTime getApplicationStartDate() {
        return applicationStartDate;
    }

    public void setApplicationStartDate(LocalDateTime applicationStartDate) {
        this.applicationStartDate = applicationStartDate;
    }

    public LocalDateTime getApplicationEndDate() {
        return applicationEndDate;
    }

    public void setApplicationEndDate(LocalDateTime applicationEndDate) {
        this.applicationEndDate = applicationEndDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public JobEligibilityResponse getEligibility() {
        return eligibility;
    }

    public void setEligibility(JobEligibilityResponse eligibility) {
        this.eligibility = eligibility;
    }
}