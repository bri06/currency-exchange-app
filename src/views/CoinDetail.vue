<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img class="w-20 h-20 mr-5"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name" />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Current price</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Lowest price</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Highest price</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Average Price</b>
              <span>{{ average | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">24-hour variation</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >Change</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>

      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="lineChartData"
        ></line-chart>

      <h3 class="text-xl my-10">Best exchange offers</h3>
      <table>
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <Button :is-loading="m.isLoading || false" v-if="!m.url" @btn-clicked="getExchangeUrl(m)"><slot>Get link</slot></Button>
            <a  v-else class="hover:underline text-green-600" target="_blank">{{ m.url }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import { getAsset, getAssetHistory, getMarkets, getExchange } from '@/api';
import { format } from 'url';
import Button from  '@/components/Button';

export default {
  name: 'CoinDetail',

  components: {
    Button,
  },

  data() {
    return {
      asset: {},
      history: [],
      markets: [],
      isLoading: false
    }
  },

  created() {
    this.getCoin();
  },

  watch: {
    $route() {
      this.getCoin()
    }
  },

  computed: {
    min() {
      return Math.min(
        ...this.history.map(elem => parseFloat(elem.priceUsd).toFixed(2))
      )
    },
    max() {
      return Math.max(
        ...this.history.map(elem => parseFloat(elem.priceUsd).toFixed(2))
      )
    },
    average() {
      return Math.abs(
        ...this.history.map(elem => parseFloat(elem.priceUsd).toFixed(2))
      )
    },
    lineChartData() {
      return this.history.map(elem => [elem.date, parseFloat(elem.priceUsd).toFixed(2)]);
    }
  },

  methods: {
    getCoin() {
      this.isLoading = true;
      const id = this.$route.params.id;
      Promise.all([
        getAsset(id),
        getAssetHistory(id),
        getMarkets(id)
      ])
      .then(([asset, history, markets ]) => {
        this.asset = asset;
        this.history = history;
        this.markets = markets;
      })
      .finally(() => this.isLoading = false);
    },

    getExchangeUrl(exchange) {
      this.$set(exchange, 'isLoading', true);
      return getExchange(exchange.exchangeId)
        .then(res => this.$set(exchange, 'url', res.exchangeUrl))
        .finally(() => this.$set(exchange, 'isLoading', false));
    }
  },

}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>

