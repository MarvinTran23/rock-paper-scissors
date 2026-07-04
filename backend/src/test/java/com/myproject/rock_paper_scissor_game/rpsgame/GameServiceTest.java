package com.myproject.rock_paper_scissor_game.rpsgame;

import java.util.Random;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.myproject.rock_paper_scissor_game.rpsgame.enums.WinState;
import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.GameResponse;
import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.GameService;
import com.myproject.rock_paper_scissor_game.rpsgame.gameLogik.SessionGameService;

import jakarta.servlet.http.HttpSession;


public class GameServiceTest {
    
    private Random random;
    private GameService gameService;
    private HttpSession session;

    @BeforeEach
    void setup(){
        random = mock(Random.class);
        session = mock(HttpSession.class);

        SessionGameService sessionGameService = mock(SessionGameService.class);

        gameService = new GameService(sessionGameService, random);
    }

    static Stream<org.junit.jupiter.params.provider.Arguments> gameCases() {
        return Stream.of(
            org.junit.jupiter.params.provider.Arguments.of("rock", 2, WinState.WIN),
            org.junit.jupiter.params.provider.Arguments.of("rock", 1, WinState.LOSE),
            org.junit.jupiter.params.provider.Arguments.of("rock", 0, WinState.DRAW),
            org.junit.jupiter.params.provider.Arguments.of("scissor", 2, WinState.DRAW),
            org.junit.jupiter.params.provider.Arguments.of("scissor", 1, WinState.WIN),
            org.junit.jupiter.params.provider.Arguments.of("scissor", 0, WinState.LOSE),
            org.junit.jupiter.params.provider.Arguments.of("paper", 2, WinState.LOSE),
            org.junit.jupiter.params.provider.Arguments.of("paper", 1, WinState.DRAW),
            org.junit.jupiter.params.provider.Arguments.of("paper", 0, WinState.WIN)
        );
    }

    @Test
    void playShouldAcceptRock() {
        when(random.nextInt(3)).thenReturn(0);

        GameResponse response = gameService.play("rock", session);

        assertEquals("rock", response.player());
    }

    @Test
    void shouldAcceptUpperCaseInput() {
        when(random.nextInt(3)).thenReturn(0);

        GameResponse response = gameService.play("ROCK", session);

        assertEquals("rock", response.player());
    }

    @Test
    void invalidInputShouldThrowException() {
        assertThrows(IllegalArgumentException.class,
            () -> gameService.play("banana", session)
        );
    }


    @ParameterizedTest
    @MethodSource("gameCases")
    void testAllRockCases(String player, int randomValue, WinState expected) {

        Random random = mock(Random.class);
        when(random.nextInt(3)).thenReturn(randomValue);

        SessionGameService sessionGameService = mock(SessionGameService.class);
        HttpSession session = mock(HttpSession.class);
        
        GameService service = new GameService(sessionGameService, random);

        GameResponse response = service.play(player, session);

        assertEquals(expected, response.result());
    }
}


