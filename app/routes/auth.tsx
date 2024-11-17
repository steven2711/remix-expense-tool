import { ActionFunctionArgs, LinksFunction, redirect } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { login, signup } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css?url';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: authStyles,
  },
];

export default function Auth() {
  return <AuthForm />;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate credentials
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      return await login({
        email: credentials.email as string,
        password: credentials.password as string,
      });
    } else {
      return await signup({
        email: credentials.email as string,
        password: credentials.password as string,
      });
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
    return error;
  }
}
