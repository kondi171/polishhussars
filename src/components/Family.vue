<script setup>
import { ref, onMounted } from "vue";

// Główne dywizje klanowe
const divisions = [
  {
    type: "Klan Główny",
    name: "Polska Husaria",
    tag: "#2YRL8C2Q2",
    icon: "🛡️",
  },
  {
    type: "Akademia",
    name: "Polska KropIAK",
    tag: "#2G0UV8RGC",
    icon: "📖",
  },
  {
    type: "CW podczas CWL",
    name: "Liga Dobra",
    tag: "#2YRL8C2Q2",
    icon: "💀",
  },
];

// Klany sojusznicze
const alliances = [
  {
    type: "Sojusz",
    name: "ReAktywni",
    tag: "#-------",
    icon: "⚡",
  },
  {
    type: "Sojusz",
    name: "Polska Reborn",
    tag: "#-------",
    icon: "🦅",
  },
  {
    type: "Sojusz",
    name: "Polska Kropla",
    tag: "#-------",
    icon: "💧",
  },
];

// Referencje do elementów dla IntersectionObserver
const mainTitle = ref(null);
const divisionGroup = ref(null);
const allianceGroup = ref(null);

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
  if (divisionGroup.value) observer.observe(divisionGroup.value);
  if (allianceGroup.value) observer.observe(allianceGroup.value);
});
</script>

<template>
  <section class="family-section">
    <div class="container">
      <h2 ref="mainTitle" class="family-section__main-title">Rodzina klanów</h2>

      <div ref="divisionGroup" class="family-group family-group--divisions">
        <div class="family-group__header">
          <h3 class="family-group__subtitle">Nasze dywizje</h3>
        </div>

        <div class="family-group__grid">
          <div
            v-for="(clan, idx) in divisions"
            :key="'div-' + idx"
            class="clan-card"
            :style="{ '--cardIdx': idx }"
          >
            <div class="clan-card__badge">{{ clan.type }}</div>
            <div class="clan-card__main">
              <div class="clan-card__icon">{{ clan.icon }}</div>
              <div class="clan-card__info">
                <h4 class="clan-card__name">{{ clan.name }}</h4>
                <span class="clan-card__tag">Tag: {{ clan.tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref="allianceGroup" class="family-group family-group--alliances">
        <div class="family-group__header">
          <h3 class="family-group__subtitle">Nasze sojusze</h3>
        </div>

        <div class="family-group__grid">
          <div
            v-for="(clan, idx) in alliances"
            :key="'all-' + idx"
            class="clan-card clan-card--alliance"
            :style="{ '--cardIdx': idx }"
          >
            <div class="clan-card__badge">{{ clan.type }}</div>
            <div class="clan-card__main">
              <div class="clan-card__icon">{{ clan.icon }}</div>
              <div class="clan-card__info">
                <h4 class="clan-card__name">{{ clan.name }}</h4>
                <span class="clan-card__tag">Tag: {{ clan.tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.family-section {
  padding: 120px 0;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000003f;
    clip-path: polygon(0 0, 100% 40px, 100% 100%, 0 #{"calc(100% - 40px)"});
    z-index: -1;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  &__main-title {
    font-family: $headerFont;
    color: #e6e2de;
    font-size: 3rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 40px;
    position: relative;

    /* DESKTOP: Tytuł wyrównany do prawej */
    width: fit-content;
    margin-left: auto;
    margin-right: 0;
    text-align: right;

    opacity: 0;
    transform: translateX(80px); /* Desktop: Wjazd z prawej strony */
    will-change: transform, opacity;

    transition:
      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.9s ease;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      right: 0; /* Rozwijanie linii od prawej strony */
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
        width: 100%; /* 🎯 Zmieniono z 80% na 100% – teraz linia idealnie pokrywa cały tekst */
      }
    }
  }
}

.family-group {
  &__header {
    margin-bottom: 30px;
  }

  &__subtitle {
    color: $primaryColor;
    font-family: $headerFont;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;

    opacity: 0;
    transform: translateY(-20px);
    will-change: transform, opacity;

    transition:
      transform 1s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.8s ease;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  &.isVisible {
    .family-group__subtitle {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &--divisions {
    .family-group__subtitle {
      text-align: left;
    }

    .clan-card {
      opacity: 0;
      transform: translateX(-60px); /* Desktop: Oryginalny wjazd z lewej */
      transition:
        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.9s ease;
      transition-delay: calc(var(--cardIdx) * 0.25s);
    }

    &.isVisible {
      .clan-card {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  &--alliances {
    .family-group__subtitle {
      text-align: right;
    }

    .clan-card {
      opacity: 0;
      transform: translateX(60px); /* Desktop: Oryginalny wjazd z prawej */
      transition:
        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.9s ease;
      transition-delay: calc(var(--cardIdx) * 0.25s);
    }

    &.isVisible {
      .clan-card {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

.clan-card {
  background: linear-gradient(
    135deg,
    $backgroundColor 0%,
    $supportLightColor 100%
  );
  border: $borderGame;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  will-change: transform, opacity;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  &--alliance {
    border-color: $redColor;

    .clan-card__badge {
      background-color: $redColor;
    }
  }

  &__badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $primaryColor;
    border: 1px solid #ffffff;
    padding: 4px 16px;
    font-family: $headerFont;
    font-size: 0.85rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__main {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
  }

  &__icon {
    font-size: 2.8rem;
  }

  &__name {
    margin: 0 0 4px 0;
    font-family: $headerFont;
    font-size: 1.5rem;
    color: $fontColor;
  }

  &__tag {
    font-size: 0.95rem;
    color: $primaryColor;
    font-family: monospace;
    letter-spacing: 0.5px;
  }
}

// ==========================================
// 📱 RWD / MOBILNE DOSTOSOWANIE
// ==========================================
@media (max-width: 992px) {
  .family-section {
    padding: 80px 0;

    &::before {
      clip-path: polygon(0 0, 100% 20px, 100% 100%, 0 #{"calc(100% - 20px)"});
    }

    &__main-title {
      font-size: 2.2rem;
      margin-bottom: 30px;

      /* MOBILE: Nadpisujemy pozycjonowanie do środka */
      margin-left: auto;
      margin-right: auto;
      text-align: center;

      transform: translateY(
        30px
      ); /* Wyłącznie pionowy ruch od dołu na mobile */

      &::after {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
      }
    }
  }

  .family-group__subtitle {
    font-size: 1.3rem;
    text-align: center !important;
  }

  /* MOBILE: Nadpisanie animacji kart na stabilny ruch pionowy */
  .family-group--divisions,
  .family-group--alliances {
    .clan-card {
      transform: translateY(40px);
    }

    &.isVisible {
      .clan-card {
        transform: translateY(0);
      }
    }
  }
}
</style>
