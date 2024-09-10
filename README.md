# ImportLadder

ImportLadder🪜 is a powerful VS Code extension that simplifies and organizes your import statements in JavaScript and TypeScript files. It helps you maintain a clean and structured codebase by automatically sorting and grouping your imports.

## Features

ImportLadder offers the following key features:

- **Automatic Import Sorting**: Sorts your imports alphabetically and by type (e.g., built-in modules, third-party packages, local imports).
- **Import Grouping**: Groups imports based on their origin, making your code more readable and organized.
- **Custom Configuration**: Allows you to define your own sorting and grouping rules to match your project's coding style.
- **On-Save Formatting**: Automatically sorts and organizes imports when you save a file (optional).
- **Manual Trigger**: Provides a command to manually sort imports in the current file or selected text.

# Example 

Before:
```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { API_URL, DEFAULT_TIMEOUT } from './constants';
import React from 'react';
import moment from 'moment';
import { formatDate } from '../utils/dateUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import as actionCreators from './actions';
import logger from './logger';
```

After:
```javascript
import './styles.css';
import axios from 'axios';
import React from 'react';
import moment from 'moment';
import logger from './logger';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import as actionCreators from './actions';
import { useState, useEffect } from 'react';
import { formatDate } from '../utils/dateUtils';
import { API_URL, DEFAULT_TIMEOUT } from './constants';
```

## Installation

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "ImportLadder"
4. Click Install

## Usage

ImportLadder works out of the box with default settings. To manually sort imports:

1. Open a JavaScript or TypeScript file
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette
3. Type "Import Ladder" and select the ImportLadder command

### Keyboard Shortcut

You can quickly run the Import Ladder extension using the following keyboard shortcut:

- macOS: `Cmd+Shift+I`
- Windows/Linux: `Ctrl+Shift+I`

This shortcut will arrange your JavaScript import statements in ascending or descending order when your cursor is in a text editor.

To use the shortcut:

1. Open a JavaScript or TypeScript file in VS Code.
2. Place your cursor anywhere in the file.
3. Press `Cmd+Shift+I` (on macOS) or `Ctrl+Shift+I` (on Windows/Linux).

The import statements in your file will be automatically arranged according to the extension's settings.

Note: The shortcut will only work when a text editor has focus.

## Extension Settings

This extension contributes the following settings:

* `importladder.enable`: Enable/disable ImportLadder.
* `importladder.sortOnSave`: Enable/disable automatic import sorting on file save.
* `importladder.groupRules`: Define custom grouping rules for imports.

## Configuration Example
