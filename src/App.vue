<template>
  <main id="app">
    <Header />
    <assets-table />
  </main>
</template>

<script>
import Header from '@/components/Header';
import AssetsTable from '@/components/AssetsTable';

export default {
  name: 'app',
  components: {
    Header,
    AssetsTable
  }
};
</script>
