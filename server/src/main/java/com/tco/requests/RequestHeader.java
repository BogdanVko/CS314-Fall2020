package com.tco.requests;

import com.tco.misc.BadRequestException;

public abstract class RequestHeader {

    protected String requestType;

    public String getRequestType() {
        return requestType;
    }

    // Overrideable Methods
    public abstract void buildResponse() throws BadRequestException;
}