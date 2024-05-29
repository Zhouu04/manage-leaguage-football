package com.manageleaguefootball.demo.service.impl;

import com.cloudinary.Cloudinary;
import com.manageleaguefootball.demo.dto.PlayerDTO;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.model.Player;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.PlayerRepository;
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
  private final PlayerRepository playerRepository;

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

  public static PlayerDTO mapToView(Player player) {
    if (player == null) {
      return null;
    }

    return mapper().map(player, PlayerDTO.class);
  }

  public PlayerDTO uploadAvatar(MultipartFile file, String id)  {
    try{
      Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
      String img = (String) data.get("secure_url");
      Player player = this.playerRepository.findById(id).orElse(null);
      if(player == null) {
        throw new IllegalArgumentException("player not found");
      }
      player.setAvatar(img);
      playerRepository.save(player);
      return mapToView(player);
    }catch (IOException io){
      throw new RuntimeException("Image upload fail");
    }
  }
}
