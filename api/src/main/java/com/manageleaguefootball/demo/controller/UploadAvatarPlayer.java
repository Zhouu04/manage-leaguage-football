package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.PlayerDTO;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.service.impl.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/avatar")
@RequiredArgsConstructor
public class UploadAvatarPlayer {

  private final CloudinaryService cloudinaryService;



  @PostMapping("/{id}")
  public ResponseEntity<PlayerDTO> uploadAvatar(@RequestParam("avatar") MultipartFile file, @PathVariable String id){
    PlayerDTO data = this.cloudinaryService.uploadAvatar(file, id);
    return new ResponseEntity<>(data, HttpStatus.OK);
  }


}
