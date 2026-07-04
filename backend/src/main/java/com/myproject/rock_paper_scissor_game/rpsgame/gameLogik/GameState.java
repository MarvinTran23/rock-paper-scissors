package com.myproject.rock_paper_scissor_game.rpsgame.gameLogik;

import org.springframework.stereotype.Component;

@Component
public class GameState {

    private int streak = 0;
    private boolean gameOver = false;
    private boolean started = false;

    public void startGame() {
        started = true;
    }

    public boolean isStarted() {
        return started;
    }

    public int getStreak() {
        return streak;
    }

    public void win() {
        streak++;
        started = true;
    }

    public void lose() {
        gameOver = true;
    }

    public boolean isGameOver() {
        return gameOver;
    }

    public void reset() {
        streak = 0;
        gameOver = false;
        started = false;
    }

}
