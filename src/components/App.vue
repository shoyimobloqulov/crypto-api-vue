<script>
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

export default {
  components:{
    DataTable,
    Column,
    Row,
    ColumnGroup
  },

  data() {
    return {
      exchangeRates: {},
      showCheck: false,
      time_last_update_utc: '',
      base_code: '',
      conversion_rates: {},
      tableData: [],
    }
  },
  mounted() {
    this.fetchExchangeRates();
  },
  methods: {
    async fetchExchangeRates() {
      try {
        // Api request
        this.exchangeRates = await axios.get('https://v6.exchangerate-api.com/v6/fb70b0dc43caf2cdb4b286c5/latest/USD');
        this.showCheck = true
        this.time_last_update_utc = this.exchangeRates.data.time_last_update_utc
        this.base_code = this.exchangeRates.data.base_code
        this.conversion_rates = this.exchangeRates.data.conversion_rates

        this.tableData = Object.keys(this.conversion_rates).map(code => ({
          code,
          num: this.conversion_rates[code],
        }));
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    },
  },
}
</script>

<template>
  <div class="flex justify-center mt-5" v-show="showCheck">
    <a href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p>{{ time_last_update_utc }}</p>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><span class="text-green-600">{{ exchangeRates.status }}</span> &ensp; Valuate statustikasi-{{base_code}}</h5>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable :value="tableData" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="code" header="Code" style="width: 50%"></Column>
          <Column field="num" header="Number" style="width: 50%"></Column>
        </DataTable>
      </div>
    </a>
  </div>
</template>
