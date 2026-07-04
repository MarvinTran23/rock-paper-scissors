package com.myproject.rock_paper_scissor_game.rpsgame.gameLogik;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.myproject.rock_paper_scissor_game.rpsgame.enums.Move;
import com.myproject.rock_paper_scissor_game.rpsgame.enums.WinState;

import jakarta.servlet.http.HttpSession;

@Service
public class GameService {

    private final Random random;
    private final SessionGameService sessionGameService;

    public GameService(SessionGameService sessionGameService) {
        this.sessionGameService = sessionGameService;
        this.random = new Random();
    }

    // need it for testing
    public GameService(SessionGameService sessionGameService, Random random) {
        this.sessionGameService = sessionGameService;
        this.random = random;
    }

    public GameResponse play(String playerInput, HttpSession session) {

        if (sessionGameService.isGameOver(session)) {
            return new GameResponse(playerInput, "GAME OVER", WinState.LOSE);
        }

        if (!sessionGameService.isStarted(session)) {
            sessionGameService.startGame(session);
        }

        Move playerMove = Move.valueOf(playerInput.toUpperCase());
        Move computerMove = Move.values()[random.nextInt(Move.values().length)];

        WinState result = decideWinner(playerMove, computerMove);

        switch (result) {
            case WIN ->
                sessionGameService.win(session);
            case LOSE ->
                sessionGameService.lose(session);
            case DRAW -> {
            }
        }

        return new GameResponse(
                playerMove.name().toLowerCase(),
                computerMove.name().toLowerCase(),
                result
        );
    }

    public int getScore(HttpSession session) {
        return sessionGameService.getStreak(session);
    }

    public void reset(HttpSession session) {
        sessionGameService.reset(session);
    }

    private WinState decideWinner(Move playerMove, Move computerMove) {
        if (playerMove == computerMove) {
            return WinState.DRAW;
        }

        return switch (playerMove) {
            case ROCK ->
                (computerMove == Move.SCISSOR) ? WinState.WIN : WinState.LOSE;
            case PAPER ->
                (computerMove == Move.ROCK) ? WinState.WIN : WinState.LOSE;
            case SCISSOR ->
                (computerMove == Move.PAPER) ? WinState.WIN : WinState.LOSE;
            default ->
                throw new IllegalArgumentException();
        };
    }

}
