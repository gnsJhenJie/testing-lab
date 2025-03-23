import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { serverOf } from '../src/server'
import * as TodoRepo from '../src/repo/todo'

describe('Todo API Testing', () => {
  const server = serverOf()

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('Given an empty array return from repo function, When send a GET request to /api/v1/todos, Then it should response an empty array', async () => {
    // assert: stub the repo function to return an empty array
    vi.spyOn(TodoRepo, 'findAllTodos').mockImplementation(async () => [])

    // act: send a GET request to /api/v1/todos
    const response = await server.inject({
      method: 'GET',
      url: '/api/v1/todos'
    })

    // assert: response should be an empty array
    const todos = JSON.parse(response.body)['todos']
    expect(todos).toStrictEqual([])
  })

  test('Given an todos array return from repo function, When send a GET /api/v1/todos, Then it should return a list of todos with status code 200', async () => {
    const fakeTodos = [{ id: '1', name: 'Mom', description: 'Buy Tomatoes, Banana, Meat', status: false }]
    vi.spyOn(TodoRepo, 'findAllTodos').mockResolvedValue(fakeTodos)

    const response = await server.inject({
      method: 'GET',
      url: '/api/v1/todos'
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ todos: fakeTodos })

  })

  // test('When send a DELETE /api/v1/todos/:id with non-existed id, Then it should return status code 404 when todo is not found', async () => {

  //   vi.spyOn(TodoRepo, 'deleteTodoById').mockResolvedValue()
  //   const fakeId = '1'

  //   const response = await server.inject({
  //     method: 'DELETE',
  //     url: `/api/v1/todos/${fakeId}`
  //   })

  //   expect(response.statusCode).toBe(404)
  //   expect(response.json()).toEqual({ msg: `Not Found Todo:${fakeId}` })
  // })

})
