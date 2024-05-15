package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
@Document(collection = "user")
public class User {
  @Id
  private String id;
  private String username;
  private String email;
  private String fullname;
  private String password;

}

