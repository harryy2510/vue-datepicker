<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark shadow-sm mb-3">
      <span class="navbar-brand mb-0">Vue Datepicker Demo</span>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/harryy2510/vue-datepicker" target="_blank">GitHub</a>
        </li>
      </ul>
    </nav>

    <main class="container">
      <div class="row">
        <div class="col-md-8">
          <datepicker :available="available" :partial="partial" :unavailable="unavailable"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue';
  import datepickerComponent from '../src/index.js';
  import moment from "moment";
  Vue.use(datepickerComponent);
  export default {
    name: 'app',
    data() {
      return {
        available: [
          {
            date: moment().add(1, 'd'),
            value: '500 available'
          }
        ],
        partial: [
          {
            date: moment().add(9, 'd'),
            value: '20 available'
          }
        ],
        unavailable: [
          {
            date: moment().add(3, 'd'),
            value: 'No availability'
          }
        ]
      }
    },
    methods: {
    },
    mounted() {
      setTimeout(() => {
        this.available = [{
          date: moment().add(12, 'd'),
          value: '20 available'
        }]
        this.unavailable = [{
          date: moment().add(8, 'd'),
          value: '20 available'
        }]
        this.partial = [{
          date: moment().add(2, 'd'),
          value: '20 available'
        }]
      }, 3000)
    }
  }
</script>
