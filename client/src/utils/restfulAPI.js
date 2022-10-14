import Ajv from 'ajv';

export async function sendServerRequest(requestBody, serverPort=getOriginalServerPort()) {
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(`${serverPort}/api/${requestBody.requestType}`, fetchOptions);
        if (!response.ok) {
            return null;
        }
        return response.json();
    } catch (error) {
        return null;
    }
}

export function getOriginalServerPort() {
    const serverProtocol = location.protocol;
    const serverHost = location.hostname;
    const serverPort = location.port;
    const alternatePort = process.env.SERVER_PORT;
    return `${serverProtocol}\/\/${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}

export function isJsonResponseValid(object, schema) {
    const anotherJsonValidator = new Ajv();
    const validate = anotherJsonValidator.compile(schema);
    return validate(object);
}