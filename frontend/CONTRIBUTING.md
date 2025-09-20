# Contributing to Virtual Counsellor

Thank you for your interest in contributing to Virtual Counsellor! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide browser and OS information
- Include screenshots if applicable

### Suggesting Features
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Include mockups or examples if possible

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test thoroughly
6. Submit a pull request

#### Development Workflow
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Virtual_Counsellor.git
cd Virtual_Counsellor

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev

# Make your changes and test
npm run lint
npm run build

# Commit and push
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

## 📋 Code Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary

### React Components
- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and default values

### Styling
- Use MUI's `styled` API for component styling
- Follow the existing theme structure
- Use theme tokens for colors and spacing
- Ensure responsive design

### Code Style
- Use ESLint configuration provided
- Follow consistent naming conventions
- Write meaningful commit messages
- Add comments for complex logic

## 🧪 Testing Guidelines

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari)
- Verify responsive design on different screen sizes
- Check accessibility with screen readers
- Test keyboard navigation

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] Components are properly typed
- [ ] Responsive design is maintained
- [ ] No console errors or warnings
- [ ] Performance is not degraded
- [ ] Accessibility standards are met

## 📁 Project Structure Guidelines

### Component Organization
```
src/components/
├── common/          # Reusable components
├── sections/        # Page sections
└── ui/             # Basic UI components
```

### File Naming
- Use PascalCase for component files: `MyComponent.tsx`
- Use camelCase for utility files: `apiHelpers.ts`
- Use kebab-case for assets: `hero-image.jpg`

### Import Organization
```typescript
// 1. React imports
import React from 'react';

// 2. Third-party imports
import { Button } from '@mui/material';

// 3. Internal imports
import { theme } from '../theme';
import MyComponent from './MyComponent';
```

## 🎨 Design Guidelines

### Visual Consistency
- Follow the established color palette
- Use consistent spacing (8px grid system)
- Maintain typography hierarchy
- Ensure proper contrast ratios

### Component Design
- Create reusable, composable components
- Use props for customization
- Implement proper hover and focus states
- Consider loading and error states

## 📝 Documentation

### Code Documentation
- Document complex functions and algorithms
- Use JSDoc for public APIs
- Include usage examples for components

### README Updates
- Update README for new features
- Include setup instructions for new dependencies
- Add screenshots for UI changes

## 🚀 Deployment

### Before Submitting PR
- [ ] Code builds without errors
- [ ] All linting passes
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] Responsive design verified

### Pull Request Guidelines
- Use descriptive PR titles
- Include detailed description of changes
- Reference related issues
- Add screenshots for UI changes
- Request review from maintainers

## 🏷️ Commit Message Format

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process or auxiliary tool changes

Examples:
```
feat(navigation): add mobile hamburger menu
fix(hero): resolve image loading issue on mobile
docs(readme): update installation instructions
```

## 🎯 Priority Areas

We're particularly interested in contributions for:
- Mobile responsiveness improvements
- Accessibility enhancements
- Performance optimizations
- Animation and interaction improvements
- Additional career guidance features

## 📞 Getting Help

- Join our Discord community: [link]
- Email the maintainers: dev@virtualCounsellor.com
- Check existing issues and discussions

## 📄 License

By contributing to Virtual Counsellor, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Virtual Counsellor! 🚀