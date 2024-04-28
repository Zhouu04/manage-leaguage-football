package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "season")
public class Season {
  @Id
  private String id;

  private String name;

  private String idLeague;

  private String place;

  private int numberOfTeams;

  private String timeStart;

  private  String timeEnd;

  private String typeTournament;

  private String numberOfPlayers;

  private String numberOfCoach;

  private int timeOfHalf;
}
