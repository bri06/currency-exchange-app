<template>
  <div>
    <assets-table :assets="assets"/>
  </div>
</template>

<script>
import AssetsTable from '@/components/AssetsTable';
import { getAssets } from '@/api';

export default {
  name: 'Home',

  components: {
    AssetsTable,
  },

  data() {
    return {
      assets: [],
    }
  },

  created() {
    getAssets().then((assets) => this.assets = assets);
  }
};

</script>
