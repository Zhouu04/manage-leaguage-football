package com.manageleaguefootball.demo.dto;

import lombok.Data;

@Data
public class SeasonDTO {
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
