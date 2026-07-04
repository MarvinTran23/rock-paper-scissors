package com.myproject.rock_paper_scissor_game.rpsgame.highscore;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HighscoreRepository extends JpaRepository<Highscore, Long> {
    Optional<Highscore> findByPlayerName(String playerName);
    List<Highscore> findTop5ByOrderByScoreDesc();
}
