# Description
Basic UX React Components
Use the awesome Ant components library if you can't find what you need here :
* https://ant.design/docs/react/introduce
* https://mobile.ant.design/docs/react/introduce

# Installation
```bash
yarn add @micabe/components --ignore-scripts
or
npm install @micabe/components --ignore-scripts
```

# Running the Storybook
```bash
yarn start
```

### Get the modules!
```javascript
import {
  ActionBar, // with styles
  AsyncButton, // with styles
  Dropdown,  // with styles
  DualSlider,  // with styles
  Notification,  // with styles
  OffCanvas,
  CssSpinner, // with styles
  CanvasSpinner,
  ZoomedImage,
} from '@micabe/components'
```

### Load basic styles in sass!
```scss
@import '~@micabe/components/lib/styles/AsyncButton';
```

### Override scss variables
```scss
$brand-primary:           #f442bf;
$brand-success:           #46c976;
$brand-info:              #4286f4;
$lighter-grey:            #ddd;
$light-grey:              #aaa;
$grey:                    #999;
$dark-grey:               #666;
$darker-grey:             #333;
$async-btn-color:         #862fa3;
$action-bar-spacing:      40px;
```
