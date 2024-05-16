package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.UserDTO;
import com.manageleaguefootball.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@CrossOrigin("*")
public class UserController {
  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDTO) {
    if (userService.checkEmailExists(userDTO.getEmail())) {
      return ResponseEntity.badRequest().body(null);
    }
    UserDTO savedUser = userService.saveUser(userDTO);
    return ResponseEntity.ok(savedUser);
  }

  @PostMapping("/login")
  public ResponseEntity<Boolean> loginUser(@RequestParam String email, @RequestParam String password) {
    boolean isValid = userService.checkPassword(email, password);
    if (isValid) {
      return ResponseEntity.ok(true);
    }
    return ResponseEntity.status(401).body(false);
  }

  @GetMapping("/check-email")
  public ResponseEntity<Boolean> checkEmailExists(@RequestParam String email) {
    boolean exists = userService.checkEmailExists(email);
    return ResponseEntity.ok(exists);
  }
}
