<script setup>
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import About from "@/components/About.vue";
import Family from "@/components/Family.vue";
import Metrics from "@/components/Metrics.vue";
import Join from "@/components/Join.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="landing-layout">
    <!-- Header/Hero na samej górze -->
    <Header />

    <!-- Navbar teraz ląduje idealnie pod headerem -->
    <Navbar />

    <main>
      <About id="about" />
      <Family id="family" />
      <Metrics id="metrics" />
      <Join id="join" />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
// Jeśli potrzebujesz globalnych stylów layoutu, możesz je wrzucić tutaj.
// Struktura flexbox gwarantuje, że stopka zawsze będzie na samym dole.
.landing-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
