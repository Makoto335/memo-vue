<template>
  <div class="TermsAgreement">
    <label>{{ label }}</label>
    <div class="TermsAgreement_Wrapper">
      <input
        type="checkbox"
        id="terms"
        v-model="agreeToTerms"
        @change="emitAgreementStatus"
      />
      <a
        href="https://menherasenpai.notion.site/457df49475494671807673a0a3346451"
        target="_blank"
        rel="noopener noreferrer"
        >利用規約</a
      >に同意する。
    </div>
    <div class="error">{{ error }}</div>
  </div>
</template>
<script>
export default {
  name: "TermsAgreement",
  props: {
    label: String,
    error: String,
  },
  emits: ["setAgreementProperty"],
  data() {
    return {
      agreeToTerms: false, 
    };
  },
  methods: {
    emitAgreementStatus() {
      this.$emit("setAgreementProperty", this.agreeToTerms);
    },
  },
};
</script>

<style scoped lang="scss">
.TermsAgreement {
  margin: 0 0 10px 0;
  display: flex;
  flex-direction: column;
  &_Wrapper {
    display: flex;
    align-items: center;
  }
  label {
    margin-left: 5px;
    font-weight: bold;
  }
  a {
    margin-left: 4px;
    color: blue;
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  input[type="checkbox"] {
    margin-left: 8px;
    margin-right: 4px;
    width: 15px;
    height: 15px;
  }
}
</style>
