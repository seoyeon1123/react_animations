import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import ToDoList from './components/ToDoList';

const GlobalStyled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: "Lato";
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
  display: none;
}

body {
  line-height: 1;
  font-family: 'Lato', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color : ${(props) => props.theme.textColor};
}

h1 {
  font-family: 'Lato', sans-serif; /* 제목에 대한 폰트 설정 */
  font-size: 30px; /* 제목에 대한 글꼴 크기 설정 */
}

p {
  font-family: 'Courier New', monospace; /* 내용에 대한 폰트 설정 */
  font-size: 16px; /* 내용에 대한 글꼴 크기 설정 */
}

a {
  text-decoration: none;
  color: inherit;
}
`;

const App = () => {
  return (
    <>
      <GlobalStyled />
      <ToDoList />
    </>
  );
};
export default App;
