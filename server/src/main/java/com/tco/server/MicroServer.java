package com.tco.server;

import com.tco.misc.BadRequestException;
import com.tco.misc.JSONValidator;
import com.tco.requests.*;

import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import static spark.Spark.*;

class MicroServer {

    private final Logger log = LoggerFactory.getLogger(MicroServer.class);
    private DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

    private final int HTTP_OK = 200;
    private final int HTTP_BAD_REQUEST = 400;
    private final int HTTP_SERVER_ERROR = 500;

    MicroServer(int serverPort) {
        configureServer(serverPort);
        processRestfulAPIrequests();
    }

    /* Configure MicroServices Here. */

    private void processRestfulAPIrequests() {
        path("/api", () -> {
            before("/*", (req, res) -> logRequest(req));
            post("/config", (req, res) -> processHttpRequest(req, res, ConfigRequest.class));
            post("/find", (req, res) -> processHttpRequest(req, res, FindRequest.class));
            post("/distances", (req, res) -> processHttpRequest(req, res, DistancesRequest.class));
            post("/tour", (req, res) -> processHttpRequest(req, res, TourRequest.class));
        });
    }

    /* You shouldn't need to change what is found below. */

    private String processHttpRequest(spark.Request httpRequest, spark.Response httpResponse, Type type) {
        setupResponse(httpResponse);
        String jsonString = httpRequest.body();
        try {
            JSONValidator.validate(jsonString, type);
            return buildJSONResponse(new Gson().fromJson(jsonString, type));
        } catch (IOException | BadRequestException e) {
            log.info("Bad Request - {}", e.getMessage());
            httpResponse.status(HTTP_BAD_REQUEST);
        } catch (Exception e) {
            log.info("Server Error - ", e);
            httpResponse.status(HTTP_SERVER_ERROR);
        }
        return jsonString;
    }

    private void setupResponse(spark.Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        response.status(HTTP_OK);
    }

    private String buildJSONResponse(RequestHeader request) throws BadRequestException {
        request.buildResponse();
        String responseBody = new Gson().toJson(request);
        log.trace("Response - {}", responseBody);
        return responseBody;
    }

    private void logRequest(spark.Request request) {
        String message = "Request - "
                + "[" + dateTimeFormat.format(LocalDateTime.now()) + "] "
                + request.ip() + " "
                + "\"" + request.requestMethod() + " "
                + request.pathInfo() + " "
                + request.protocol() + "\" "
                + "[" + request.body() + "]";
        log.info(message);
    }

    private void configureServer(int serverPort) {
        port(serverPort);
        String keystoreFile = System.getenv("KEYSTORE_FILE");
        String keystorePassword = System.getenv("KEYSTORE_PASSWORD");
        if (keystoreFile != null && keystorePassword != null) {
            secure(keystoreFile, keystorePassword, null, null);
            log.info("MicroServer running using HTTPS on port {}.", serverPort);
        } else {
            log.info("MicroServer running using HTTP on port {}.", serverPort);
        }

        // To Serve Static Files (SPA)

        staticFiles.location("/public/");
        redirect.get("/", "/index.html");
    }
}
