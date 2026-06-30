package com.myproject.rock_paper_scissor_game;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.myproject.rock_paper_scissor_game.rpsgame.GameController;
import com.myproject.rock_paper_scissor_game.rpsgame.GameService;

@SpringBootTest
class RockPaperScissorGameApplicationTests {

	@Autowired
	private GameService gameService;

	@Autowired
	private GameController gameController;

	@Test
	void contextLoads() {
		assertNotNull(gameService);
		assertNotNull(gameController);
	}

}
