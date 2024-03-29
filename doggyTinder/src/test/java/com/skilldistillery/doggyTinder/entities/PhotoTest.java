package com.skilldistillery.doggyTinder.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.doggyTinder.entities.Photo;

class PhotoTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	


	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("DoggyTinder");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}

	@Test
	void test_photo_connection() {
		
		Photo p = em.find(Photo.class, 1);
		
		assertEquals("https://data.junkee.com/wp-content/uploads/2014/06/Spot.jpg", p.getUrl());
		assertEquals("Spot", p.getDog().getName());
		
	}

}
