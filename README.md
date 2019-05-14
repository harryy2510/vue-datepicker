# Vue Datepicker Component

Vue.js component for [Flatpickr](https://chmln.github.io/flatpickr/) datepicker

## Installation
```bash
# npm
npm install @harryy/vue-flatpickr --save

# Yarn
yarn add @harryy/vue-flatpickr
```

## Usage
#### Minimal example
```html
<template>
  <div>
    <datepicker v-model="date"></flat-pickr>
  </div>
</template>

<script>
  import datepicker from '@harryy/datepicker';
  
  export default {    
    data () {
      return {
        date: null,       
      }
    },
    components: {
      datepicker
    }
  }
</script>
```

## Events
```html
<datepicker v-model="date" @on-change="doSomethingOnChange" @on-close="doSomethingOnClose"></flat-pickr>
```
