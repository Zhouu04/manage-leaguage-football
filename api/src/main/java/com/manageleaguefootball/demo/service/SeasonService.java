package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.SeasonDTO;

import java.util.List;

public interface SeasonService {
  SeasonDTO createSeason(SeasonDTO model);

  List<SeasonDTO> findAllByIdLeague(String id);

  List<SeasonDTO> getAllSeasons();

  SeasonDTO updateSeason(SeasonDTO model);

  SeasonDTO deleteSeason(String id);
}
