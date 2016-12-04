import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import App from '../feature1/app';


storiesOf('first feature', module)
  .add('default view', () => (
    <App onClickDebug={ action('button clicked') }>Hello</App>
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
