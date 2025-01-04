# RemixExpenses

A modern expense tracking application built with Remix, React, and TypeScript. Manage your personal or business expenses with an intuitive interface, detailed analytics, and secure user authentication.

## Features

- 🔐 **Secure Authentication**: User registration and login with encrypted password storage
- 💰 **Expense Management**: Create, edit, and delete expense entries
- 📊 **Visual Analytics**: View expense trends with interactive charts and statistics
- 📱 **Responsive Design**: Fully responsive interface that works on desktop and mobile
- 🔄 **Real-time Updates**: Instant UI updates using Remix's data mutations
- 📤 **Data Export**: Export expense data in raw format

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd remix-expense-tool
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="your_mongodb_connection_string"
SESSION_SECRET="your_session_secret"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## Configuration

### Database
The project uses MongoDB as the database, configured through Prisma. The schema is defined in `prisma/schema.prisma` and includes:
- User management
- Expense tracking
- Relationships between users and their expenses

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS modules for component-specific styles
- Google Fonts integration (Inter font family)

## Project Structure

```
app/
├── components/    # React components
├── data/         # Server-side data handling
├── routes/       # Application routes
├── styles/       # CSS styles
└── types/        # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for new features
- Update tests when modifying functionality
- Document new features or changes

## Testing

Run the test suite:
```bash
npm run typecheck   # Type checking
npm run lint       # Linting
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built with [Remix](https://remix.run/)
- Database powered by [Prisma](https://www.prisma.io/) and MongoDB
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## Requirements

- Node.js >= 20.0.0
- MongoDB database
- Modern web browser

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
