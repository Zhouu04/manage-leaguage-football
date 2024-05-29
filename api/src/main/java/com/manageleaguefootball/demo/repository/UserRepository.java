package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
  User getUserByEmail(String email);
  Optional<User> findUserByEmail(String email);
  boolean existsByUsernameAndPassword(String username, String password);
}
