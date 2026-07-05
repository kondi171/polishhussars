<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const discordLink = "https://discord.gg/4ZYAdMEK";
const clanLink =
  "https://link.clashofclans.com/en?action=OpenClanProfile&tag=2YRL8C2Q2";

const sectionRef = ref(null);
let observer = null;

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.15,
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

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value);
  }
});
</script>

<template>
  <section ref="sectionRef" class="join-ultimate-section">
    <div class="war-fog war-fog--layer1"></div>

    <div class="battle-embers">
      <div v-for="n in 45" :key="n" class="ember"></div>
    </div>

    <div class="container join-content">
      <h2 class="join-title">Dołącz do husarii</h2>

      <p class="join-description">
        Nie szukamy tylko graczy, szukamy wojowników. Jeśli Twoja wioska jest
        gotowa, a Twoja ambicja sięga poziomu Mistrzów – nasze szeregi stoją
        otworem. Spełnij wymagania, chwyć za miecz i stań ramię w ramię z
        najlepszymi.
      </p>

      <div class="join-actions">
        <a
          :href="discordLink"
          target="_blank"
          class="btn-action btn-action--discord anim--pulseDiscord"
        >
          <div class="btn-action__waves"><span class="wave"></span></div>
          <span class="btn-action__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
              <path
                fill="currentColor"
                d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.79-.58,1.57-1.19,2.31-1.82a75,75,0,0,0,73.4,0c.75.63,1.53,1.24,2.32,1.82a68.17,68.17,0,0,1-10.5,5,78.22,78.22,0,0,0,6.63,10.85,105.35,105.35,0,0,0,32.61-18.83C129.81,49.82,123.83,27,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"
              />
            </svg>
          </span>
          <span class="btn-action__text">Dołącz na Discord!</span>
        </a>

        <a
          :href="clanLink"
          target="_blank"
          class="btn-action btn-action--game anim--pulseGame"
        >
          <span class="btn-action__icon">⚔️</span>
          <span class="btn-action__text">Dołącz w Klanie!</span>
        </a>
      </div>
    </div>

    <div class="war-fog war-fog--layer2"></div>
  </section>
</template>

<style lang="scss" scoped>
@use "sass:math";

.join-ultimate-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-image: url("@/assets/img/join.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.95)
    );
    z-index: 1;
  }
}

// ==========================================
// KIERUNKOWY SYSTEM FADE IN / FADE OUT
// ==========================================
.join-title {
  opacity: 0;
  transform: translateY(-60px);
  transition:
    transform 0.7s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.7s ease;
}

.join-description {
  opacity: 0;
  transform: translateY(60px);
  transition:
    transform 0.7s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.7s ease;
}

.btn-action--discord {
  opacity: 0;
  transform: translateX(-80px);
  transition:
    transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.15),
    opacity 0.7s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.btn-action--game {
  opacity: 0;
  transform: translateX(80px);
  transition:
    transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.15),
    opacity 0.7s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.join-ultimate-section.isVisible {
  .join-title {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.1s;
  }

  .join-description {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.25s;
  }

  .btn-action--discord,
  .btn-action--game {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 0.4s;
  }
}

// ==========================================
// BEZSZWOWE WARSTWY MGŁY WOJENNEJ (SEAMLESS WAR FOG)
// ==========================================
.war-fog {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-repeat: repeat-x;
  background-size: 200% auto;
  mix-blend-mode: screen;

  background-image:
    radial-gradient(
      circle at 0% 85%,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 100% 85%,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 35%,
      rgba($primaryColor, 0.05) 0%,
      transparent 35%
    ),
    radial-gradient(
      circle at 30% 65%,
      rgba(255, 255, 255, 0.06) 0%,
      transparent 25%
    ),
    radial-gradient(
      circle at 70% 50%,
      rgba($redColor, 0.04) 0%,
      transparent 25%
    );

  &--layer1 {
    z-index: 2;
    opacity: 0.85;
    animation: fogDrift 50s infinite linear;
  }

  &--layer2 {
    z-index: 5;
    opacity: 0.35;
    filter: blur(6px);
    animation: fogDrift 28s infinite linear reverse;
  }
}

// ==========================================
// SYSTEM ISKIER BITEWNYCH (BATTLE EMBERS)
// ==========================================
.battle-embers {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.ember {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  top: -20px;

  @for $i from 1 through 45 {
    &:nth-child(#{$i}) {
      left: math.random(120) * 1% - 10%;
      animation: battleEmbers #{math.random(5) + 4}s infinite linear;
      animation-delay: #{math.random(6)}s;
      width: #{math.random(3) + 2}px;
      height: #{math.random(3) + 2}px;

      $colorRoll: math.random(3);
      $emberColor: $redColor;
      @if $colorRoll == 2 {
        $emberColor: $primaryColor;
      } @else if $colorRoll == 3 {
        $emberColor: #ff6a00;
      }

      background: radial-gradient(circle, $emberColor 0%, rgba(0, 0, 0, 0) 80%);
      filter: blur(0.5px) drop-shadow(0 0 5px $emberColor);
    }
  }
}

// ==========================================
// STRUKTURA TREŚCI
// ==========================================
.join-content {
  position: relative;
  z-index: 4;
  text-align: center;
  max-width: 700px;
  padding: 40px 0;
}

.join-title {
  font-family: $headerFont;
  font-size: 3.5rem;
  color: $primaryColor;
  text-transform: uppercase;
  margin-bottom: 25px;
  letter-spacing: 2px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.join-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 45px;
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}

.join-actions {
  display: flex;
  flex-direction: row;
  gap: 25px;
  justify-content: center;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
  }
}

// ==========================================
// PRZYCISKI AKCJI (UJEDNOLICONA SZEROKOŚĆ)
// ==========================================
.btn-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex: 1;
  min-width: 280px;
  max-width: 300px;
  color: #ffffff;
  font-family: $headerFont;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  padding: 18px 20px;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  z-index: 10;
  will-change: transform, opacity;

  @media (max-width: 640px) {
    width: 100%;
    max-width: 250px;
    min-width: 0;
    padding: 10px 14px;
    gap: 10px;
    font-size: 0.95rem;
    border-radius: 7px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
  }

  &__icon {
    display: flex;
    align-items: center;
    width: 28px; /* Podbito z 26px dla doskonałych proporcji na desktopie */
    height: 28px;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    flex-shrink: 0; /* 🎯 Zabezpieczenie z headera: blokuje kurczenie się ikony */

    @media (max-width: 640px) {
      width: 20px;
      height: 20px;
      font-size: 1.15rem;
    }
  }

  &__text {
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
  }

  &--discord {
    background: linear-gradient(135deg, #5865f2 0%, #404eed 100%);
    border: 2px solid #727eff;
    box-shadow: 0 0 25px rgba(88, 101, 242, 0.4);

    .btn-action__waves .wave {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: rgba(88, 101, 242, 0.4);
      border-radius: 8px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 0 40px rgba(88, 101, 242, 0.8);
      background: linear-gradient(135deg, #6773f3 0%, #4e5af5 100%);
      .wave {
        animation: shockwave 1.2s infinite ease-out !important;
      }
      &::before {
        animation: flarePass 1.5s infinite linear !important;
      }
    }
  }

  &--game {
    background: linear-gradient(180deg, $redColor 0%, #630a0a 100%);
    border: 2px solid $primaryColor;
    box-shadow: 0 0 25px rgba($redColor, 0.5);

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 0 40px rgba($primaryColor, 0.8);
      border-color: $hoverColor;
      &::before {
        animation: flarePass 1.5s infinite linear !important;
      }
    }
  }

  &:hover {
    .btn-action__icon {
      transform: scale(1.2);
    }
  }
}

// ==========================================
// BEZCZYNNE PULSOWANIE
// ==========================================
.anim--pulseDiscord {
  &::before {
    animation: autoFlare 5s infinite linear 4.5s;
  }
  .btn-action__waves .wave {
    animation: autoShockwave 5s infinite ease-out 4.5s;
  }
}

.anim--pulseGame {
  &::before {
    animation: autoFlare 5s infinite linear 7s;
  }
}

.btn-action:hover {
  &.anim--pulseDiscord .btn-action__waves .wave {
    animation: none;
  }
  &::before {
    animation: none;
  }
}

// ==========================================
// REGUŁY ANIMACJI (@KEYFRAMES)
// ==========================================
@keyframes fogDrift {
  0% {
    background-position: 0 bottom;
  }
  100% {
    background-position: 200% bottom;
  }
}

@keyframes battleEmbers {
  0% {
    top: -20px;
    transform: translateX(0) rotate(0deg) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    top: 110%;
    transform: translateX(#{math.random(120) + 60}px) rotate(450deg) scale(0.2);
    opacity: 0;
  }
}

@keyframes autoShockwave {
  0%,
  60%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  40% {
    transform: translate(-50%, -50%) scale(1.3, 1.5);
    opacity: 0;
  }
}

@keyframes autoFlare {
  0%,
  70%,
  100% {
    left: -100%;
  }
  20%,
  50% {
    left: 150%;
  }
}

@keyframes flarePass {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}

@keyframes shockwave {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5, 1.7);
  }
}

// ==========================================
// RWD I MOBILKI
// ==========================================
@media (max-width: 768px) {
  .join-ultimate-section {
    background-attachment: scroll;
  }

  .join-title {
    font-size: 2.4rem;
    margin-bottom: 15px;
    transform: translateY(-40px);
  }

  .join-description {
    font-size: 1rem;
    margin-bottom: 35px;
    transform: translateY(40px);
  }

  .btn-action--discord {
    transform: translateX(-40px);
  }

  .btn-action--game {
    transform: translateX(40px);
  }

  .war-fog--layer2 {
    opacity: 0.15;
  }
}
</style>
