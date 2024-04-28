package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "schedule")
public class Schedule {
  @Id
  private String id;
  private String idSeason;
  private String teamHome;
  private String teamAway;
  private String time;
  private int homeScore;
  private int awayScore;
  private String result;
  private boolean status = false;
}
