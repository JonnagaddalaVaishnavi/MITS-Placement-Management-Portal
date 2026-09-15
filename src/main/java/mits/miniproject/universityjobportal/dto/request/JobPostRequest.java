package mits.miniproject.universityjobportal.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class JobPostRequest {
    private Long coordinatorId;
    private String title;
    private String companyName;
    private String description;
    private String location;
    private BigDecimal salary;
    private LocalDateTime applicationStartDate;
    private LocalDateTime applicationEndDate;

}
