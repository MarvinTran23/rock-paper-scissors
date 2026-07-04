package com.myproject.rock_paper_scissor_game.rpsgame.highscore;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class HighscoreService {

    private final HighscoreRepository repository;

    public HighscoreService(HighscoreRepository repository) {
        this.repository = repository;
    }

    public Highscore saveOrUpdate(String name, int score) {

        Highscore existing = repository.findByPlayerName(name)
                .orElse(null);

        if (existing == null) {
            return repository.save(new Highscore(name, score));
        }

        existing.setScore(score);
        return repository.save(existing);
    }

    public List<Highscore> getLeaderboard() {
        return repository.findTop5ByOrderByScoreDesc();
    }

}
