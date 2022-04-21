export const merchantMockData = {
    status: 200,
    data: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        corporateName: 'string',
      },
    ],
}

export const merchantStatusMockData = {
    status: 200,
    data: [
      {
        "operation": "string",
        "salesChannel": "string",
        "available": true,
        "state": "OK",
        "reopenable": {
          "identifier": "string",
          "type": "UNAVAILABILITY",
          "reopenable": true
        },
        "validations": [
          {
            "id": "string",
            "code": "string",
            "state": "OK",
            "message": {
              "title": "string",
              "subtitle": "string",
              "description": "string"
            }
          }
        ],
        "message": {
          "title": "string",
          "subtitle": "string",
          "description": "string"
        }
      }
    ]
}