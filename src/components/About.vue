<script setup>
import { ref, onMounted } from "vue";

const offers = [
  { label: "Wojny i Ligi Wojen", text: "Dla chętnych ciągłe CW / CWL." },
  {
    label: "Weekendowe Raidy",
    text: "Wspólne czyszczenie dystryktów w Capital Peak i stały dopływ Raid Medals.",
  },
  { label: "Gry Klanowe", text: "Zawsze maksymalne nagrody w Clan Games." },
  {
    label: "Wsparcie Taktyczne",
    text: "Pomoc w projektowaniu baz, dobieraniu armii i planowaniu skomplikowanych ataków.",
  },
  {
    label: "Zaplecze Wojskowe",
    text: "Błyskawiczne donacje wysokopoziomowych jednostek, maszyn oblężniczych oraz czarów.",
  },
  {
    label: "Stabilna Społeczność",
    text: "Dojrzałe środowisko bez toksyczności, nastawione na długofalową i wspólną zabawę.",
  },
];

const requirements = [
  {
    label: "No rush",
    text: "Stawiamy na solidnie rozwinięte wioski, bohaterów i mury przed przejściem na wyższe TH.",
  },
  {
    label: "Odpowiedzialność",
    text: "Zgłoszeni uczestnicy zobowiązani sunt do wykorzystania obu ataków w wojnie.",
  },
  {
    label: "Komunikacja",
    text: "Obecność na naszym klanowym czacie lub serwerze Discord w celu sprawnej koordynacji.",
  },
  {
    label: "Aktywność w grach",
    text: "Wymagamy minimalnego zaangażowania punktowego podczas comiesięcznych Clan Games.",
  },
  {
    label: "Kultura osobista",
    text: "Szanujemy swój czas i siebie nawzajem – brak dramatów, toxic zachowań i wyzwisk.",
  },
];

const mainTitle = ref(null);
const leftCard = ref(null);
const rightCard = ref(null);

onMounted(() => {
  const observerOptions = { root: null, threshold: 0.1 };

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
  if (leftCard.value) observer.observe(leftCard.value);
  if (rightCard.value) observer.observe(rightCard.value);
});
</script>

<template>
  <section class="about-section">
    <div class="container">
      <h2 ref="mainTitle" class="about-section__main-title">O nas</h2>

      <div class="about-section__grid">
        <div ref="leftCard" class="about-card about-card--left">
          <h3 class="about-card__title">⚔️ Co oferujemy? ⚔️</h3>
          <ul class="about-card__list">
            <li
              v-for="(offer, idx) in offers"
              :key="idx"
              class="about-card__item about-card__item--column"
            >
              <strong>🔸 {{ offer.label }}:</strong>
              <span class="desc">{{ offer.text }}</span>
            </li>
          </ul>
        </div>

        <div ref="rightCard" class="about-card about-card--right">
          <h3 class="about-card__title">🛡️ Czego oczekujemy? 🛡️</h3>
          <ul class="about-card__list">
            <li
              v-for="(req, idx) in requirements"
              :key="idx"
              class="about-card__item about-card__item--column"
            >
              <strong>🔸 {{ req.label }}:</strong>
              <span class="desc">{{ req.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-section {
  padding: clamp(60px, 8vh, 100px) 0;
  overflow-x: hidden;

  &__main-title {
    font-family: $headerFont;
    color: #e6e2de;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 60px;
    position: relative;
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
        width: 100%; /* 🎯 Poprawiono: z 120px na 100% dla idealnego dopasowania pod tekstem */
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

.about-card {
  background-color: $backgroundColor;
  border: $borderGame;
  border-radius: 6px;
  padding: 40px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.56);
  opacity: 0;
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);

  &--left {
    transform: translateX(-100px);
  }
  &--right {
    transform: translateX(100px);
  }

  &.isVisible {
    opacity: 1;
    transform: translateX(0);
  }

  &--right {
    border-color: $redColor;
  }

  &__title {
    font-family: $headerFont;
    color: $primaryColor;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 30px;
  }

  &__item {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 22px;
    color: $fontColor;
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      color: $primaryColor;
    }
    .desc {
      color: #b0a8a0;
      padding-left: 28px;
    }
  }
}

@media (max-width: 992px) {
  .about-section__main-title {
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

  .about-section__grid {
    grid-template-columns: 1fr;
  }

  .about-card {
    transform: translateY(60px) !important;

    &.isVisible {
      transform: translateY(0) !important;
    }
    &__title {
      font-size: 1.3rem;
    }
  }
}
</style>
