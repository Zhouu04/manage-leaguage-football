package com.manageleaguefootball.demo.dto;

import lombok.Data;

@Data
public class PlayerDTO {
  private  String id;
  private String name;
  private String country;
  private int age;
  private int goal;
  private int assist;
  private String idTeam;


}
