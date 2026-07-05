<script setup>
import Header from "@/components/Header.vue";
import About from "@/components/About.vue";
import Family from "./components/Family.vue";
import Metrics from "@/components/Metrics.vue";
import Footer from "@/components/Footer.vue";
import Join from "./components/Join.vue";
</script>

<template>
  <div class="landing-layout">
    <Header />
    <main>
      <About />
      <Family />
      <Metrics />
      <Join />
    </main>
    <Footer />
  </div>
</template>
