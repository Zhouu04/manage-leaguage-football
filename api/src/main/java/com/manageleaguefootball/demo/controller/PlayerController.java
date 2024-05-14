package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.PlayerDTO;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1/players")
public class PlayerController {
  private final PlayerService playerService;

  @GetMapping
  public ResponseEntity<List<PlayerDTO>> findAllPlayer(){
    List<PlayerDTO> player = playerService.findAllPlayer();
    return ResponseEntity.ok(player);
  }

  @PostMapping()
  public ResponseEntity<PlayerDTO> createPlayer(@Valid @RequestBody PlayerDTO model) {
    PlayerDTO player = playerService.createPlayer(model);
    return ResponseEntity.ok(player);
  }

  @PutMapping()
  public ResponseEntity<PlayerDTO> updatePlayer(@Valid @RequestBody PlayerDTO model) {
    PlayerDTO player = playerService.updatePlayer(model);
    return ResponseEntity.ok(player);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<PlayerDTO> deletePlayer(@PathVariable("id") String id) {
    PlayerDTO player = playerService.deletePlayer(id);
    return ResponseEntity.ok(player);
  }

  @GetMapping("/team/{id}")
  public ResponseEntity<List<PlayerDTO>> getPlayerByIdTeam(@PathVariable("id") String id) {
    List<PlayerDTO> player = playerService.findPlayerByIdTeam(id);
    return ResponseEntity.ok(player);
  }

  @GetMapping("ranks/{id}")
  public ResponseEntity<List<PlayerDTO>> getPlayerByOrderGoal(@PathVariable("id") String id) {
    List<PlayerDTO> players = playerService.getPlayerByOrderGoal(id);
    return ResponseEntity.ok(players);
  }

}
