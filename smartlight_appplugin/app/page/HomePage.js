import React from 'react';
import Home from '../view/Home';

export default class HomePage extends Bone.Page {
  render() {
    const params = Bone.query;
    return <Home {...params} />;
  }
}
