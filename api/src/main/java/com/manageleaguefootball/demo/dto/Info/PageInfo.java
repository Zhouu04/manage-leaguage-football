package com.manageleaguefootball.demo.dto.Info;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class PageInfo {

  // Trang hiện tại.
  @Min(0)
  private int currentPage = 1;

  // Số bản ghi trên một trang.
  @Min(1)
  @Max(500)
  private int recordPerPage = 20;

}





