<template>

<div id="performer-list" class="performer-list">
 <div class="performer-header">





  <button @click="applyFilter(letter)" class="btn btn-default" v-for="letter in letters" :class="{active: letter==selectedLetter}" v-bind:key="letter">
    {{letter}}
  </button>
  <button  class="btn btn-default" @click="applyFilter('')">
  clear
  </button>
  <v-client-table :data="tableData" :columns="columns" :options="options"  ></v-client-table>



  </div>



  <div class="performer-item" v-for="(item, key) in tableData" v-bind:key="item.index">
     <!--| filterBy search | orderBy sortKey reverse-->
      <p>
       <small>
    <span class="num" v-text="key + 1"></span>
   
      <a target="_blank" :href="item.url" v-text="item.name"></a>
  

<input type="checkbox" id="key + 1" v-model="item.isActive">
 <!-- <label for="item.index">{{item.isActive}}</label>-->
<!--        <span v-text="item.point"></span>
        registered-->
        <input type="text"  v-text="item.registered">
 
  <label for="item.age">{{item.age}}</label>
      </small>
    </p>
  </div>
  <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">

    <span slot="no-more">
      Listing completed.
    </span>
  </infinite-loading>
</div>
</template>



<script>

import VueTables from 'vue-tables-2';
const Event = VueTables.Event; // import eventbus
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';


//const api = 'http://hn.algolia.com/api/v1/search_by_date';
//const api = 'http://grw.local/api/v1/performance_data.json';
//const api = 'https://cors-anywhere.herokuapp.com/http://api.grw.local/performance_data.json';
const api = 'http://api.grw.local/performance_data.json';


export default {
  
   data() {
  return {
      letters: ['CA', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      selectedLetter: '',
      columns: ['id', 'name', 'age','isActive','Date'],
      tableData: [],
      sortKey: 'name',
    reverse: false,
    search: '',
      options: {
        // see the options API
        customFilters: [{
          name: 'alphabet',
          callback: function(row, query) {
            return row.name[0] == query;
          }
        }]
      }
  
  },
 /* computed: {
       columns () {
       return ['name', 'age']
  }
  },*/
  methods: {
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
      this.sortKey = sortKey;
    },
    applyFilter(letter) {
      this.selectedLetter = letter;
      Event.$emit('vue-tables.filter::alphabet', letter);
    },
       infiniteHandler($state) {
      axios.get(api, {
        params: {
          tags: this.tag,
          page: this.tableData.length / 20 + 1,
        },
      }).then(({ data }) => {
      
        if (data.hits.length) {
          this.tableData = this.tableData.concat(data.hits);
          $state.loaded();
          if (this.tableData.length / 20 === 10) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
    },
    changeFilter() {
      this.tableData = [];
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
    }},
  components: {
    InfiniteLoading
  
  }
};

</script>


<style>
body {
  margin: 2em 0;
}

a {
  font-weight: normal;
  color: blue;
}

a.active {
  font-weight: bold;
  color: black;
}

</style>