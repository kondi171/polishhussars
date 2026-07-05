<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const isMobileMenuOpen = ref(false);
const isSticky = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleScroll = () => {
  if (window.innerWidth <= 768) {
    isSticky.value = true;
  } else {
    const triggerPoint = window.innerHeight - 80;
    isSticky.value = window.scrollY >= triggerPoint;
  }
};

watch(isMobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <header :class="['main-navbar', { 'main-navbar--sticky': isSticky }]">
    <div class="main-navbar__container container">
      <!-- 🎯 Oczyszczona struktura brandingu bez zbędnych tagów span -->
      <a href="#" class="main-navbar__brand" @click="closeMobileMenu">
        <svg
          class="husaria-wing husaria-wing--left"
          viewBox="0 0 70 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <!-- Zmieniono ID na unikalne dla nawigacji, by uniknąć konfliktów z Hero -->
            <linearGradient
              id="husariaGradNav"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="45%" stop-color="#ffffff" />
              <stop offset="80%" stop-color="#e63946" />
              <stop offset="100%" stop-color="#b81414" />
            </linearGradient>
          </defs>
          <path
            d="M65,95 L62,75 C59,60 53,45 42,30 C32,16 18,5 2,2 C12,10 24,20 32,32 C18,25 8,22 1,24 C13,32 25,41 34,51 C24,46 14,44 6,47 C17,54 28,63 36,72 C28,69 20,68 13,70 C24,76 36,82 46,87 C41,86 33,85 27,87 C38,91 52,94 65,95 Z"
            fill="url(#husariaGradNav)"
          />
        </svg>

        <div class="brand-content">
          <span class="brand-title">Polska Husaria</span>
          <span class="brand-slogan">Husaria doda ci skrzydeł</span>
        </div>

        <svg
          class="husaria-wing husaria-wing--right"
          viewBox="0 0 70 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M65,95 L62,75 C59,60 53,45 42,30 C32,16 18,5 2,2 C12,10 24,20 32,32 C18,25 8,22 1,24 C13,32 25,41 34,51 C24,46 14,44 6,47 C17,54 28,63 36,72 C28,69 20,68 13,70 C24,76 36,82 46,87 C41,86 33,85 27,87 C38,91 52,94 65,95 Z"
            fill="url(#husariaGradNav)"
          />
        </svg>
      </a>

      <button
        :class="['hamburger', { 'is-active': isMobileMenuOpen }]"
        @click="toggleMobileMenu"
        aria-label="Menu"
      >
        <span class="hamburger__box">
          <span class="hamburger__inner"></span>
        </span>
      </button>

      <nav class="main-navbar__nav">
        <ul class="nav-list">
          <li class="nav-list__item">
            <a href="#about" class="nav-list__link">O nas</a>
          </li>
          <li class="nav-list__item">
            <a href="#family" class="nav-list__link">Rodzina</a>
          </li>
          <li class="nav-list__item">
            <a href="#metrics" class="nav-list__link">Metryki</a>
          </li>
          <li class="nav-list__item">
            <a href="#join" class="btn-game btn-game--nav">Dołącz</a>
          </li>
        </ul>
      </nav>

      <transition name="navMobileSlide">
        <nav v-if="isMobileMenuOpen" class="main-navbar__mobile-drawer">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-list__item">
              <a
                href="#about"
                class="mobile-nav-list__link"
                @click="closeMobileMenu"
                >O nas</a
              >
            </li>
            <li class="mobile-nav-list__item">
              <a
                href="#family"
                class="mobile-nav-list__link"
                @click="closeMobileMenu"
                >Sojusze</a
              >
            </li>
            <li class="mobile-nav-list__item">
              <a
                href="#metrics"
                class="mobile-nav-list__link"
                @click="closeMobileMenu"
                >Statystyki</a
              >
            </li>
            <li class="mobile-nav-list__item">
              <a href="#join" class="btn-game" @click="closeMobileMenu"
                >Dołącz</a
              >
            </li>
          </ul>
        </nav>
      </transition>
    </div>

    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="main-navbar__overlay"
        @click="closeMobileMenu"
      ></div>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
.main-navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  background: rgba(3, 3, 3, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-top: 1px solid rgba($primaryColor, 0.4);
  border-bottom: 1px solid transparent;
  box-shadow: 0 -6px 20px rgba($primaryColor, 0.12);

  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &--sticky {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(3, 3, 3, 0.95);
    border-top: 1px solid transparent;
    border-bottom: 1px solid $primaryColor;
    box-shadow: 0 6px 25px rgba($primaryColor, 0.25);
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    z-index: 10;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    user-select: none;

    .brand-content {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-family: $headerFont;
      font-size: 1.4rem;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      line-height: 1.2;
      transition: color 0.2s ease;
    }

    .brand-slogan {
      font-size: 0.75rem;
      color: $primaryColor;
      letter-spacing: 0.5px;
      opacity: 0.85;
    }

    // 🎯 Jedno, zintegrowane zarządzanie animacją skrzydeł bez konfliktów klas
    &:hover {
      .brand-title {
        color: $primaryColor;
      }
      .husaria-wing {
        transform: translateY(-3px);

        &--right {
          transform: scaleX(-1) translateY(-3px); /* Zachowuje lustrzane odbicie podczas unoszenia */
        }
      }
    }
  }

  &__nav {
    display: flex;
    align-items: center;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 35px;

  &__link {
    font-family: $headerFont;
    font-size: 1rem;
    color: $fontColor;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition:
      color 0.2s ease,
      text-shadow 0.2s ease;

    &:hover {
      color: $hoverColor;
      text-shadow: 0 0 8px rgba($primaryColor, 0.4);
    }
  }

  .btn-game--nav {
    padding: 10px 24px;
    font-size: 0.9rem;
  }
}

// 🎯 Zoptymalizowana klasa bazowa dla skrzydeł w nawigacji
.husaria-wing {
  display: block;
  width: clamp(24px, 5vw, 42px);
  height: clamp(24px, 5vw, 42px);
  filter: drop-shadow(0 0 6px rgba($primaryColor, 0.5));
  opacity: 0.95;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;

  &--right {
    transform: scaleX(
      -1
    ); /* Tylko jedno, nadrzędne i pewne odbicie lustrzane */
  }
}

.main-navbar__mobile-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(5, 5, 5, 0.98);
  border-bottom: 2px solid $primaryColor;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  z-index: 5;

  .mobile-nav-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 25px;

    &__link {
      font-family: $headerFont;
      font-size: 1.2rem;
      color: #ffffff;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;

      &:focus,
      &:active {
        color: $primaryColor;
      }
    }

    .btn-game {
      width: 100%;
      max-width: 200px;
    }
  }
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1010;

  &__box {
    display: inline-block;
    width: 26px;
    height: 18px;
    position: relative;
  }

  &__inner {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    border-radius: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;

    &::before,
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: #ffffff;
      border-radius: 2px;
      position: absolute;
      transition: transform 0.2s ease;
    }

    &::before {
      top: -8px;
    }
    &::after {
      bottom: -8px;
    }
  }

  &.is-active {
    .hamburger__inner {
      background-color: transparent;

      &::before {
        transform: translateY(8px) rotate(45deg);
        background-color: $primaryColor;
      }
      &::after {
        transform: translateY(-8px) rotate(-45deg);
        background-color: $primaryColor;
      }
    }
  }
}

.navMobileSlide-enter-active,
.navMobileSlide-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.2s ease;
}

.navMobileSlide-enter-from,
.navMobileSlide-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-navbar {
    position: fixed !important;
    top: 0;
    left: 0;
  }

  .main-navbar__nav {
    display: none;
  }

  .hamburger {
    display: block;
  }
}
</style>
