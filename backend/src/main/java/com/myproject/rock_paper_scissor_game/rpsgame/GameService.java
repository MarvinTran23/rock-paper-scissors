package com.myproject.rock_paper_scissor_game.rpsgame;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.myproject.rock_paper_scissor_game.rpsgame.enums.Move;
import com.myproject.rock_paper_scissor_game.rpsgame.enums.WinState;


@Service
public class GameService {
    private final Random random;

    public GameService (Random random){
        this.random = random;
    }

    public GameService () {
        this(new Random());
    }

    public GameResponse play(String playerInput) {
        Move playerMove = Move.valueOf(playerInput.toUpperCase());
        Move computerMove = Move.values()[random.nextInt(Move.values().length)];
        WinState result = decideWinner(playerMove, computerMove);
        

        return new GameResponse(
                playerMove.name().toLowerCase(),
                computerMove.name().toLowerCase(),
                result);
    }

    private WinState decideWinner(Move playerMove, Move computerMove) {
        if (playerMove == computerMove) return WinState.DRAW;

        return switch(playerMove){
            case ROCK -> (computerMove == Move.SCISSOR) ? WinState.WIN : WinState.LOSE;
            case PAPER -> (computerMove == Move.ROCK) ? WinState.WIN : WinState.LOSE;
            case SCISSOR -> (computerMove == Move.PAPER) ? WinState.WIN : WinState.LOSE;
            default -> throw new IllegalArgumentException();
        };
    }

}
