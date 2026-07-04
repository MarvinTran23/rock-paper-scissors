package com.myproject.rock_paper_scissor_game.rpsgame.gameLogik;

import com.myproject.rock_paper_scissor_game.rpsgame.enums.WinState;

public record GameResponse (
    String player,
    String computer,
    WinState result
){}

