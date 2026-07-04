package com.myproject.rock_paper_scissor_game.rpsgame.gameLogik;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.rock_paper_scissor_game.rpsgame.highscore.HighscoreService;

import jakarta.servlet.http.HttpSession;

@RestController
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService, HighscoreService highscoreService) {
        this.gameService = gameService;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    @GetMapping("/play")
    public GameResponse play(@RequestParam("choice") String choice, HttpSession session) {
        return gameService.play(choice, session);
    }

}
