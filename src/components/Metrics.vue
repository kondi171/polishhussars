<script setup>
import { ref, onMounted } from "vue";

const mainTitle = ref(null);

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("isVisible"); // Konwencja CamelCase
      } else {
        entry.target.classList.remove("isVisible");
      }
    });
  }, observerOptions);

  if (mainTitle.value) observer.observe(mainTitle.value);
});
</script>

<template>
  <section class="metrics-section container">
    <h2 ref="mainTitle" class="metrics-section__main-title">Metryki</h2>

    <div class="metrics-content">
      <div class="metrics-content__icon">📊</div>

      <h3 class="metrics-content__status">Już wkrótce...</h3>

      <div class="metrics-content__progress-bar">
        <div class="bar-fill"></div>
      </div>

      <p class="metrics-content__description">
        Trwają prace nad wdrożeniem autorskiego systemu synchronizacji danych.
        Wkrótce zyskasz wgląd w aktualne poziomy klanów, historię wygranych
        wojen oraz szczegółowe statystyki aktywności członków.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.metrics-section {
  padding: 100px 20px;
  display: flex;
  flex-direction: column;

  &__main-title {
    font-family: $headerFont;
    color: #e6e2de;
    font-size: 3rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 60px;
    position: relative;

    /* Wyrównanie tytułu do lewej krawędzi kontenera */
    width: fit-content;
    margin-right: auto;
    text-align: left;

    opacity: 0;
    transform: translateX(-80px);
    will-change: transform, opacity;
    transition:
      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.9s ease;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      left: 0; /* Linia rośnie od lewej */
      width: 0;
      height: 3px;
      background-color: $primaryColor;
      transition: width 2s ease-in-out;
      will-change: width;
    }

    &.isVisible {
      opacity: 1;
      transform: translateX(0);

      &::after {
        width: 80%;
      }
    }
  }
}

/* Stylizacja elementów po usunięciu boxa - wyśrodkowany układ wewnątrz sekcji */
.metrics-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 650px;
  margin: 0 auto; /* Centrowanie kolumny w ograniczonym kontenerze */
  width: 100%;

  &__icon {
    font-size: 3.5rem;
    margin-bottom: 15px;
  }

  &__status {
    font-family: $headerFont;
    color: $primaryColor;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 25px 0;
  }

  &__progress-bar {
    width: 100%;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba($primaryColor, 0.3);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 35px;

    .bar-fill {
      height: 100%;
      width: 65%;
      background: linear-gradient(90deg, $primaryColor, $redColor);
      border-radius: 10px;
      animation: progressShimmy 1.5s infinite linear;
      background-size: 30px 30px;
      background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
    }
  }

  &__description {
    color: #b0a8a0;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }
}

@keyframes progressShimmy {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30px 0;
  }
}

@media (max-width: 992px) {
  .metrics-section {
    padding: 60px 20px;

    &__main-title {
      font-size: 2.2rem;
      margin-bottom: 40px;
      transform: translateX(-40px); /* Lżejszy wjazd na mobile */
    }
  }

  .metrics-content {
    &__status {
      font-size: 1.6rem;
    }

    &__description {
      font-size: 1rem;
    }
  }
}
</style>
