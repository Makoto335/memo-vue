<template>
  <div class="TextInput">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      @blur="$emit('blur', $event)"
      @keyup="$emit('keyup', $event)"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    placeholder: String,
    autocomplete: String,
    modelValue: String,
    error: String,
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped lang="scss">
.TextInput {
  label {
    margin-left: 5px;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0 0 8px 0;
    border-radius: 4px;
    border: 1px solid #eee;
    outline: none;
    box-sizing: border-box;
  }
}
</style>
