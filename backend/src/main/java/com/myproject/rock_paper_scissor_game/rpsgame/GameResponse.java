package com.myproject.rock_paper_scissor_game.rpsgame;

public class GameResponse {
    public String player;
    public String computer;
    public WinState result;


    public GameResponse(String player, String computer, WinState result) {
        this.player = player;
        this.computer = computer;
        this.result = result;
    }
}
