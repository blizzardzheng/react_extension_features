import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import App from '../feature1/app.jsx';

storiesOf('App', module)
  .add('default view', () => (
    <App onClick={ action('button clicked') }>Hello</App>
  ))
  .add('some emojies as the text', () => (
    <App>😀 😎 👍 💯</App>
  ))
  .add('custom styles', () => {
    const style = {
      fontSize: 20,
      textTransform: 'uppercase',
      color: '#FF8833',
    };
    return (
      <App style={ style }>Hello</App>
    );
  });
