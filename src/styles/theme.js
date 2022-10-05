import { createGlobalStyle } from "styled-components";

export const theme = {
  color: {
    bg: {
      md: "rgb(244 244 245)", // 100
      lg: "rgb(228 228 231)", //  200
      xl: "rgb(212 212 216)", // 300
      full: "white",
    },
    textColor: {
      xxs: "rgb(228 228 231)", //200
      xs: "rgb(212 212 216)", //300
      sm: "rgb(161 161 170)", // 400
      md: "rgb(39 39 42)", // 800
      lg: "rgb(24 24 27)", // 900
    },
    activeColor: {
      xs: "rgb(147 197 253)", //300
      sm: "rgb(96 165 250)", //400
      md: "rgb(59 130 246)", //500
      lg: "rgb(37 99 235)", // 600
      xl: "rgb(29 78 216)", // 700
    },
    highlight: {
      xs: "rgb(253 186 116)", //300
      sm: "rgb(251 146 60)", //400
      md: "rgb(249 115 22)", // 500
      lg: "rgb(234 88 12)", // 600
      xl: "rgb(194 65 12)", //700
    },
    red: {
      xs: "rgb(253 164 175)", //300
      sm: "rgb(251 113 133)", //400
      md: "rgb(244 63 94)", // 500
      lg: "rgb(225 29 72)", // 600
      xl: "rgb(190 18 60)", //700
    },
  },
  textSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "1.875rem",
    xxxxl: "2.5rem",
  },

  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  maxWidth: {
    sm: "36rem",
    md: "42rem",
    lg: "48rem",
    xl: "56rem",
  },
  mp: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.5rem",
    xxxl: "3rem",
    xxxxl: "3.5rem",
  },
  transition: {
    sm: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    md: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
    lg: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  responsive: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

* { 
  box-sizing: border-box;
}

body {
	line-height: 1.2;
  font-family: 'Source Sans Pro', sans-serif;
  color: ${(props) => props.theme.color.textColor.lg};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a { 
  text-decoration: none;
  color: inherit;
}

input, button  { 
  border: none;
  outline: none;
  background-color : transparent;
}

`;
