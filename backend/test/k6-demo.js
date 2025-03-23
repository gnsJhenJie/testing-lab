import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    stages: [
      { duration: '30s', target: 20 },
      { duration: '1m', target: 50 },
      { duration: '30s', target: 0 },
    ],
    thresholds: {
      'http_req_duration': ['p(95)<500', 'avg<200'],
      'http_req_failed': ['rate<0.01'],
    },
}

const BASE = 'http://localhost:8888/api/v1/todos'


export default function () {
    // 隨機選擇一個操作
    const rand = Math.random()
    if (rand < 0.7) {
        // GET all todos
        const res = http.get(BASE)
        check(res, {
            'status is 200': (r) => r.status === 200,
            'body has todos': (r) => r.json('todos') !== undefined,
        })
    }else {
        // POST new todo
        const payload = JSON.stringify({
            name: `k6-load-test-${Date.now()}`,
            description: `description ${Math.random()}`,
            id: '',
            status: false
        })
        const resp = http.post(BASE, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        check(resp, {
            'status is 201': (r) => r.status === 201,
            'returns todo id': (r) => !!r.json('todo._id'),
        })
    }

    sleep(1)

}