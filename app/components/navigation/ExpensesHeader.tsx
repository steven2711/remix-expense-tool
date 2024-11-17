import { NavLink, useLoaderData, Form, Link } from '@remix-run/react';

import Logo from '../util/Logo';

function ExpensesHeader() {
  const userId = useLoaderData();
  console.log('USERID', userId);

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses">Manage Expenses</NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        {userId ? (
          <Form method="post" action="/logout" id="logout-form">
            <button className="cta-alt">Logout</button>
          </Form>
        ) : (
          <Link to="/auth" className="cta">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default ExpensesHeader;
