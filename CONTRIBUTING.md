# Contributing to Anime Wallpapers

Thank you for your interest in contributing to Anime Wallpapers! We welcome contributions from the community.

## 🤔 How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Browser and OS version**

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

- **Clear description** of the feature
- **Use case** - why this feature would be useful
- **Possible implementation** ideas (optional)

### Adding Wallpapers

To add new wallpapers to the collection:

1. Ensure you have permission to share the artwork
2. Add the wallpaper to the appropriate directory
3. Update the `data/wallpapers.json` file with:
   - Anime title
   - Artist credit (with link if available)
   - Resolution
   - Categories/tags

### Code Contributions

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes

## 📝 Code Style Guidelines

- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful variable and function names**
- Keep components **small and focused**
- Add **PropTypes** or TypeScript types where applicable

## 🧪 Testing

Before submitting a PR:

- Test the development build: `npm run dev`
- Test the production build: `npm run build && npm run start`
- Check for console errors
- Test on different screen sizes
- Verify all links work

## 📋 Pull Request Process

1. Update the README.md if needed
2. Update documentation for any API changes
3. Your PR will be reviewed by maintainers
4. Address any requested changes
5. Once approved, your PR will be merged

## ⚖️ Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to create an issue with the "question" label if you need help or clarification.

---

Thank you for contributing! 🎉
