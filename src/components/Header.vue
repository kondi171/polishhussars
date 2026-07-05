<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const lines = [
  "Szukasz zgranej i ambitnej ekipy, która podchodzi do gry z głową, ale bez toksycznej presji?",
  "Dołącz do osób, dzięki którym zyskasz najwięcej!",
  "Dołącz do Polskiej Husarii! Dołącz do nas!",
];

const animationClasses = [
  "anim--fadeInUp",
  "anim--fadeInLeft",
  "anim--fadeInRight",
];

const currentLineIndex = ref(0);
const isIntro = ref(true);

// 🎯 Ref przechowujący postęp scrollowania (od 0 do 1)
const scrollProgress = ref(0);

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const headerHeight = window.innerHeight || 800;
  scrollProgress.value = Math.min(scrollTop / headerHeight, 1);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  setTimeout(() => {
    isIntro.value = false;
  }, 3500);

  setInterval(() => {
    currentLineIndex.value = (currentLineIndex.value + 1) % lines.length;
  }, 4500);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="hero-header" :style="{ '--scroll-progress': scrollProgress }">
    <div class="hero-header__bg"></div>
    <div class="hero-header__overlay"></div>
    <div class="hero-header__darkener"></div>

    <div class="fireflies">
      <div v-for="n in 40" :key="n" class="firefly"></div>
    </div>

    <div class="hero-header__content container">
      <div class="hero-header__badge-wrapper anim--fadeInTop">
        <svg
          class="husaria-wing husaria-wing--left"
          viewBox="0 0 70 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="husariaGrad"
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
            fill="url(#husariaGrad)"
          />
        </svg>

        <div class="hero-header__badge">Husaria doda ci skrzydeł!</div>

        <svg
          class="husaria-wing husaria-wing--right"
          viewBox="0 0 70 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M65,95 L62,75 C59,60 53,45 42,30 C32,16 18,5 2,2 C12,10 24,20 32,32 C18,25 8,22 1,24 C13,32 25,41 34,51 C24,46 14,44 6,47 C17,54 28,63 36,72 C28,69 20,68 13,70 C24,76 36,82 46,87 C41,86 33,85 27,87 C38,91 52,94 65,95 Z"
            fill="url(#husariaGrad)"
          />
        </svg>
      </div>

      <h1
        class="hero-header__title anim--fadeInTitle"
        data-text="Polska Husaria"
      >
        Polska Husaria
      </h1>

      <Transition name="lineFade" mode="out-in">
        <p
          :key="currentLineIndex"
          :class="[
            'hero-header__subtitle',
            animationClasses[currentLineIndex],
            { 'anim--introSubtitle': isIntro },
          ]"
        >
          {{ lines[currentLineIndex] }}
        </p>
      </Transition>

      <div class="hero-header__actions">
        <a
          href="https://discord.gg/4ZYAdMEK"
          target="_blank"
          class="btn-action btn-action--discord anim--pulseDiscord anim--btnInLeft"
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
          href="https://link.clashofclans.com/en?action=OpenClanProfile&tag=2YRL8C2Q2"
          target="_blank"
          class="btn-action btn-action--game anim--pulseGame anim--btnInRight"
        >
          <span class="btn-action__icon">⚔️</span>
          <span class="btn-action__text">Dołącz w Klanie!</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "sass:math";

.hero-header {
  position: relative;
  min-height: calc(
    100dvh - 80px
  ); /* Elastyczna wysokość chroniąca przed overflowem */
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  border-bottom: 3px solid $primaryColor;
  clip-path: inset(0);
  padding: clamp(30px, 6vh, 60px) 0; /* Zmniejszony padding pionowy na małych ekranach */

  &__bg {
    position: fixed;
    inset: 0;
    background: url("@/assets/img/header.png") center/cover no-repeat;
    transform: scale(1.03);
    animation: subtleZoom 12s infinite alternate ease-in-out;
    z-index: 0;
    pointer-events: none;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 8, 7, 0.2) 0%,
      rgba(15, 12, 10, 0.5) 50%,
      rgba(13, 13, 13, 1) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  &__darkener {
    position: fixed;
    inset: 0;
    background: #000000;
    z-index: 2;
    pointer-events: none;
    opacity: calc(var(--scroll-progress) * 0.8);
    will-change: opacity;
  }

  &__content {
    position: relative;
    z-index: 3;
    max-width: 900px;
    padding: 0 16px; /* Zwężone marginesy boczne kontenera dla zyskania przestrzeni */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__badge-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 12px; /* Zmniejszone odstępy skrzydeł */
    margin-bottom: clamp(12px, 3vh, 24px);
  }

  .husaria-wing {
    display: block;
    width: clamp(
      24px,
      5vw,
      46px
    ); /* Bezpieczniejsze, bardziej kompaktowe skrzydła */
    height: clamp(24px, 5vw, 46px);
    filter: drop-shadow(0 0 6px rgba($primaryColor, 0.5));
    opacity: 0.95;

    &--right {
      transform: scaleX(-1);
    }
  }

  &__badge {
    font-family: $headerFont;
    color: $hoverColor;
    font-size: clamp(
      0.8rem,
      2.2vw,
      1.1rem
    ); /* Delikatnie zmniejszony tekst badge */
    font-weight: bold;
    letter-spacing: clamp(1px, 0.4vw, 3px);
    text-transform: uppercase;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.9);
  }

  &__title {
    font-family: $headerFont;
    font-size: clamp(
      2rem,
      7vw,
      5.2rem
    ); /* 🎯 Skorygowany dół i góra – tekst nie rozepchnie ekranu */
    margin: 0 auto clamp(20px, 4vh, 36px) auto;
    font-weight: 900;
    text-transform: uppercase;
    position: relative;
    color: #e6e2de;
    width: 100%;
    max-width: 100%;
    text-align: center;

    @media (max-width: 768px) {
      line-height: 1.15;
    }

    &::after {
      content: attr(data-text);
      position: absolute;
      inset: 0;
      background: linear-gradient(
        115deg,
        transparent 35%,
        rgba(255, 255, 255, 0.85) 45%,
        #ffffff 50%,
        rgba($primaryColor, 0.7) 55%,
        transparent 65%
      );
      background-size: 200% 100%;
      background-position: 100% 0;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: none !important;
      pointer-events: none;
      animation: glassShine 4s infinite linear;
      animation-delay: 1.5s;
    }
  }

  &__subtitle {
    font-size: clamp(
      0.95rem,
      2.6vw,
      1.3rem
    ); /* Kompaktowy, czytelny podtytuł */
    line-height: 1.6;
    color: #e6e2de;
    margin-bottom: clamp(30px, 5vh, 50px);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
    font-weight: 400;
    display: inline-block;
    width: 100%;
    max-width: 750px;
    min-height: clamp(
      3.8rem,
      8vw,
      4.8rem
    ); /* Obniżony min-height zapobiega pustej przestrzeni */
    will-change: transform, opacity;
  }

  &__actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    /* Zsynchronizowano breakpoint z Join.vue (640px) */
    @media (max-width: 640px) {
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 0 10px;
    }
  }
}

// ==========================================
// ANIMACJE INTRO (Ujednolicone CamelCase)
// ==========================================
.anim--fadeInTitle {
  opacity: 0;
  filter: blur(15px);
  animation:
    introTitle 1.5s cubic-bezier(0.19, 1, 0.22, 1) both,
    titleSpacingPulse 10s ease-in-out infinite;
  animation-delay: 0s, 1.5s;
}

.anim--fadeInTop {
  opacity: 0;
  filter: blur(10px);
  animation:
    introBadge 1.2s cubic-bezier(0.19, 1, 0.22, 1) both,
    floatBadge 4s ease-in-out infinite;
  animation-delay: 1s, 2.2s;
}

.anim--introSubtitle {
  animation-delay: 2s !important;
}

.anim--btnInLeft {
  opacity: 0;
  transform: translateX(-40px);
  filter: blur(10px);
  animation: introArrivalLeft 1.2s cubic-bezier(0.19, 1, 0.22, 1) both;
  animation-delay: 3s;

  /* Zsynchronizowano breakpoint z Join.vue (640px) */
  @media (max-width: 640px) {
    transform: translateY(
      20px
    ); /* Na mobile przyjeżdża z dołu zamiast z boku – stabilniejsze wizualnie */
  }
}

.anim--btnInRight {
  opacity: 0;
  transform: translateX(40px);
  filter: blur(10px);
  animation: introArrivalRight 1.2s cubic-bezier(0.19, 1, 0.22, 1) both;
  animation-delay: 3s;

  /* Zsynchronizowano breakpoint z Join.vue (640px) */
  @media (max-width: 640px) {
    transform: translateY(20px);
  }
}

// ==========================================
// KARUZELA OPISÓW
// ==========================================
.lineFade-leave-active {
  transition: opacity 0.3s ease;
}
.lineFade-leave-to {
  opacity: 0;
}

.anim--fadeInUp {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.anim--fadeInLeft {
  animation: fadeInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.anim--fadeInRight {
  animation: fadeInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

// ==========================================
// KEYFRAMES (CamelCase)
// ==========================================
@keyframes subtleZoom {
  0% {
    transform: scale(1.02) translateY(0);
  }
  100% {
    transform: scale(1.07) translateY(-4px);
  }
}

@keyframes introTitle {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.98);
    filter: blur(12px);
    letter-spacing: 10px;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
    letter-spacing: normal;
  }
}

@keyframes introBadge {
  0% {
    opacity: 0;
    transform: translateY(-30px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes introArrivalLeft {
  0% {
    opacity: 0;
    transform: translateX(-40px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes introArrivalRight {
  0% {
    opacity: 0;
    transform: translateX(40px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes floatBadge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes titleSpacingPulse {
  0%,
  100% {
    text-shadow:
      0 1px 0 #d4a359,
      0 2px 0 #b8863b,
      0 4px 8px rgba(0, 0, 0, 0.9),
      0 0 15px rgba($redColor, 0.4);
  }
  50% {
    text-shadow:
      0 1px 0 #d4a359,
      0 2px 0 #b8863b,
      0 7px 14px rgba(0, 0, 0, 0.9),
      0 0 25px rgba($primaryColor, 0.7);
  }
}

@keyframes glassShine {
  0% {
    background-position: 100% 0;
  }
  25% {
    background-position: 0% 0;
  }
  100% {
    background-position: 0% 0;
  }
}

// ==========================================
// PRZYCISKI AKCJI
// ==========================================
.btn-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 275px; /* Bezpieczna szerokość maksymalna na desktopie */
  color: #ffffff;
  font-family: $headerFont;
  font-size: clamp(
    0.95rem,
    2.5vw,
    1.1rem
  ); /* Delikatnie obniżona wielkość fontu */
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 18px; /* Odchudzone paddingi dające świetny, kompaktowy wygląd gry */
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 5;
  will-change: transform, opacity;

  /* 🎯 Zsynchronizowano z Join.vue – przyciski stają się mniejsze i zgrabniejsze */
  @media (max-width: 640px) {
    max-width: 250px;
    padding: 10px 14px;
    gap: 10px;
    font-size: 0.95rem; /* Nadpisanie clamp na rzecz stałej, mniejszej wartości */
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
    width: 22px;
    height: 22px;
    font-size: 1.25rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;

    /* Dopasowanie rozmiaru ikonki dokładnie jak w Join.vue */
    @media (max-width: 640px) {
      width: 20px;
      height: 20px;
      font-size: 1.15rem;
    }
  }
  &__text {
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
  }

  &--discord {
    background: linear-gradient(135deg, #5865f2 0%, #404eed 100%);
    border: 2px solid #727eff;
    box-shadow: 0 0 20px rgba(88, 101, 242, 0.35);

    .btn-action__waves {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: -1;
      .wave {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: rgba(88, 101, 242, 0.35);
        border-radius: 8px;
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
      }
    }

    &:hover {
      box-shadow: 0 0 35px rgba(88, 101, 242, 0.7);
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
    box-shadow: 0 0 20px rgba($redColor, 0.4);

    &:hover {
      box-shadow: 0 0 35px rgba($primaryColor, 0.7);
      border-color: $hoverColor;
      &::before {
        animation: flarePass 1.5s infinite linear !important;
      }
    }
  }

  &:hover {
    transform: translateY(-3px) scale(1.015);
    .btn-action__icon {
      transform: scale(1.15);
    }
  }
}

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

@keyframes autoShockwave {
  0%,
  60%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  40% {
    transform: translate(-50%, -50%) scale(1.2, 1.4);
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
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4, 1.6);
  }
}

// ==========================================
// SYSTEM ISKIER (Zoptymalizowany pod mobile)
// ==========================================
.fireflies {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
.firefly {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  opacity: 0;
  bottom: -10px;
  @for $i from 1 through 40 {
    &:nth-child(#{$i}) {
      left: math.random(100) * 1%;
      animation: riseParticles #{math.random(6) + 4}s infinite linear;
      animation-delay: #{math.random(5)}s;
      width: #{math.random(4) + 3}px;
      height: #{math.random(4) + 3}px;
      $particleColor: $redColor;
      @if $i % 2 == 0 {
        $particleColor: $primaryColor;
      }
      background: radial-gradient(
        circle,
        $particleColor 0%,
        rgba(0, 0, 0, 0) 70%
      );
    }
  }
}

@keyframes riseParticles {
  0% {
    bottom: -10px;
    transform: translateX(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0.85;
  }
  80% {
    opacity: 0.35;
  }
  100% {
    bottom: 110%;
    transform: translateX(#{math.random(100) - 50}px) scale(0.1);
    opacity: 0;
  }
}
</style>
