<template>
  <div class="DateOfBirthSelector">
    <label>{{ label }}</label>
    <div class="DateOfBirthSelector_Wrapper">
      <div>
        <select v-model="year" @change="emitDateOfBirth">
          <option value="-"></option>
          <option v-for="(item, index) in years" :key="index">
            {{ item }}
          </option>
        </select>
        年
      </div>
      <div>
        <select v-model="month" @change="emitDateOfBirth">
          <option value="-"></option>
          <option v-for="(item, index) in months" :key="index">
            {{ item }}
          </option></select
        >月
      </div>
      <div>
        <select v-model="day" @change="emitDateOfBirth">
          <option value="-"></option>
          <option v-for="(item, index) in days" :key="index">
            {{ item }}
          </option></select
        >日
      </div>
    </div>
    <div class="error">{{ error }}</div>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "DateSelector",
    props: {
    label: String,
    error: String,
  },
  emits: ["setDateOfBirth"],
  data() {
    return {
      years: [...Array(120)].map((_, i) => dayjs().year() - i),
      months: [...Array(12)].map((_, i) => i + 1),
      days: [...Array(31)].map((_, i) => i + 1),
      year: "",
      month: "",
      day: "",
    };
  },
  computed: {
    date: {
      get() {
        return `${this.year}-${this.month}-${this.day}`;
      },
    },
  },
  methods: {
    emitDateOfBirth() {
      this.$emit("setDateOfBirth", this.date);
    },
  },
};
</script>
<style scoped lang="scss">
.DateOfBirthSelector {
  margin: 0 0 10px 0;
  select {
    width: 60px;
    height: 30px;
    padding: 5px;
  }
    label {
    margin-left: 5px;
    font-weight: bold;
  }
  &_Wrapper {
    display: flex;
  }
}
</style>
