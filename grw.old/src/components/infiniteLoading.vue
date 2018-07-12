<template>

<div id="performer-list" class="performer-list">
 <div class="performer-header">
 <input v-model="search" class="form-control" placeholder="Filter users by name or age">

 



 

    <span>Search Filter</span>
   <select v-model="tag" @change="changeFilter()">
      <option value="age">age</option>
      <option value="isActive">isActive</option>
      <option value="show_hn">Show hn</option>
      <option value="ask_hn">Ask hn</option>
      <option value="front_page">Front page</option>
    </select>



  </div>


<!--<table class="table table-striped">
    <thead>
      <tr>
        <th v-repeat="column: columns">
          <a href="#" v-on="click: sortBy(column)" v-class="active: sortKey == column">
            {{ column | capitalize }}
          </a>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-repeat="users | filterBy search | orderBy sortKey reverse">
        <td>{{ name }}</td>
        <td>{{ age }}</td>
      </tr>
    </tbody>
  </table>-->
     <!--   <tr v-for="hit in hits| filterBy search | orderBy sortKey reverse">
        <td>{{ name }}</td>
        <td>{{ age }}</td>
      </tr>-->
  <div class="performer-item" v-for="(item, key) in list" v-bind:key="item.index">
     <!--| filterBy search | orderBy sortKey reverse-->
      <p>
       <small>
    <span class="num" v-text="key + 1"></span>
   
      <a target="_blank" :href="item.url" v-text="item.name"></a>
  

<input type="checkbox" id="key + 1" v-model="item.isActive">
 <!-- <label for="item.index">{{item.isActive}}</label>-->
<!--        <span v-text="item.point"></span>
        registered-->
        <a target="_blank" :href="'https://news.ycombinator.com/user?id=' + item.registered"
           v-text="item.registered"></a>
 
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

import InfiniteLoading from 'vue-infinite-loading';

import axios from 'axios';

//const api = 'http://hn.algolia.com/api/v1/search_by_date';
//const api = 'http://grw.local/api/v1/performance_data.json';
//const api = 'https://cors-anywhere.herokuapp.com/http://api.grw.local/performance_data.json';
const api = 'http://api.grw.local/performance_data.json';


 







export default {
  data() {
    return {
     list: [],
      tag: 'isActive',
    checkedNames: [],
    sortKey: 'name',
    reverse: false,
    search: ''
    };
  },
  computed: {
       columns () {
       return ['name', 'age']
  }
  },
  methods: {
      sortBy: function(sortKey) {
        this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
        this.sortKey = sortKey;
    },
    infiniteHandler($state) {
      axios.get(api, {
        params: {
          tags: this.tag,
          page: this.list.length / 20 + 1,
        },
      }).then(({ data }) => {
        if (data.hits.length) {
       
          this.list = this.list.concat(data.hits);
          $state.loaded();
        //  if (this.list.length / 20 === 10) {
            if (this.list.length / 20 === 10) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
    },
    changeFilter() {
      this.list = [];
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
    },
  },
  components: {
    InfiniteLoading
  },
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



#app {
  width: 95%;
  margin: 0 auto;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

</style>