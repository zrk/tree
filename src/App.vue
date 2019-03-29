<template>
  <div id="app">

    <input type="radio" id="1" value="1" v-model="variant">
    <label for="1">
      <strong>Вариант 1:</strong>
      Дерево наполняется из плоского списка в режиме 'lazy' - по мере раскрытия узлов дерева.
    </label>

    <br>

    <input type="radio" id="2" value="2" v-model="variant">
    <label for="2">
      <strong>Вариант 2:</strong>
      Дерево наполняется из плоского списка сразу целиком.
      Реализован поиск.
    </label>

    <hr>

    <TheTree  v-if="variant === '1'"/>
    <TheTree2 v-if="variant === '2'"/>
  </div>
</template>

<script>
import TheTree from './components/TheTree.vue';
import TheTree2 from './components/TheTree2.vue';

export default {
  name: 'app',
  components: {
    TheTree,
    TheTree2,
  },
  data() {
    return {
      variant: '2',
    };
  },
};
</script>
