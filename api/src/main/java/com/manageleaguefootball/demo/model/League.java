package com.manageleaguefootball.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "league")
public class League {
    @Id
    private String id;

    private  String name;

    private String logoUrl;

}
