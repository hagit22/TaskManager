//export const BASE_URL = 'http://127.0.0.1:3000/api'
//export const BASE_URL = '/api'
export const BASE_URL = '//localhost:3000/api'

export enum CRUDCodes {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    NOT_ALLOWED = 405,
}

export enum ErrorMessages {
    GET = 'Failed to fetch ',
    POST = 'Failed to create ',
    PUT = 'Failed to update ',
    DELETE = 'Failed to delete '
}


/*
200 OK: The request has succeeded. This status is typically used for GET, PUT, PATCH, and DELETE requests.
201 Created: The request has succeeded and a new resource has been created as a result. This is typically used for POST requests.
202 Accepted: The request has been received but not yet acted upon. It is typically used for asynchronous processing.
204 No Content: The server has successfully processed the request, but is not returning any content. This is often used for DELETE requests.

400 Bad Request: The server could not understand the request due to invalid syntax.
401 Unauthorized: The client must authenticate itself to get the requested response.
403 Forbidden: The client does not have access rights to the content.
404 Not Found: The server cannot find the requested resource.
405 Method Not Allowed: The request method is known by the server but is not supported by the target resource.
409 Conflict: The request conflicts with the current state of the server.
422 Unprocessable Entity: The server understands the content type of the request entity, but was unable to process the contained instructions.
500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
503 Service Unavailable: The server is not ready to handle the request, usually due to being overloaded or down for maintenance.
*/