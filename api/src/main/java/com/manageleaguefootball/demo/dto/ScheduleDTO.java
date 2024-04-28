package com.manageleaguefootball.demo.dto;

import lombok.Data;

@Data
public class ScheduleDTO {
  private String id;
  private String idSeason;
  private String teamHome;
  private String teamAway;
  private int homeScore;
  private int awayScore;
  private String time;
  private String result;
  private boolean status = false;
}
