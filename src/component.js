import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'wenk/dist/wenk.css';
import './datepicker.css';
import './tooltip.css';
import {cloneDeep, find, forEach, kebabCase} from 'lodash'
import moment from "moment";

const eventsToEmit = [
  'onChange',
  'onClose',
  'onDestroy',
  'onMonthChange',
  'onOpen',
  'onYearChange',
];

const coerceArray = (val) => {
  return Array.isArray(coerceArray) ? val : [val];
};

const config = {
  inline: true,
  wrap: false,
  defaultDate: null,
  disable: [
    (date) => moment(date).isBefore(moment().startOf('d'))
  ]
};

export default {
  name: 'datepicker',
  render(el) {
    return el('span', {
      props: {
        disabled: this.disabled
      }
    })
  },
  props: {
    config: {
      type: Object,
      default: () => config
    },
    events: {
      type: Array,
      default: () => eventsToEmit
    },
    available: {
      type: Array,
      default: () => []
    },
    partial: {
      type: Array,
      default: () => []
    },
    unavailable: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fp: null,
    };
  },
  mounted() {
    if (this.fp) return;
    let config = cloneDeep(this.config);
    forEach(this.events, event => {
      config[event] = [
        ...(config[event] || []),
        ...([(...args) => this.$emit(kebabCase(event), ...args)])
      ]
    });
    config.onDayCreate = [
      ...(config.onDayCreate || []),
      ...([(dObj, dStr, fp, dayElem) => {
        const date = moment(dayElem.dateObj).startOf('d');
        let className = '';
        let tooltip = '';

        forEach(['available', 'partial', 'unavailable'], key => {
          const v = find(this[key], _d => date.isSame(moment(_d.date).startOf('d')));
          if (v) {
            className = key;
            tooltip = `${v.value}`;
          }
        });
        if (className) {
          dayElem.classList.add(className)
        }
        if (tooltip) {
          dayElem.setAttribute('data-wenk', tooltip)
        }
      }])
    ];
    this.fp = new Flatpickr(this.getElem(), config);
  },
  methods: {
    getElem() {
      return this.config.wrap ? this.$el.parentNode : this.$el
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.fp.redraw();
      }
    },
    partial: {
      deep: true,
      handler() {
        this.fp.redraw();
      }
    },
    unavailable: {
      deep: true,
      handler() {
        this.fp.redraw();
      }
    },
    available: {
      deep: true,
      handler(newConfig) {
        let config = cloneDeep(newConfig);
        eventsToEmit.forEach((hook) => {
          delete config[hook];
        });
        this.fp.set(config);
      }
    }
  },
  beforeDestroy() {
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }
  },
};
