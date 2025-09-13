# Contributing to MindMate

Thank you for your interest in contributing to MindMate! This document provides guidelines for contributing to our mental health companion application.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your forked repository locally

### 2. Set Up Development Environment
```bash
# Clone your fork
git clone https://github.com/yourusername/mindmate.git
cd mindmate

# Install dependencies
npm install
cd client && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 5. Test Your Changes
```bash
# Run tests
npm test

# Test the application
npm run dev
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "Add: brief description of your changes"
```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 📋 Development Guidelines

### Code Style
- Use meaningful variable and function names
- Follow JavaScript/React best practices
- Use consistent indentation (2 spaces)
- Add JSDoc comments for functions

### Commit Messages
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests

### File Structure
- Keep components small and focused
- Use proper folder organization
- Follow the existing naming conventions

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

### Feature Requests
For feature requests, please include:
- Clear description of the feature
- Use case and benefits
- Mockups or examples if possible

## 🧪 Testing

### Running Tests
```bash
# Client tests
cd client && npm test

# Server tests
npm test

# All tests
npm run test:all
```

### Writing Tests
- Write tests for new features
- Aim for good test coverage
- Use descriptive test names
- Test both success and error cases

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Update README.md for new features
- Keep API documentation current

### User Documentation
- Update user guides for new features
- Add screenshots for UI changes
- Keep installation instructions current

## 🔒 Security

### Security Guidelines
- Never commit sensitive information
- Use environment variables for secrets
- Validate all user inputs
- Follow security best practices

### Reporting Security Issues
- Email security issues to security@mindmate.app
- Do not create public issues for security problems
- Include detailed information about the vulnerability

## 🎨 UI/UX Guidelines

### Design Principles
- Follow accessibility guidelines (WCAG 2.1)
- Use consistent color scheme and typography
- Ensure responsive design
- Maintain user-friendly interface

### Component Guidelines
- Create reusable components
- Use proper prop types
- Follow React best practices
- Ensure components are accessible

## 📦 Dependencies

### Adding Dependencies
- Use npm for package management
- Add to appropriate package.json (root or client)
- Update documentation if needed
- Consider security implications

### Updating Dependencies
- Keep dependencies up to date
- Test thoroughly after updates
- Check for breaking changes
- Update documentation if needed

## 🚀 Release Process

### Version Numbering
We use semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Changelog updated
- [ ] Security review completed

## 💬 Communication

### Getting Help
- Check existing issues and discussions
- Join our community Discord
- Ask questions in GitHub discussions

### Code Reviews
- Be constructive and respectful
- Focus on the code, not the person
- Provide specific feedback
- Suggest improvements

## 📄 License

By contributing to MindMate, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to MindMate! Together, we can make mental health support more accessible to everyone.
