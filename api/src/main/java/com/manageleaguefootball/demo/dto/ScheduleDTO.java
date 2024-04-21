package com.manageleaguefootball.demo.dto;

import lombok.Data;

@Data
public class ScheduleDTO {
  private String id;
  private String idSeason;
  private String teamHome;
  private String teamAway;
  private String time;
  private String result;
}
