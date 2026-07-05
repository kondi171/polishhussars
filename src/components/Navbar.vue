<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobileMenuOpen = ref(false);
const isSticky = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Pancerna funkcja oparta o wysokość okna (viewportu)
const handleScroll = () => {
  // Punktem przyklejenia jest wysokość całego ekranu minus 80px navbaru
  const triggerPoint = window.innerHeight - 80;

  isSticky.value = window.scrollY >= triggerPoint;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll); // Na wypadek zmiany rozmiaru okna
  handleScroll(); // Wywołanie na start
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
});
</script>

<template>
  <header :class="['main-navbar', { 'main-navbar--sticky': isSticky }]">
    <div class="main-navbar__container container">
      <a href="#" class="main-navbar__brand" @click="closeMobileMenu">
        <span class="brand-title">Polska Husaria</span>
        <span class="brand-slogan">Husaria doda ci skrzydeł</span>
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
  </header>
</template>

<style lang="scss" scoped>
.main-navbar {
  // CSS-owe zachowanie sticky działa automatycznie, gdy minie sekcję Header
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  background: rgba(3, 3, 3, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  // ==========================================
  // 🔘 STAN STARTOWY (Dno headera - efekty ON TOP)
  // ==========================================
  border-top: 1px solid rgba($primaryColor, 0.4);
  border-bottom: 1px solid transparent;

  // Cień rzucany w górę (ujemny Y) rozświetla dół Headera
  box-shadow: 0 -6px 20px rgba($primaryColor, 0.12);

  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  // ==========================================
  // ⚡ STAN STICKY (Góra okna - efekty ON BOTTOM)
  // ==========================================
  &--sticky {
    background: rgba(3, 3, 3, 0.95);

    // Odwrócenie linii granicznej na dół
    border-top: 1px solid transparent;
    border-bottom: 1px solid $primaryColor;

    // Odwrócenie poświaty w dół (dodatni Y) nad nadchodzącą treść
    box-shadow: 0 6px 25px rgba($primaryColor, 0.25);
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__brand {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    user-select: none;

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

    &:hover {
      .brand-title {
        color: $primaryColor;
      }
    }
  }

  &__nav {
    display: flex;
    align-items: center;
  }
}

// ==========================================
// LISTA LINKÓW (DESKTOP)
// ==========================================
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

// ==========================================
// DROPDOWN MOBILNY (DRAWER)
// ==========================================
.main-navbar__mobile-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(5, 5, 5, 0.98);
  border-bottom: 2px solid $primaryColor;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);

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

// ==========================================
// 🍔 HAMBURGER MOBILNY
// ==========================================
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

// ==========================================
// ANIMACJE MOBILNE (CamelCase)
// ==========================================
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

// ==========================================
// RESPONSYWNOŚĆ (RWD)
// ==========================================
@media (max-width: 768px) {
  .main-navbar__nav {
    display: none;
  }

  .hamburger {
    display: block;
  }
}
</style>
