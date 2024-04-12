package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.LeagueDTO;

import java.util.List;

public interface LeagueService {
    LeagueDTO createLeague(LeagueDTO model);

    List<LeagueDTO> findAllLeague();

    LeagueDTO updateLeague(LeagueDTO model);

    LeagueDTO deleteLeague(String  id);
}
