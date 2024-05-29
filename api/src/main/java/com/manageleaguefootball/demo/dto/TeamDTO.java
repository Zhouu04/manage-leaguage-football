package com.manageleaguefootball.demo.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TeamDTO {
    private String id;
    private String idSeason;
    private String name;
    private String phoneNumber;
    private String captainName;
    private String facebook;
    private String email;
    private int score;
    private int win;
    private int loss;
    private int draw;
    private int goalWin;
    private int goalLoss;
    private int difference;
    private String logoUrl;
}
