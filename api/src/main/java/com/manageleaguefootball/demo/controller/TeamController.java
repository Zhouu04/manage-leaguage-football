package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.Info.TeamPageInfo;
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

  @PostMapping("search/{id}")
  public ResponseEntity<List<TeamDTO>> search(@PathVariable("id") String id, @RequestBody TeamPageInfo model) {
    List<TeamDTO> teams = teamService.search(id, model);
    return ResponseEntity.ok(teams);
  }

  @PostMapping("count/{id}")
  public Long count(@PathVariable("id") String id, @RequestBody TeamPageInfo model) {
    return teamService.count(id, model);
  }


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

  @GetMapping("rank/{id}")
  public ResponseEntity<List<TeamDTO>> getAllTeamOrderByScore(@PathVariable("id") String id) {
    List<TeamDTO> teams = teamService.findTeamByOrderScore(id);
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

  @PostMapping("search")
  public ResponseEntity<List<TeamDTO>> searchTeam( @RequestBody TeamPageInfo model) {
    List<TeamDTO> teams = teamService.searchTeam(model);
    return ResponseEntity.ok(teams);
  }

  @PostMapping("count")
  public Long countTeam( @RequestBody TeamPageInfo model) {
    return teamService.countTeam(model);
  }
}
