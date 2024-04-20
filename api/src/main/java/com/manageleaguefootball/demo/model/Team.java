package com.manageleaguefootball.demo.model;

import lombok.Data;
import nonapi.io.github.classgraph.json.Id;

@Data
public class Team {
  @Id
  private String id;
  private String idSeason;
  private String name;
  private String phoneNumber;
  private String captainName;
}
