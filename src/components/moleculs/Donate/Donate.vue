<template>
  <div>
    donate
    <button :id="btnID" @click="goToPay">Pay an arbitrary amount</button>
  </div>
</template>

<script>
export default {
  name: 'Donate',
  data() {
    return {
      // https://docs.fondy.eu/ru/
      donayeScriptUrl: 'https://pay.fondy.eu/static_common/v1/checkout/ipsp.js',
      btnID: 'payBtn',
      payBtn: null
    };
  },
  methods: {
    addScriptOnDOM() {
      const tag = document.createElement('script');
      tag.src = this.donayeScriptUrl;
      tag.onload = this.initDonate();
      document.head.appendChild(tag);
    },
    initDonate() {
      if (!window.$ipsp) {
        setTimeout(this.initDonate, 500);
        return;
      }
      this.payBtn = window.$ipsp.get(`button`);
      this.payBtn.setMerchantId(1396421);
      this.payBtn.setAmount('', 'UAH');
      this.payBtn.setHost('pay.fondy.eu');
    },
    goToPay() {
      const href =  this.payBtn.getUrl();
      window.open(href)
    }
  },
  mounted() {
    this.addScriptOnDOM();
  }
};
</script>

<style lang="scss"></style>
