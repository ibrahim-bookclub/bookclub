#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// CLI argument parsing
const args = process.argv.slice(2);

function showHelp() {
    console.log(`
📚 Book Club Update CLI

Usage:
  node update-book.js --title "Book Title" --author "Author Name" [--link "URL"]
  node update-book.js --help

Options:
  --title, -t    Title of the new book (required)
  --author, -a   Author of the new book (required)  
  --link, -l     Optional link to the book (e.g., Goodreads URL)
  --help, -h     Show this help message

Examples:
  node update-book.js --title "الأسود يليق بك" --author "أحلام مستغانمي"
  node update-book.js -t "1984" -a "George Orwell" -l "https://www.goodreads.com/book/show/40961427"
    `);
}

function parseArgs(args) {
    const parsed = {};
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg === '--help' || arg === '-h') {
            showHelp();
            process.exit(0);
        }
        
        if (arg === '--title' || arg === '-t') {
            parsed.title = args[++i];
        } else if (arg === '--author' || arg === '-a') {
            parsed.author = args[++i];
        } else if (arg === '--link' || arg === '-l') {
            parsed.link = args[++i];
        }
    }
    
    return parsed;
}

function updateBookInHTML(newBook) {
    const htmlPath = path.join(__dirname, 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ Error: index.html not found');
        process.exit(1);
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    
    // Get current book info
    const currentBookLink = document.querySelector('#current-book-link');
    const currentBookAuthor = document.querySelector('#current-book-author');
    
    if (!currentBookLink || !currentBookAuthor) {
        console.error('❌ Error: Current book elements not found in HTML');
        process.exit(1);
    }
    
    const currentBook = {
        title: currentBookLink.textContent.trim(),
        author: currentBookAuthor.textContent.trim(),
        link: currentBookLink.href || '#'
    };
    
    console.log('📖 Current book to be moved to previous books:');
    console.log(`   Title: ${currentBook.title}`);
    console.log(`   Author: ${currentBook.author}`);
    
    // Update current book with new book
    currentBookLink.textContent = newBook.title;
    currentBookLink.href = newBook.link || '#';
    currentBookAuthor.textContent = newBook.author;
    
    // Add old book to previous books list
    const booksGrid = document.querySelector('#books-grid');
    if (!booksGrid) {
        console.error('❌ Error: Books grid not found in HTML');
        process.exit(1);
    }
    
    // Create new book card for the previous book
    const newBookCard = document.createElement('div');
    newBookCard.className = 'book-card';
    
    const bookInfo = document.createElement('div');
    bookInfo.className = 'book-info';
    
    const bookTitle = document.createElement('h3');
    bookTitle.className = 'book-title';
    
    const bookLink = document.createElement('a');
    bookLink.href = currentBook.link;
    bookLink.target = '_blank';
    bookLink.textContent = currentBook.title;
    
    const bookAuthor = document.createElement('p');
    bookAuthor.className = 'book-author';
    bookAuthor.textContent = currentBook.author;
    
    bookTitle.appendChild(bookLink);
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    newBookCard.appendChild(bookInfo);
    
    // Insert at the beginning of the books grid
    booksGrid.insertBefore(newBookCard, booksGrid.firstChild);

    // Update the books counter (أسفار طالعناها)
    const statNumbers = document.querySelectorAll('.stat-number');
    for (const stat of statNumbers) {
        const label = stat.parentElement.querySelector('.stat-label');
        if (label && label.textContent.includes('أسفار طالعناها')) {
            // Count all book cards in the books grid
            const bookCount = booksGrid.querySelectorAll('.book-card').length;
            // Convert to Arabic numerals
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const arabicCount = String(bookCount).split('').map(d => arabicNumerals[parseInt(d)]).join('');
            stat.textContent = arabicCount + '+';
            break;
        }
    }

    // Update the reading month to current month
    const readingMonth = document.querySelector('.reading-month');
    if (readingMonth) {
        const arabicMonths = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const now = new Date();
        const month = arabicMonths[now.getMonth()];
        const year = String(now.getFullYear()).split('').map(d => arabicNumerals[parseInt(d)]).join('');
        readingMonth.textContent = `${month} ${year}`;
    }

    // Write updated HTML back to file
    const updatedHTML = dom.serialize();
    fs.writeFileSync(htmlPath, updatedHTML);
    
    console.log('\n✅ Book updated successfully!');
    console.log('📚 New current book:');
    console.log(`   Title: ${newBook.title}`);
    console.log(`   Author: ${newBook.author}`);
    if (newBook.link) {
        console.log(`   Link: ${newBook.link}`);
    }
    console.log('\n📋 Previous book added to reading history.');
}

function main() {
    const options = parseArgs(args);
    
    if (!options.title || !options.author) {
        console.error('❌ Error: Both title and author are required');
        console.error('Use --help for usage information');
        process.exit(1);
    }
    
    const newBook = {
        title: options.title,
        author: options.author,
        link: options.link
    };
    
    try {
        updateBookInHTML(newBook);
    } catch (error) {
        console.error('❌ Error updating book:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { updateBookInHTML, parseArgs };