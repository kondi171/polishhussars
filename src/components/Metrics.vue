<script setup>
import { ref, onMounted } from "vue";

const mainTitle = ref(null);
const metricsCard = ref(null);

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("isVisible");
      } else {
        if (window.innerWidth > 992) {
          entry.target.classList.remove("isVisible");
        }
      }
    });
  }, observerOptions);

  if (mainTitle.value) observer.observe(mainTitle.value);
  if (metricsCard.value) observer.observe(metricsCard.value);
});
</script>

<template>
  <section class="metrics-section">
    <div class="container">
      <h2 ref="mainTitle" class="metrics-section__main-title">Metryki</h2>

      <div ref="metricsCard" class="metrics-card">
        <div class="metrics-card__icon">📊</div>

        <h3 class="metrics-card__status">Już wkrótce...</h3>

        <div class="metrics-card__progress-bar">
          <div class="bar-fill"></div>
        </div>

        <p class="metrics-card__description">
          Trwają prace nad wdrożeniem autorskiego systemu synchronizacji danych.
          Wkrótce zyskasz wgląd w aktualne poziomy klanów, historię wygranych i
          inne statystyki.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.metrics-section {
  padding: 120px 0;

  &__main-title {
    font-family: $headerFont;
    color: #e6e2de;
    font-size: clamp(2.2rem, 5vw, 3rem);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 60px;
    position: relative;

    // Desktop: Lewa strona
    text-align: left;
    width: fit-content;

    opacity: 0;
    transform: translateX(-40px);
    transition: all 1s ease-out;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 0;
      height: 3px;
      background-color: $primaryColor;
      transition: width 1.5s ease-in-out;
    }

    &.isVisible {
      opacity: 1;
      transform: translateX(0);
      &::after {
        width: 100%; /* 🎯 Zmieniono z 120px na 100% – teraz linia idealnie pokrywa cały tekst */
      }
    }
  }
}

.metrics-card {
  background-color: $backgroundColor;
  border: $borderGame;
  border-radius: 6px;
  padding: 40px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.56);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  opacity: 0;
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  // Desktop: subtelne wejście
  transform: translateY(20px);

  &.isVisible {
    opacity: 1;
    transform: translateY(0);
  }

  &__icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  &__status {
    color: $primaryColor;
    font-family: $headerFont;
    font-size: 1.8rem;
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
    color: $fontColor;
    font-size: 1.1rem;
    line-height: 1.6;
  }
}

@keyframes progressShimmy {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 30px 0;
  }
}

// 📱 RWD / MOBILNE DOSTOSOWANIE
@media (max-width: 992px) {
  .metrics-section__main-title {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(30px);

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
    &.isVisible {
      transform: translateY(0);
    }
  }

  .metrics-card {
    transform: translateY(60px) !important;

    &.isVisible {
      transform: translateY(0) !important;
    }
  }
}
</style>
