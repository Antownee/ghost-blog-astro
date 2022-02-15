/* global */

'use strict';

// ACCENT COLOR

function hexToHSL(hex, lightadjust = 0) {
    let r = 0;
    let g = 0;
    let b = 0;
    if (hex.length === 4) {
        r = `0x${hex[1]}${hex[1]}`;
        g = `0x${hex[2]}${hex[2]}`;
        b = `0x${hex[3]}${hex[3]}`;
    } else if (hex.length === 7) {
        r = `0x${hex[1]}${hex[2]}`;
        g = `0x${hex[3]}${hex[4]}`;
        b = `0x${hex[5]}${hex[6]}`;
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;
    if (delta === 0) {
        h = 0;
    } else if (cmax === r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    l += lightadjust;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function configureAccentColors() {
    const rootElement = document.documentElement;
    let accentColor = getComputedStyle(rootElement).getPropertyValue('--ghost-accent-color');
    if (accentColor) {
        accentColor = accentColor.trim();
        if (accentColor === '#000000') return;
        rootElement.style.setProperty('--color-accent-lighter', hexToHSL(accentColor, 45));
        rootElement.style.setProperty('--color-accent-light', hexToHSL(accentColor, 10));
        rootElement.style.setProperty('--color-accent', hexToHSL(accentColor));
        rootElement.style.setProperty('--color-accent-dark', hexToHSL(accentColor, -10));
        rootElement.style.setProperty('--color-accent-darker', hexToHSL(accentColor, -20));
    }
}

configureAccentColors();
