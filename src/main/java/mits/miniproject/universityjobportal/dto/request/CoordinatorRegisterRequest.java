package mits.miniproject.universityjobportal.dto.request;

public class CoordinatorRegisterRequest {
    private Long userId;
    private String department;
    private String designation;

    public CoordinatorRegisterRequest() {
    }

    public CoordinatorRegisterRequest(Long userId, String department, String designation) {
        this.userId = userId;
        this.department = department;
        this.designation = designation;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
