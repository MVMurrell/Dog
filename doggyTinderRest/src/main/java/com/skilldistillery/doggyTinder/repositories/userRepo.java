package com.skilldistillery.doggyTinder.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.doggyTinder.entities.User;

public interface userRepo extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);
}
