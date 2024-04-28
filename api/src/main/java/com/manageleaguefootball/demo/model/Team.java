package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "team")
public class Team {
  @Id
  private String id;
  private String idSeason;
  private String name;
  private String phoneNumber;
  private String captainName;
  private int score;
  private String facebook;
  private String email;

}
