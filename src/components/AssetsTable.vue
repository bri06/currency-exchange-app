<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.order === 1, down: this.order === -1 }">
          <span
          class="underline cursor-pointer"
          @click="changeSortOrder">Ranking</span>
        </th>
        <th>Name</th>
        <th>Price</th>
        <th>Market Cap.</th>
        <th>24-hour variation</th>
        <td class="hidden sm:block">
          <input
          class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
          id="filter"
          placeholder="Search..."
          type="text"
          v-model="filter"/>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filteredAssets"
        :key="item.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100">
        <td>
          <img
          class="w-6 h-6"
          :src="`https://static.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`" :alt="item.name">
        </td>
        <td><b>#{{ item.rank }}</b></td>
        <td>
          <router-link
            class="hover:underline"
            :to="{ name: 'coin-detail', params: { id: item.id } }">
            {{ item.name }}
          </router-link>
          <small class="ml-1 text-gray-500">
            {{ item.symbol }}
          </small>
        </td>
        <td>{{ item.priceUsd | dollar }}</td>
        <td>{{ item.marketCapUsd | dollar }}</td>
        <td :class="item.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'">
          {{ item.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <Button @btn-clicked="goToDetail(item.id)">
            <span>Detail</span>
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Button from '@/components/Button';

const ASCENDENT = 1;
const DESCENDENT = -1;

export default {
  name: 'AssetsTable',

  components: {
    Button
  },

  data() {
    return {
      filter: '',
      order: ASCENDENT
    }
  },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    filteredAssets() {
      return this.assets.filter(elem =>
       elem.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
       elem.name.toLowerCase().includes(this.filter.toLowerCase()));
    },
  },

  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'coin-detail', params: { id } });
    },

    changeSortOrder(order) {
      this.order = this.order === 1 ? -1 : 1;
      this.assets.sort((initial, final) => parseInt(initial.rank) - parseInt(final.rank) ? DESCENDENT : ASCENDENT);
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
