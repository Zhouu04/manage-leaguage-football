package com.manageleaguefootball.demo.dto;

import lombok.Data;

@Data
public class TeamDTO {
    private String id;
    private String idSeason;
    private String name;
    private String phoneNumber;
    private String captainName;
    private String facebook;
    private String email;
    private int score = 0;
    private int win;
    private int loss;
    private int draw;
    private int goalWin;
    private int goalLoss;
    private int difference;
}
