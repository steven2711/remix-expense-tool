import { destroyUserSession } from '~/data/auth.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
}
