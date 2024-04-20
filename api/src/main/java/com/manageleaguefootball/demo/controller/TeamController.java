package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/teams")
public class TeamController {
  private final TeamService teamService;

  @GetMapping()
  public ResponseEntity<List<TeamDTO>> getAllTeams() {
    List<TeamDTO> teams = teamService.findAllTeam();
    return ResponseEntity.ok(teams);
  }

  @GetMapping("/season/{id}")
  public ResponseEntity<List<TeamDTO>> getTeamByIdSeason(@PathVariable("id") String id) {
    List<TeamDTO> teams = teamService.findTeamByIdSeason(id);
    return ResponseEntity.ok(teams);
  }

  @PostMapping()
  public ResponseEntity<TeamDTO> createTeam(@Valid @RequestBody TeamDTO model) {
    TeamDTO team = teamService.createTeam(model);
    return ResponseEntity.ok(team);
  }

  @PutMapping()
  public ResponseEntity<TeamDTO> updateTeam(@Valid @RequestBody TeamDTO model) {
    TeamDTO team = teamService.updateTeam(model);
    return ResponseEntity.ok(team);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<TeamDTO> deleteTeam(@PathVariable("id") String id) {
    TeamDTO team = teamService.deleteTeam(id);
    return ResponseEntity.ok(team);
  }
}
