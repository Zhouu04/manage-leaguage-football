package com.manageleaguefootball.demo;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class LeagueApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeagueApplication.class, args);
	}

  @Bean
  public Cloudinary cloudinary() {
    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
      "cloud_name", "djt6sskch",
      "api_key", "454722884519522",
      "api_secret", "yL4-oQzNcrPeyaCsBL68nLR17Ec",
      "secure", true));
    return cloudinary;
  }


}
