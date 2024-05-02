package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "player")
public class Player {
  @Id
  private  String id;
  private String name;
  private String country;
  private int goal;
  private int assist;
  private int age;
  private String idTeam;

}
