package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.LeagueDTO;
import com.manageleaguefootball.demo.service.LeagueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/leagues")
public class LeagueController {
    private final LeagueService service;

    @GetMapping()
    public ResponseEntity<List<LeagueDTO>> getAllLeagues() {
        List<LeagueDTO> leagues = service.findAllLeague();
        return ResponseEntity.ok(leagues);
    }

    @PostMapping()
    public ResponseEntity<LeagueDTO> createLeague(@Valid @RequestBody LeagueDTO leagueDTO) {
        LeagueDTO league = service.createLeague(leagueDTO);
        return ResponseEntity.ok(league);
    }

    @PutMapping()
    public ResponseEntity<LeagueDTO> updateLeague(@Valid @RequestBody LeagueDTO leagueDTO) {
        LeagueDTO league = service.updateLeague(leagueDTO);
        return ResponseEntity.ok(league);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LeagueDTO> deleteLeague(@PathVariable("id") String id) {
        LeagueDTO league = service.deleteLeague(id);
        return ResponseEntity.ok(league);
    }


}
