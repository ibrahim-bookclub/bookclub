# 📚 Book Club CLI Tool

A command-line tool to update the current book in the book club website. This tool automatically moves the current book to the "Previously Read" section and sets a new book as the current one.

## 🚀 Quick Start

### Prerequisites
- Node.js installed on your system
- npm package manager

### Installation
The dependencies are automatically installed when you first run the script:

```bash
# Make sure you're in the bookclub directory
cd /path/to/bookclub

# Run the update command (installs dependencies if needed)
./update-book --help
```

## 📖 Usage

### Basic Command Structure
```bash
./update-book --title "Book Title" --author "Author Name" [--link "URL"]
```

### Options
- `--title`, `-t`: Title of the new book (required)
- `--author`, `-a`: Author of the new book (required)  
- `--link`, `-l`: Optional link to the book (e.g., Goodreads URL)
- `--help`, `-h`: Show help message

### Examples

#### Update with Arabic book
```bash
./update-book --title "الأسود يليق بك" --author "أحلام مستغانمي"
```

#### Update with English book and Goodreads link
```bash
./update-book -t "1984" -a "George Orwell" -l "https://www.goodreads.com/book/show/40961427"
```

#### Update with long Arabic title
```bash
./update-book --title "مئة عام من العزلة" --author "غابرييل غارثيا ماركيث" --link "https://www.goodreads.com/book/show/99769"
```

## 🔄 What It Does

1. **Reads Current Book**: Extracts the current book information from `index.html`
2. **Moves to History**: Adds the current book to the "Previously Read Books" section
3. **Updates Current**: Sets the new book as the current book
4. **Preserves HTML**: Maintains all existing formatting and structure

### Before Update
```
Current Book: أباطيل وأسمار - محمود محمد شاكر
Previous Books: [نشأة الفقه الإسلامي وتطوره - وائل حلاق]
```

### After Update
```
Current Book: الأسود يليق بك - أحلام مستغانمي  
Previous Books: [أباطيل وأسمار - محمود محمد شاكر, نشأة الفقه الإسلامي وتطوره - وائل حلاق]
```

## 🛠 Alternative Usage Methods

### Using npm script
```bash
npm run update-book -- --title "Book Title" --author "Author Name"
```

### Direct Node.js execution
```bash
node update-book.js --title "Book Title" --author "Author Name" --link "URL"
```

## 📁 Files Modified

- `index.html`: The main HTML file where book information is updated
- No other files are modified, making this tool safe to use

## 🔍 Troubleshooting

### "index.html not found"
Make sure you're running the command from the bookclub directory where `index.html` is located.

### "Current book elements not found in HTML"
The HTML structure might have changed. Ensure the elements with IDs `current-book-link` and `current-book-author` exist.

### Dependencies not installing
Run manually:
```bash
npm install jsdom
```

## 🚦 Status Indicators

- ✅ Success: Book updated successfully
- ❌ Error: Problem occurred (with description)
- 📖 Info: Current book being moved
- 📚 Info: New current book set
- 📋 Info: Previous book added to history

## 🤝 Contributing

To modify the CLI tool:

1. Edit `update-book.js` for the main logic
2. Edit `update-book` bash wrapper for shell integration
3. Test with `./update-book --help` and actual updates
4. Ensure Arabic text handling works correctly

## 📝 License

This tool is part of the Ibrahim Book Club project.