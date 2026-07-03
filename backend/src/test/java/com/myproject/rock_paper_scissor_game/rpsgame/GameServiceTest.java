package com.myproject.rock_paper_scissor_game.rpsgame;

import java.util.Random;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.myproject.rock_paper_scissor_game.rpsgame.enums.WinState;

@SpringBootTest
public class GameServiceTest {

    @Autowired
    private GameService gameService;

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
        GameResponse response = gameService.play("rock");

        assertEquals("rock", response.player());
    }

    @Test
    void shouldAcceptUpperCaseInput() {
        GameResponse response = gameService.play("ROCK");

        assertEquals("rock", response.player());
    }

    @Test
    void invalidInputShouldThrowException() {
        assertThrows(IllegalArgumentException.class,
            () -> gameService.play("banana")
        );
    }


    @ParameterizedTest
    @MethodSource("gameCases")
    void testAllRockCases(String player, int randomValue, WinState expected) {

        Random random = mock(Random.class);
        when(random.nextInt(3)).thenReturn(randomValue);

        GameService service = new GameService(random);

        GameResponse response = service.play(player);

        assertEquals(expected, response.result());
    }
}


