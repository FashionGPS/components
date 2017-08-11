import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import Carousel from 'react-flex-carousel'
import './Carousel.scss'

storiesOf('Responsive carousel')
  .add(
    'Module',
    withInfo()(() => (
      <div style={{ marginTop: 50 }}>
        <Carousel autoplayInteval={false} indicator switcher>
          <a href="#" style={{ backgroundImage: 'url(http://placekitten.com/1000/700)' }}>
            <div className="overlay">Little cute cat 1</div>
          </a>
          <a href="#" style={{ backgroundImage: 'url(http://placekitten.com/1000/700)' }}>
            <div className="overlay">Little cute cat 2</div>
          </a>
          <a href="#" style={{ backgroundImage: 'url(http://placekitten.com/1000/700)' }}>
            <div className="overlay">Little cute cat 3</div>
          </a>
          <a href="#" style={{ backgroundImage: 'url(http://placekitten.com/1000/700)' }}>
            <div className="overlay">Little cute cat 4</div>
          </a>
          <a href="#" style={{ backgroundImage: 'url(http://placekitten.com/1000/700)' }}>
            <div className="overlay">Little cute cat 5</div>
          </a>
          <a href="#" style={{ backgroundImage: 'url(http://placekitten.com/1000/700)' }}>
            <div className="overlay">Little cute cat 6</div>
          </a>
        </Carousel>
      </div>
    )))
