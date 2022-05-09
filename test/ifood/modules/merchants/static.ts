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

export const merchantInterruptionsMockData = {
  status: 200,
  data: [
    {
      "id": "string",
      "description": "string",
      "start": "2022-04-22T10:27:30.759Z",
      "end": "2022-04-22T10:27:30.759Z"
    }
  ]
}

export const merchantDetailsMockData = {
  status: 200,
  data: {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "corporateName": "string",
    "description": "string",
    "averageTicket": 0,
    "exclusive": true,
    "type": "RESTAURANT",
    "status": "AVAILABLE",
    "createdAt": "2022-04-22T10:46:38.380Z",
    "address": {
      "country": "string",
      "state": "string",
      "city": "string",
      "postalCode": "string",
      "district": "string",
      "street": "string",
      "number": "string",
      "latitude": 0,
      "longitude": 0
    },
    "operations": {
      "name": "delivery",
      "salesChannel": {
        "name": "ifood-app",
        "enabled": "string"
      }
    }
  }
}