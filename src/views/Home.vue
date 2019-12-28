<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <assets-table v-if="!isLoading" :assets="assets"/>
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
      isLoading: false,
      assets: [],
    }
  },

  created() {
    this.isLoading = true;
    getAssets()
      .then((assets) => this.assets = assets)
      .finally(() => this.isLoading = false);
  }
};

</script>
