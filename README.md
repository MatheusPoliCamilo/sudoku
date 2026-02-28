# Sudoku

A Sudoku validation game built with vanilla JavaScript. Play locally or online at [matheuspolicamilo.github.io/sudoku](https://matheuspolicamilo.github.io/sudoku/).

![Sudoku](https://user-images.githubusercontent.com/25781749/174700782-0864b6ba-a9ef-480a-a521-24fcddece29e.png)

## About

Sudoku is a logic puzzle created by Howard Garns. The goal is to fill a 9×9 grid so that each row, column, and 3×3 region contains the digits 1–9 exactly once. This project implements a playable Sudoku board with **real-time validation** that highlights cells with incorrect values.

## Features

- Interactive 9×9 Sudoku board
- Real-time validation (invalid cells highlighted in red)
- Click to select a cell, then choose a number (1–9) or erase
- Reset button to start over
- Object-oriented design (`Sudoku` and `Validator` classes)
- Built with ES6, Lodash, HTML & CSS

## Getting Started

### Prerequisites

- A modern browser with ES6 support
- No build step required

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MatheusPoliCamilo/sudoku.git
   cd sudoku
   ```

2. Open `index.html` in your browser, or serve the folder with any static file server.

Lodash is loaded via CDN in `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js"></script>
```

### Usage

1. Click a cell to select it (highlighted in blue).
2. Click a number (1–9) below the board to place it in the selected cell.
3. Click the eraser icon to clear the selected cell.
4. Click the reset icon to reload the puzzle.
5. Invalid cells (duplicates in row, column, or block) are highlighted in red.

## Project Structure

```
sudoku/
├── index.html   # Board markup, styles, and UI
├── script.js    # Sudoku logic, validation, and event handlers
└── README.md
```

## Tech Stack

- **JavaScript (ES6)** – Game logic and OOP
- **Lodash** – Array utilities (`_.without`, `_.uniq`, `_.find`, etc.)
- **HTML & CSS** – Layout and styling
- **GitHub Pages** – Static hosting

## Author

**Matheus Poli** – [GitHub](https://github.com/MatheusPoliCamilo) – [LinkedIn](https://www.linkedin.com/in/matheus-poli-332593127/)
