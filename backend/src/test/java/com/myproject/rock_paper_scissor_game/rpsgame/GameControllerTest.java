package com.myproject.rock_paper_scissor_game.rpsgame;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.GameController;
import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.GameService;
import com.myproject.rock_paper_scissor_game.rpsgame.highscore.HighscoreService;

@WebMvcTest(GameController.class)
public class GameControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    GameService gameService;

    @MockitoBean
    HighscoreService highscoreService;

    @Test
    void playEndpointReturnsResponse() throws Exception {
        mockMvc.perform(get("/play?choice=rock"))
            .andExpect(status().isOk());
    }
}
