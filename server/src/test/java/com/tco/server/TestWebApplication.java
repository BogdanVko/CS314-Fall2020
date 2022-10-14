package com.tco.server;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestWebApplication {

    @Test
    @DisplayName("Request type is \"config\"")
    public void testPortIsValid() {
        assertTrue(WebApplication.portIsValid((WebApplication.MIN_SERVER_PORT + WebApplication.MAX_SERVER_PORT) / 2));
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testPortIsValidLow() {
        assertTrue(!WebApplication.portIsValid(WebApplication.MIN_SERVER_PORT - 1));
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testPortIsValidHigh() {
        assertTrue(!WebApplication.portIsValid(WebApplication.MAX_SERVER_PORT+1));
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testGetServerPortDefault() {
        String[] commandLineArguments = new String[0];
        assertEquals(WebApplication.DEFAULT_SERVER_PORT, WebApplication.getServerPort(commandLineArguments));
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testGetServerPortSpecifiedValid() {
        String port = "31400";
        String[] commandLineArguments = {port};
        assertEquals(Integer.parseInt(port), WebApplication.getServerPort(commandLineArguments));
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testGetServerPortSpecifiedNotInteger() {
        String[] commandLineArguments = {".123"};
        assertEquals(WebApplication.DEFAULT_SERVER_PORT, WebApplication.getServerPort(commandLineArguments));
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testGetServerPortSpecifiedOutofRange() {
        String[] commandLineArguments = {"25"};
        assertEquals(WebApplication.DEFAULT_SERVER_PORT, WebApplication.getServerPort(commandLineArguments));
    }
}
