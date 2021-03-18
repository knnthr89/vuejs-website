<template>
  <div>
    <Slide>
      <a id="customers" href="/customers">
        <span>Customers</span>
      </a>
      <a id="products" href="/products">
        <span>Products</span>
      </a>
    </Slide>
    <Navbar></Navbar>
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { Slide } from 'vue-burger-menu';
export default {
  components: {
    Navbar,
    Slide
  }
};
</script>
