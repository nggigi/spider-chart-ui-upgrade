import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public stylingOverride = `
    // Custom Theming for Angular Material
@use '@angular/material' as mat;
// For more information: https://material.angular.io/guide/theming
// @import '@angular/material/theming';
// Plus imports for other components in your app. <br>

$custom-typography: mat.define-typography-config(
  $font-family: 'Gilroy-Regular, serif',
);
// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// Be sure that you only ever include this mixin once!
// @include mat.core($custom-typography);
@include mat.core();

// Define the palettes for your theme using the Material Design palettes available in palette.scss
// (imported above). For each palette, you can optionally specify a default, lighter, and darker
// hue. Available color palettes: https://material.io/design/color/
$ns-add-in-primary: mat.define-palette(mat.$indigo-palette);
$ns-add-in-accent: mat.define-palette(mat.$pink-palette);

// The warn palette is optional (defaults to red).
$ns-add-in-warn: mat.define-palette(mat.$red-palette);

// Create the theme object (a Sass map containing all of the palettes).
$ns-add-in-theme: mat.define-dark-theme(
  (
    color: (
      primary: $ns-add-in-primary,
      accent: $ns-add-in-accent,
      warn: $ns-add-in-warn,
    ),
    typography: $custom-typography,
    density: -12,
  )
);

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component
// that you are using.
@include mat.all-component-themes($ns-add-in-theme);

@font-face {
  font-family: 'Gilroy-Medium';
  src: url('../assets/fonts/gilroy/Gilroy-Medium_0.ttf');
}

@font-face {
  font-family: 'Gilroy-SemiBold';
  src: url('../assets/fonts/gilroy/Gilroy-SemiBold_0.ttf');
}

@font-face {
  font-family: 'Gilroy-Regular';
  src: url('../assets/fonts/gilroy/Gilroy-Regular_0.ttf');
}

@font-face {
  font-family: 'Gilroy-Bold';
  src: url('../assets/fonts/gilroy/Gilroy-Bold_0.ttf');
}

@font-face {
  font-family: 'Gilroy-Thin';
  src: url('../assets/fonts/gilroy/Gilroy-Thin_0.ttf');
}

@import 'node_modules/ngx-spider-chart/src/lib/shared-styles/styles.scss';

  `;
}
