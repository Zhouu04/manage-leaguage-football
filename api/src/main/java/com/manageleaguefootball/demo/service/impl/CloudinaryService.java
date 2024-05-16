package com.manageleaguefootball.demo.service.impl;

import com.cloudinary.Cloudinary;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

  private final Cloudinary cloudinary;
  private final TeamRepository teamRepository;

  public static ModelMapper mapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return modelMapper;
  }

  public static TeamDTO mapToView(Team team) {
    if (team == null) {
      return null;
    }

    return mapper().map(team, TeamDTO.class);
  }

  public TeamDTO upload(MultipartFile file, String id)  {
    try{
      Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
      String img = (String) data.get("secure_url");
      Team team = this.teamRepository.findById(id).orElse(null);
      if(team == null) {
        throw new IllegalArgumentException("Team not found");
      }
      team.setLogoUrl(img);
      teamRepository.save(team);
      return mapToView(team);
    }catch (IOException io){
      throw new RuntimeException("Image upload fail");
    }
  }
}
