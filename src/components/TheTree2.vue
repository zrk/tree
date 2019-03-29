<template>
  <div>

    <input type="search" placeholder="Найти и подсветить..." v-model="searchText"/>
    <button @click="search()">Найти и раскрыть</button>
    <br>

    <el-tree
      class="tree"
      v-slot="{ node, data }"
      :data="tree"
      :props="treeProps"
      node-key="recordId"
      :default-expanded-keys="expanded"
      ref="tree"
    >
      <div class="node">
        <div class="node__label" :class="{ highlight: isSearched(data) }">
          {{ node.label }}
        </div>
        <div class="node__info">
          <img src="@/assets/icons.jpg" alt="icons">
        </div>
      </div>
    </el-tree>

  </div>
</template>


<script>
import * as db from '@/db.json';

const ROOT_PARENT_ID = '00000000-0000-0000-0000-000000000000';

const stringToMatch = string => string.trim().toLocaleLowerCase();


export default {
  name: 'TheTree',

  data() {
    return {
      list: [],
      expanded: [], // ids to expand from start
      treeProps: {
        label: (data) => {
          let label = data.shortName;
          if (data.name && (data.name !== data.shortName)) label += ` - ${data.name}`;
          return label;
        },
      },
      filterText: '',
      searchText: '',
    };
  },

  mounted() {
    this.list = db.data;

    // expand first level on start
    this.expanded = this.list
      .filter(el => el['уровень'] === 1)
      .map(el => el.recordId);
  },

  computed: {
    tree() {
      const map = {}; // map recordId to list index
      const roots = [];

      const list = this.list.map((element, index) => {
        map[element.recordId] = index; // initialize the map
        return { ...element, children: [] };
      });

      for (let i = 0; i < list.length; i += 1) {
        const node = list[i];
        if (node.parentId === ROOT_PARENT_ID || map[node.parentId] === undefined) {
          roots.push(node);
        } else {
          list[map[node.parentId]].children.push(node);
        }
      }

      return roots;
    },

    searchTextToMatch() {
      return stringToMatch(this.searchText);
    },
  },

  methods: {
    search() {
      if (!this.searchTextToMatch) return;

      const { isSearched } = this;

      this.expanded = this.list
        .filter(element => isSearched(element))
        .map(element => element.recordId);
    },

    isSearched(data) {
      if (!this.searchTextToMatch) return false;
      return stringToMatch(data.name).indexOf(this.searchTextToMatch) !== -1
        || stringToMatch(data.shortName).indexOf(this.searchTextToMatch) !== -1;
    },
  },
};
</script>


<style scoped>
.tree {
  min-width: 450px;
}

.node {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.node__label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.highlight {
  background-color: yellow;
}
</style>
