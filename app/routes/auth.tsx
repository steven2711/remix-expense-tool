import { ActionFunctionArgs, LinksFunction } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
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

  if (authMode === 'login') {
    // login user
  } else {
    // create user
  }
}
