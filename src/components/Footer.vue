<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Importy grafik (Vite ESM)
import cocLogo from "/img/footer/coc.png";
import iosBadge from "/img/footer/ios.webp";
import androidBadge from "/img/footer/android.webp";
import amazonBadge from "/img/footer/amazon.webp";

const footerRef = ref(null);
let observer = null;

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("isVisible");
      } else {
        entry.target.classList.remove("isVisible");
      }
    });
  }, observerOptions);

  if (footerRef.value) {
    observer.observe(footerRef.value);
  }
});

onUnmounted(() => {
  if (observer && footerRef.value) {
    observer.unobserve(footerRef.value);
  }
});
</script>

<template>
  <footer ref="footerRef" class="game-footer">
    <div class="game-footer__content container">
      <!-- 📱 SEKCJA POBIERANIA W STYLU SUPERCELL -->
      <div class="supercell-download">
        <!-- Lewa strona: Branding gry -->
        <div class="supercell-download__game">
          <img
            :src="cocLogo"
            alt="Clash of Clans"
            class="supercell-download__logo"
          />
          <div class="supercell-download__meta">
            <h4 class="supercell-download__title">Clash of Clans</h4>
            <p class="supercell-download__subtitle">
              Pobierz grę i dołącz do bitwy
            </p>
          </div>
        </div>

        <!-- Prawa strona: Badże sklepów -->
        <div class="supercell-download__stores">
          <!-- App Store -->
          <a
            href="https://apps.apple.com/app/clash-of-clans/id529479190"
            target="_blank"
            rel="noopener noreferrer"
            class="supercell-store-link"
          >
            <img :src="iosBadge" alt="Pobierz w App Store" />
          </a>

          <!-- Google Play -->
          <a
            href="https://play.google.com/store/custom-url"
            target="_blank"
            rel="noopener noreferrer"
            class="supercell-store-link"
          >
            <img :src="androidBadge" alt="Pobierz w Google Play" />
          </a>

          <!-- Amazon Appstore -->
          <a
            href="https://www.amazon.com/Supercell-Clash-of-Clans/dp/B00U7976Z6"
            target="_blank"
            rel="noopener noreferrer"
            class="supercell-store-link"
          >
            <img :src="amazonBadge" alt="Pobierz w Amazon Appstore" />
          </a>
        </div>
      </div>

      <hr class="game-footer__separator" />

      <!-- 📜 INFORMACJE PRAWNE i ROZBUDOWANY REFLINK AUTORSKI -->
      <div class="game-footer__legal">
        <div class="game-footer__credits">
          <span class="credits-title">Projekt i wykonanie:</span>
          <div class="credits-accounts">
            <a
              href="https://github.com/kondi171"
              target="_blank"
              rel="noopener noreferrer"
              class="author-link"
            >
              👑 @KondiTheKing <span class="role">[Product Owner]</span>
            </a>
            <a
              href="https://github.com/kondi171"
              target="_blank"
              rel="noopener noreferrer"
              class="author-link"
            >
              ⚡ @KondiThePrime <span class="role">[Lead Architect]</span>
            </a>
            <a
              href="https://github.com/kondi171"
              target="_blank"
              rel="noopener noreferrer"
              class="author-link"
            >
              👹 @KondiTheBeast <span class="role">[Backend Monster]</span>
            </a>
            <a
              href="https://github.com/kondi171"
              target="_blank"
              rel="noopener noreferrer"
              class="author-link"
            >
              🧠 @KondiTheMentor <span class="role">[Code Reviewer]</span>
            </a>
          </div>
        </div>

        <p class="game-footer__copy">
          &copy; 2026 Polska Husaria. Wszelkie prawa zastrzeżone.
        </p>

        <p class="game-footer__disclaimer">
          Ta strona nie jest powiązana z Supercell, nie jest przez nich
          sponsorowana ani wspierana.
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.game-footer {
  background-color: #030303;
  border-top: 1px solid #1a1612;
  padding: 60px 20px 40px 20px;
  color: $fontColor;
  overflow: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
}

// ==========================================
// KIERUNKOWY SYSTEM TRANSYCJI (ENTRY EFFECTS)
// ==========================================
.supercell-download__game {
  opacity: 0;
  transform: translateX(-50px);
  transition:
    transform 0.7s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.7s ease;
}

.supercell-download__stores {
  opacity: 0;
  transform: translateX(50px);
  transition:
    transform 0.7s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.7s ease;
}

.game-footer__separator {
  width: 100%;
  border: 0;
  height: 1px;
  background: #161412;
  margin: 0;
  opacity: 0;
  transform: scaleX(0);
  transform-origin: center;
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
}

.game-footer__legal {
  text-align: center;
  font-size: 0.85rem;
  opacity: 0;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: translateY(20px);
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;
}

// Aktywacja stanów po wejściu w pole widzenia
.game-footer.isVisible {
  .supercell-download__game {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 0.1s;
  }

  .supercell-download__stores {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 0.2s;
  }

  .game-footer__separator {
    opacity: 1;
    transform: scaleX(1);
    transition-delay: 0.35s;
  }

  .game-footer__legal {
    opacity: 0.7;
    transform: translateY(0);
    transition-delay: 0.45s;
  }
}

// ==========================================
// KONTENER DOWNLOADU SUPERCELL & IDLE EFFECTS
// ==========================================
.supercell-download {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 30px;

  &__game {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__logo {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    object-fit: cover;
    animation: logoAmbientPulse 4s infinite ease-in-out;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    font-family: $headerFont;
    font-size: 1.5rem;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }

  &__subtitle {
    font-size: 0.95rem;
    color: #8a8580;
    margin: 0;
  }

  &__stores {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

// NOWY SYSTEM EMERYTALNY DLA KONT DEWELOPERSKICH
.game-footer__credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  .credits-title {
    font-size: 0.8rem;
    color: #8a8580;
    text-transform: uppercase;
    font-family: $headerFont;
    letter-spacing: 1px;
  }
}

.credits-accounts {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px 24px;
  flex-wrap: wrap;

  .author-link {
    color: $primaryColor;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 0.85rem;
    white-space: nowrap;
    transition:
      color 0.2s ease,
      text-shadow 0.2s ease;

    .role {
      font-size: 0.75rem;
      color: #6a645e;
      font-weight: 400;
      margin-left: 4px;
      transition: color 0.2s ease;
    }

    &:hover {
      color: $hoverColor;
      text-shadow: 0 0 8px rgba($primaryColor, 0.6);

      .role {
        color: #8a8580;
      }
    }
  }
}

.game-footer__copy {
  margin: 0;
}

.game-footer__disclaimer {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-top: 4px;
}

// ==========================================
// REAKCJA PRZYCISKÓW SKLEPÓW (STORE BADGES)
// ==========================================
.supercell-store-link {
  display: inline-block;
  height: 40px;
  transition:
    transform 0.2s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.2s ease;
  will-change: transform;

  img {
    height: 100%;
    width: auto;
    display: block;
    border-radius: 6px;
  }

  &:hover {
    transform: scale(1.04);
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.98);
  }
}

// ==========================================
// ANIMACJE @KEYFRAMES (CamelCase)
// ==========================================
@keyframes logoAmbientPulse {
  0%,
  100% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
    filter: brightness(1);
  }
  50% {
    box-shadow: 0 4px 22px rgba($primaryColor, 0.25);
    filter: brightness(1.05);
  }
}

// ==========================================
// RESPONSYWNOŚĆ (RWD)
// ==========================================
@media (max-width: 900px) {
  .supercell-download {
    flex-direction: column;
    text-align: center;
    gap: 25px;

    &__game {
      flex-direction: column;
      gap: 12px;
    }

    &__stores {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  .supercell-download__game {
    transform: translateY(-30px);
  }
  .supercell-download__stores {
    transform: translateY(30px);
  }

  .credits-accounts {
    flex-direction: column;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .supercell-download__stores {
    flex-direction: column;
    width: 100%;
  }

  .supercell-store-link {
    width: 100%;
    max-width: 200px;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
