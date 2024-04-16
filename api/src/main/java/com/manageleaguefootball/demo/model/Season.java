package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
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

  private int numberOfPlayers;

  private int numberOfCoach;

  private int timeOfHalf;
}