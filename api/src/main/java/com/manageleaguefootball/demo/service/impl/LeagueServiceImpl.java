package com.manageleaguefootball.demo.service.impl;

import com.manageleaguefootball.demo.dto.LeagueDTO;
import com.manageleaguefootball.demo.model.League;
import com.manageleaguefootball.demo.repository.LeagueRepository;
import com.manageleaguefootball.demo.service.LeagueService;
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
public class LeagueServiceImpl implements LeagueService {
    private final LeagueRepository repository;

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static LeagueDTO mapToView(League league) {
        if (league == null) {
            return null;
        }

        return mapper().map(league, LeagueDTO.class);
    }

    public static List<LeagueDTO> mapToView(List<League> categories) {
        return categories.stream().map(d -> mapper().map(d, LeagueDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public LeagueDTO createLeague(LeagueDTO model) {
        League league = mapper().map(model, League.class);
        return mapToView(repository.save(league));
    }

    @Override
    public List<LeagueDTO> findAllLeague() {
        return mapToView(repository.findAll());
    }

    @Override
    public LeagueDTO updateLeague(LeagueDTO model) {
        League league = repository.findById(model.getId()).orElse(null);
        if(league == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "League not found");
        }
        mapper().map(model, league);
        return mapToView(repository.save(league));
    }

    @Override
    public LeagueDTO deleteLeague(String id) {
        League league = repository.findById(id).orElse(null);
        if(league == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "League not found");
        }
        repository.delete(league);
        return mapToView(league);
    }
}
