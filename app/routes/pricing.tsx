// protected route
import type { LinksFunction } from '@remix-run/node';
import marketingStyles from '~/styles/marketing.css?url';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: marketingStyles,
  },
];
export default function Pricing() {
  return (
    <main id="pricing">
      <h2>Great Product, Simple Pricing</h2>
      {/* <ol id="pricing-plans">{}</ol> */}
    </main>
  );
}
