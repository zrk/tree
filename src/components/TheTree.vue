<template>
  <div class="hello">
    <el-tree
      class="tree"
      v-slot="{ node }"
      :data="tree"
      :props="treeProps"
      node-key="recordId"
      lazy
      :load="loadNode"
      :default-expanded-keys="expanded"
    >
      <div class="node">
        <div class="node__label">{{ node.label }}</div>
        <div class="node__info">
          <img src="@/assets/icons.jpg" alt="icons">
        </div>
      </div>
    </el-tree>
  </div>
</template>


<script>
import * as db from '@/db.json';

export default {
  name: 'TheTree',
  data() {
    return {
      list: [],
      tree: [],
      expanded: [], // ids to expand from start
      treeProps: {
        label: (data) => {
          let label = data.shortName;
          if (data.name && (data.name !== data.shortName)) label += ` - ${data.name}`;
          return label;
        },
        isLeaf: data => !this.list.find(el => el.parentId === data.recordId),
      },
    };
  },
  mounted() {
    this.list = db.data;

    const roots = [this.list[0]]; // NOT SAFE: assume first list element is the root

    this.tree = roots;
    this.expanded = roots.map(el => el.recordId); // expand first level on start
  },
  methods: {
    loadNode(node, resolve) {
      // Here we can make async call for DB update - fetch the node's children branch
      const children = this.list.filter(el => el.parentId === node.data.recordId);
      return resolve(children);
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
</style>
