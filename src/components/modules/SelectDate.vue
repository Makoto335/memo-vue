<template>
  <div class="test">
    <div>
      <select v-model="y">
        <option v-for="(item, index) in years" :key="index">{{ item }}</option>
      </select>
      年
    </div>
    <div>
      <select v-model="m">
        <option v-for="(item, index) in months" :key="index">
          {{ item }}
        </option></select
      >月
    </div>
    <div>
      <select v-model="d">
        <option v-for="(item, index) in days" :key="index">
          {{ item }}
        </option></select
      >日
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
  name: "DateSelector",
  props: {
    modelValue: { type: Date },
  },
  data() {
    return {
      years: [...Array(120)].map((_, i) => dayjs().year() - i),
      months: [...Array(12)].map((_, i) => i + 1),
      days: [...Array(31)].map((_, i) => i + 1),
    };
  },
  computed: {
    y: {
      get() {
        return dayjs(this.modelValue).year();
      },
      set(newY) {
        const newDate = dayjs(`${newY}-${this.m}-${this.d}`).toDate();
        const validation = dayjs(
          `${newY}-${this.m}-${this.d}`,
          "YYYY-M-D",
          true
        ).isValid();
        const validation2 = dayjs(
          `${newY}-${this.m}-${this.d}`,
          "YYYY-M-D",
          true
        ).isBefore();
        console.log(validation, validation2);
        this.$emit("update:modelValue", newDate);
        console.log(newDate);
      },
    },
    m: {
      get() {
        return dayjs(this.modelValue).month() + 1;
      },
      set(newM) {
        const newDate = dayjs(`${this.y}-${newM}-${this.d}`).toDate();
        const validation = dayjs(
          `${this.y}-${newM}-${this.d}`,
          "YYYY-M-D",
          true
        ).isValid();
        const validation2 = dayjs(
          `${this.y}-${newM}-${this.d}`,
          "YYYY-M-D",
          true
        ).isBefore();
        console.log(validation, validation2);
        console.log(validation);
        console.log(newDate);
        this.$emit("update:modelValue", newDate);
      },
    },
    d: {
      get() {
        return dayjs(this.modelValue).date();
      },
      set(newD) {
        const newDate = dayjs(`${this.y}-${this.m}-${newD}`).toDate();
        const validation = dayjs(
          `${this.y}-${this.m}-${newD}`,
          "YYYY-M-D",
          true
        ).isValid();
        console.log(validation);
        console.log(newDate);
        this.$emit("update:modelValue", newDate);
      },
    },
  },
};
</script>
<style scoped lang="scss">
.test {
  display: flex;
}
</style>
