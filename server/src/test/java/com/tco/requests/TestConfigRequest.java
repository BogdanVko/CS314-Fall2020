package com.tco.requests;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestConfigRequest {

    private ConfigRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new ConfigRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("config", type);
    }

    @Test
    @DisplayName("Features includes \"config\"")
    public void testFeatures(){
        assertTrue(conf.validFeature("config"));
    }

    @Test
    @DisplayName("Team name is t24 THE ZUCCS")
    public void testServerName() {
        String name = conf.getServerName();
        assertEquals("t24 THE ZUCCS", name);
    }

    @Test
    @DisplayName("Type list is correct") 
    public void testTypes() {
        String firstType = conf.getTypes().get(0);
        assertEquals("airport", firstType);
    }
}