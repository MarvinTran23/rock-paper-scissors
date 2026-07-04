package com.myproject.rock_paper_scissor_game.rpsgame.highscore;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.GameService;
import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.SessionGameService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/highscore")
public class HighscoreController {

    private final HighscoreService highscoreService;
    private final GameService gameService;
    private final SessionGameService sessionGameService;

    public HighscoreController(HighscoreService highscoreService, GameService gameService, SessionGameService sessionGameService) {
        this.highscoreService = highscoreService;
        this.gameService = gameService;
        this.sessionGameService = sessionGameService;
    }

    @PostMapping("/finish")
    public Highscore finish(@RequestParam String playerName, HttpSession session) {

        if (!sessionGameService.isGameOver(session)) {
            throw new IllegalStateException("You must lose at least once before finishing!");
        }

        int score = gameService.getScore(session);

        Highscore saved = highscoreService.saveOrUpdate(playerName, score);

        gameService.reset(session);

        return saved;
    }

    @GetMapping("/leaderboard")
    public List<Highscore> get() {
        return highscoreService.getLeaderboard();
    }

}
