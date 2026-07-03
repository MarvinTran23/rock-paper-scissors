package com.myproject.rock_paper_scissor_game.rpsgame;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(GameController.class)
public class GameControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    GameService gameService;

    @Test
    void playEndpointReturnsResponse() throws Exception {
        mockMvc.perform(get("/api/play?choice=rock"))
            .andExpect(status().isOk());
    }
}
