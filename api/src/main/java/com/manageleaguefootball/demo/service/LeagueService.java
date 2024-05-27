package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.LeagueDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LeagueService {
    LeagueDTO createLeague(LeagueDTO model);

    List<LeagueDTO> findAllLeague();

    LeagueDTO updateLeague(LeagueDTO model);

    LeagueDTO deleteLeague(String  id);

    LeagueDTO uploadImageLeague(MultipartFile file, String id);
}
