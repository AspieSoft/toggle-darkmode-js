# Toggle DarkMode JS

[![paypal](https://img.shields.io/badge/buy%20me%20a%20coffee-paypal-blue)](https://buymeacoffee.aspiesoft.com/)

Easily toggle dark mode and auto detect if user device prefers dark mode.
Auto detects the brightness of each color, and decides wether or not it should be inverted.
Auto detects DOM updates and converts new elements to dark mode as needed.
Can also convert already dark sites to light mode.
Avoids changing colors with a center brightness.
Reverses filters on images, iframes, videos, embeds, ect.

## Installation

```html

<!-- Depends On jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/gh/AspieSoft/toggle-darkmode-js/script.min.js"></script>

```

## Usage

```JavaScript

// this function runs automatically, so usage is optional

DarkMode.toggle(); // toggles dark mode on or off
DarkMode.toggle('dart'); // toggles darkmode on
DarkMode.toggle('light'); // toggles darkmode off

DarkMode.ignore(['script', 'style', 'br']); // add to the list of element tags to ignore (for hidden elements)
DarkMode.invert(['img', 'iframe', 'embed']); // add to the list of element tags to invert (to reverse and undo filters)

```

```html

<input type="button" value="Toggle Dark Mode" onclick="DarkMode.toggle()">

```
