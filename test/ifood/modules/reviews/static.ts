export const reviewDetailsMockData = {
  status: 200,
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    createdAt: '2022-04-22T11:08:26.316Z',
    customerName: 'string',
    discarded: true,
    moderated: true,
    moderationStatus: 'REQUESTED',
    order: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      createdAt: '2022-04-22T11:08:26.316Z',
    },
    questions: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        type: 'RATING',
        title: 'string',
        answers: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            title: 'string',
          },
        ],
      },
    ],
    reply: 'string',
    score: 0,
    surveyId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    published: true,
  },
}

export const merchantsReviewsMockData = {
  status: 200,
  data: {
    page: 0,
    size: 0,
    reviews: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        comment: 'string',
        createdAt: '2022-04-22T11:23:58.998Z',
        discarded: true,
        moderated: true,
        moderationStatus: 'REQUESTED',
        reply: 'string',
        order: {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          createdAt: '2022-04-22T11:23:58.998Z',
        },
        score: 0,
        surveyId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        published: true,
      },
    ],
    total: 0,
    pageCount: 0,
  },
}
