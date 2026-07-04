package com.myproject.rock_paper_scissor_game.rpsgame.gameLogik;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public class SessionGameService {

    private static final String SESSION_KEY = "GAME_STATE";

    private GameState getState(HttpSession session) {
        GameState state = (GameState) session.getAttribute(SESSION_KEY);

        if (state == null) {
            state = new GameState();
            session.setAttribute(SESSION_KEY, state);
        }

        return state;
    }

    public int getStreak(HttpSession session) {
        return getState(session).getStreak();
    }

    public void reset(HttpSession session) {
        getState(session).reset();
    }

    public void win(HttpSession session) {
        getState(session).win();
    }

    public void lose(HttpSession session) {
        getState(session).lose();
    }

    public boolean isGameOver(HttpSession session) {
        return getState(session).isGameOver();
    }

    public boolean isStarted(HttpSession session) {
        return getState(session).isStarted();
    }

    public void startGame(HttpSession session) {
        getState(session).startGame();
    }

}
