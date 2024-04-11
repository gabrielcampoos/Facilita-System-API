export const authPath = {
  get: {
    tags: ['Authentication'],
    sumary: 'API para verificar se o token é válido',
    security: [
      {
        bearerAuth: [],
      },
    ],

    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  summary: 'Indica que requisição teve êxito',
                  example: true,
                },
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/schemas/auth',
                  },
                  summary: 'Retorna o usuário e o token.',
                },
                code: {
                  type: 'integer',
                  summary: 'Conforme o padrão Rest API',
                  example: 200,
                },
              },
            },
          },
        },
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      500: {
        $ref: '#components/serverError',
      },
    },
  },
};
