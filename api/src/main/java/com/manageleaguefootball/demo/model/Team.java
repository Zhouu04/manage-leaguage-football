package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

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
  private int win;
  private int loss;
  private int draw;
  private int goalWin;
  private int goalLoss;
  private int difference;
  private String logoUrl;
}
