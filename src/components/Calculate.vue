<template lang="pug">
.wrapper
  .calculate__header
    include ../pug/header.pug
  .calculate__body 
    .calculate__container
      .body__content 
        .body__col.left
          .left__inputs
            .inputs__body(v-for="input in inputs", :key="input.id")
              p.inputs__title {{ input.title }}
              div 
                label 
                  input.input(
                    type="radio",
                    :name="input.name",
                    :value="input.value",
                    @change="action",
                    @input="calculate"
                  )
                  span.input__text {{ input.text }}
              div 
                label 
                  input.input(
                    type="radio",
                    :name="input.name",
                    :value="input.value2",
                    @change="action",
                    @input="calculate"
                  )
                  span.input__text {{ input.text2 }}
          .input-sum
            input.sum_input(
              :class="{ sum_input_warning: colorWarningSum }",
              @input="calculate",
              type="number",
              name="insurance",
              v-model="sumInsurance"
            )
            span.sum_text(:class="{ sum_text_warning: colorWarningSum }") ₽
          .input_pice(
            @input="calculate",
            :class="{ input_pice_active: piceVisible }"
          )
            input.pice_input(
              :class="{ pice_input_warning: colorWarningPice }",
              type="number",
              value="2",
              name="pice",
              v-model="sumPice"
            )
            span части
        .body__col.right
          include ../pug/inputMore.pug
        .body__out
          p.out__text(v-if="textOutWarning") Максимальная объявленная стоимость посылок в Сберлогистике {{ maxSum }} ₽
  .calculate__footer
    include ../pug/footer.pug
</template>

<script>
export default {
  methods: {
    // CALCULATOR ===============================
    calculation: function (weight = 0, courier = 0, insurance = 0) {
      this.result = courier + weight + (insurance / 100) * 0.2;
      this.resultAround = Math.round(this.result);
    },
    // ACTION ===============================
    action(e) {
      let value = e.target.value;
      let name = e.target.name;
      let t = this;
      t.footerVisible = false;
      if (value == "more-10") {
        t.moreVisible = false;
      } else if (name == "sum" && value == 0) {
        t.colorWarningSum = false;
        t.sumInsurance = "";
        t.textOutWarning = false;
        t.more = true;
      } else if (value == 5) {
        t.colorWarningPice = false;
        t.footerWarning = false;
        t.moreVisible = true;
        t.piceVisible = false;
      } else if (name == "more-2" && value == 40) {
        t.piceVisible = true;
        t.footerWarning = false;
      } else if (name == "more-2" && value == 0) {
        t.colorWarningPice = false;
        t.footerWarning = true;
        t.piceVisible = false;
      }
    },
    // CALCULATE ===============================
    calculate(e) {
      let value = e.target.value;
      let name = e.target.name;
      let t = this;
      t.footerVisible = false;
      if (name == "weight" && value == 5) {
        t.weightValue = +value;
      } else if (name == "weight" && value == 10) {
        t.weightValue = +value;
      } else if (name == "weight" && value == "more-10") {
        t.weightValue = 0;
      } else if (name == "more-2" && value == 40) {
        t.weightValue = +value;
        t.sumPice = 2;
        t.activeInputPice();
      } else if (name == "courier" && value == 100) {
        t.courierValue = +value;
      } else if (name == "courier" && value == 0) {
        t.courierValue = 0;
      } else if (name == "sum" && value == 0) {
        t.insuranceValue = 0;
        value = 0;
      } else if (name == "insurance") {
        t.activeInputSum();
        if (value > t.maxSum) {
          t.textOutWarning = true;
          t.more = false;
          t.insuranceValue = t.maxSum;
          t.colorWarningSum = true;
        } else {
          t.colorWarningSum = false;
          t.insuranceValue = +value;
          t.more = true;
          t.textOutWarning = false;
        }
      } else if (name == "pice") {
        t.weightValue = +value * t.inputs[0].value2 * 2;
        if (value > 2) {
          t.colorWarningPice = true;
          t.footerWarning = true;
        } else {
          t.footerWarning = false;
          t.colorWarningPice = false;
        }
      }
      t.calculation(t.weightValue, t.courierValue, t.insuranceValue);
    },
    // ACTIVE INPUT SUM ==================================================
    activeInputSum: function () {
      const input = document.querySelector(".input[name=sum]");
      input.checked = true;
    },
    // ACTIVE INPUT PICE ==================================================
    activeInputPice: function () {
      const input = document.querySelectorAll(".input[name=weight]");
      input[1].checked = true;
    },
  },
  data() {
    return {
      // VARIABLES =====================================
      sumInsurance: "",
      sumPice: 0,
      more: true,
      footerVisible: true,
      moreVisible: true,
      piceVisible: false,
      footerWarning: false,
      textOutWarning: false,
      colorWarningSum: false,
      colorWarningPice: false,
      // CALCULATION VARIABLES ==========================
      weightValue: 0,
      courierValue: 0,
      insuranceValue: 0,
      result: 0,
      resultAround: 0,
      maxSum: 150000,

      // INPUTS =========================================
      inputs: [
        {
          id: 1,
          title: "1. Какой вес у вашей посылки?",
          text: "До 5 кг",
          name: "weight",
          value: 5,
          text2: "От 5 до 10 кг",
          name2: "weight",
          value2: 10,
        },
        {
          id: 2,
          title: "2. Оформим курьерскую доставку до двери получателя?",
          text: "Да",
          text2: "Нет",
          name: "courier",
          value: 100,
          value2: 0,
        },
        {
          id: 3,
          title: "3. Хотите застраховать посылку?",
          text: "Да, на сумму",
          text2: "Нет",
          name: "sum",
          value: 1,
          value2: 0,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
// RESET ===================================
@import "@/style/reset.scss";
// MAIN STYLE - CONTAINER ==================
@import "@/style/main.scss";
// HEADER  =================================
@import "@/style/header.scss";
// LEFT BODY ===============================
@import "@/style/body-left.scss";
// RIGHT BODY ==============================
@import "@/style/body-right.scss";
// FOOTER  =================================
@import "@/style/footer.scss";
</style>
