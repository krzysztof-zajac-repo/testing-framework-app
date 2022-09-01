import { request } from '@playwright/test';
import { Console } from 'console';

const baseURL = 'http://localhost:3001';
const user = 'Allie2';
const password = 's3cret';

async function globalSetup() {
  const requestContext = await request.newContext();
  await requestContext.post(baseURL+ '/login', {
    form: {
      'username': user,
      'password': password,
      'type': 'LOGIN'
    }
  });
  await requestContext.storageState({ path: 'storageState.json' });
  await requestContext.dispose();
}

export default globalSetup;