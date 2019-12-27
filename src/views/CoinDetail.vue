<template>
  <div class="flex-col">
    <template v-if="asset.id">
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
    </template>
  </div>
</template>

<script>
import { getAsset, getAssetHistory } from '@/api';
  import { format } from 'url';

export default {
  name: 'CoinDetail',

  data() {
    return {
      asset: {},
      history: []
    }
  },

  created() {
    this.getCoin();
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
    }
  },

  methods: {
    getCoin() {
      const id = this.$route.params.id;
      Promise.all([
        getAsset(id),
        getAssetHistory(id)
      ])
      .then(([asset, history ]) => {
        this.asset = asset;
        this.history = history;
      });
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

