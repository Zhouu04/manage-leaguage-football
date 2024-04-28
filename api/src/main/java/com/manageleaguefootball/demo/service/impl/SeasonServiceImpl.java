package com.manageleaguefootball.demo.service.impl;

import com.manageleaguefootball.demo.dto.SeasonDTO;
import com.manageleaguefootball.demo.model.League;
import com.manageleaguefootball.demo.model.Season;
import com.manageleaguefootball.demo.repository.LeagueRepository;
import com.manageleaguefootball.demo.repository.ScheduleRepository;
import com.manageleaguefootball.demo.repository.SeasonRepository;
import com.manageleaguefootball.demo.repository.TeamRepository;
import com.manageleaguefootball.demo.service.SeasonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeasonServiceImpl implements SeasonService {
  private final SeasonRepository seasonRepository;
  private final LeagueRepository leagueRepository;
  private final TeamRepository teamRepository;
  private final ScheduleRepository scheduleRepository;

  public static ModelMapper mapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return modelMapper;
  }

  public static SeasonDTO mapToView(Season season) {
    if (season == null) {
      return null;
    }

    return mapper().map(season, SeasonDTO.class);
  }

  public static List<SeasonDTO> mapToView(List<Season> seasons) {
    return seasons.stream().map(d -> mapper().map(d, SeasonDTO.class))
      .collect(Collectors.toList());
  }
  @Override
  public SeasonDTO createSeason(SeasonDTO model) {
    League league = leagueRepository.findById(model.getIdLeague()).orElse(null);
    if(league == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "League id not found" + model.getIdLeague());
    }

    Season season = mapper().map(model, Season.class);
    return mapToView(seasonRepository.save(season));
  }

  @Override
  public SeasonDTO getSeasonById(String id) {
    Season season = seasonRepository.findById(id).orElse(null);
    if(season == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Season id not found" + id);
    }
    return mapToView(season);
  }

  @Override
  public List<SeasonDTO> findAllByIdLeague(String id) {
    List<Season> seasons = seasonRepository.findAllByIdLeague(id);
    if(seasons == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Season not found with id league " + id);
    }
    return mapToView(seasons);
  }

  @Override
  public List<SeasonDTO> getAllSeasons() {
    return mapToView(seasonRepository.findAll());
  }

  @Override
  public SeasonDTO updateSeason(SeasonDTO model) {
    Season season = seasonRepository.findById(model.getId()).orElse(null);
    if(season == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Season not found");
    }
    mapper().map(model, season);
    return mapToView(seasonRepository.save(season));
  }

  @Override
  public SeasonDTO deleteSeason(String id) {
    Season season = seasonRepository.findById(id).orElse(null);
    if(season == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Season id  not found " + id);
    }
    teamRepository.deleteAllByIdSeason(id);
    seasonRepository.delete(season);
    scheduleRepository.deleteAllByIdSeason(id);
    return mapToView(season);
  }
}
