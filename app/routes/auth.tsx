import { LinksFunction } from '@remix-run/node';
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
