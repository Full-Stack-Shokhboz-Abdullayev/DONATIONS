<template>
  <form @submit.prevent="onSubmit" class="donation-form">
    <div ref="suggestions" class="donation-form__suggestions mb-2">
      <a-button
        block
        v-for="(suggestion, index) in presets"
        @click="onSuggestionChange(suggestion, index)"
        :type="suggestion == form.amount ? 'primary' : 'default'"
        class="suggestion w-30"
        :key="'suggestion.' + index"
      >
        {{ form.currency.symbol }} {{ enUSNumberFormat(suggestion) }}
      </a-button>
    </div>
    <div class="donation-form__input mb-2 w-100">
      <h3 class="donation-form__input__symbol">
        {{ form.currency.symbol }}
      </h3>
      <a-input-number
        :min="1"
        class="w-100"
        :value="form.amount"
        :formatter="formatter"
        @change="onAmountChange"
      ></a-input-number>
      <a-select
        :value="form.currency.key"
        @change="onCurrencyChange"
        class="w-30"
      >
        <a-select-option
          v-for="currency in currencies"
          :value="currency.key"
          :key="currency.code"
        >
          {{ currency.code }}
        </a-select-option>
      </a-select>
    </div>
    <div class="donation-form__button w-100">
      <a-button htmlType="submit" :loading="loading" type="primary" block
        >Donate</a-button
      >
    </div>
  </form>
</template>

<script>
import { suggestion, presets, selectCurrencies } from "@/constants/index";
import axios from "../service/axios";
export default {
  name: "DonationForm",
  data: () => ({
    usdAmount: suggestion,
    form: {
      amount: suggestion,
      currency: selectCurrencies[0],
    },
    currencies: selectCurrencies,
    presets: [...presets],
    loading: false,
  }),
  methods: {
    enUSNumberFormat(value) {
      return new Intl.NumberFormat("en-US").format(value);
    },
    beautify(amount) {
      const amountLength = parseInt(amount).toString().length - 2 || 1;
      const num = parseInt("1" + "0".repeat(amountLength));
      const rounded = Math.round(amount / num) * num;
      return rounded.toFixed(0);
    },

    formatter(value) {
      return this.enUSNumberFormat(value) ? this.enUSNumberFormat(value) : 0;
    },
    onSuggestionChange(suggestion, index) {
      this.form.amount = suggestion;
      this.usdAmount = presets[index];
    },
    onCurrencyChange(e) {
      this.form.currency = this.currencies[e];
      const selected = this.presets.findIndex(
        (preset) => preset == this.form.amount
      );
      this.presets = presets.map((preset) =>
        this.beautify(preset * this.form.currency.rate)
      );
      this.form.amount =
        selected > -1
          ? this.presets[selected]
          : Math.round(this.usdAmount * this.form.currency.rate);
    },
    onAmountChange(e) {
      this.form.amount = parseInt(e) || 0;
      this.usdAmount = this.form.amount / this.form.currency.rate;
    },
    async onSubmit() {
      this.loading = true;
      try {
        const {
          data: { message },
        } = await axios.post("/donations/donate", {
          amount: new Number(this.form.amount),
          currency: this.form.currency.code,
        });
        this.$notification.success({
          title: "Successfully Donated!",
          message: message,
        });
      } catch (err) {
        this.$notification.error({
          title: "Error",
          message: err?.response?.data?.error[0] || "Something went wrong",
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.donation-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5%;
  margin: 0 auto;
}
.donation-form .donation-form__input {
  display: flex;
  align-items: center;
  justify-content: center;
}
.w-100 {
  width: 100%;
}
.w-50 {
  width: 50%;
}
.w-30 {
  width: 30%;
}
.mb-2 {
  margin-bottom: 2rem;
}

.donation-form__suggestions .suggestion {
  margin: 0.5rem 0;
}

.donation-form__suggestions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.donation-form__input__symbol {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 0;
  color: #1890ff;
}
</style>
