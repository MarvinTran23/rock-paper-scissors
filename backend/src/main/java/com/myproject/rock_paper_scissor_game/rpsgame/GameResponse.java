package com.myproject.rock_paper_scissor_game.rpsgame;

public record GameResponse (
    String player,
    String computer,
    WinState result
){}

