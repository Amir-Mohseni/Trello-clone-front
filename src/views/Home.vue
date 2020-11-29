<template>
  <div class="w-full h-full">
    <component :is="selectedComponent" @changeComponent="changeComponent" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Boards from "../components/Home/Boards/Boards.vue";
import Card from "../components/Home/Cards/Card.vue";
import Lists from "../components/Home/Lists/Lists.vue";
import { get } from "../utils/helpers";

@Options({
  name: "Home",
  components: {
    Boards,
    Card,
    Lists,
  },
  data() {
    return {
      selectedComponent: "",
      id: "",
    };
  },
  async created() {
    this.selectedComponent = "Boards";

    this.emitter.on("changeComponent", (nextComponent: string) => {
      this.selectedComponent = nextComponent;
    });
  },
  methods: {
    changeComponent(name: string) {
      this.selectedComponent = name;
    },
  },
})
export default class Home extends Vue {}
</script>
