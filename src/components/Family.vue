<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Definicja klanów z pełną strukturą pól reaktywnych
const divisions = ref([
  {
    type: "Klan Główny",
    name: "Polska Husaria",
    tag: "#2YRL8C2Q2",
    badgeUrl: null,
    clanLevel: null,
    members: null,
    warLeague: "Unranked",
    capitalLeague: "Unranked",
    clanTrophies: null,
    builderBaseTrophies: null,
    capitalTrophies: null,
    labels: [],
    warWins: null,
    warLosses: null,
    warDraws: null,
    warWinStreak: null,
    warFrequency: null,
    isFamilyFriendly: null,
    isLoading: true,
  },
  {
    type: "Akademia",
    name: "Polska KroplAK",
    tag: "#2G0UV8RGC",
    badgeUrl: null,
    clanLevel: null,
    members: null,
    warLeague: "Unranked",
    capitalLeague: "Unranked",
    clanTrophies: null,
    builderBaseTrophies: null,
    capitalTrophies: null,
    labels: [],
    warWins: null,
    warLosses: null,
    warDraws: null,
    warWinStreak: null,
    warFrequency: null,
    isFamilyFriendly: null,
    isLoading: true,
  },
  {
    type: "CW podczas CWL",
    name: "Liga Dobra",
    tag: "#2JJ20PLL8",
    badgeUrl: null,
    clanLevel: null,
    members: null,
    warLeague: "Unranked",
    capitalLeague: "Unranked",
    clanTrophies: null,
    builderBaseTrophies: null,
    capitalTrophies: null,
    labels: [],
    warWins: null,
    warLosses: null,
    warDraws: null,
    warWinStreak: null,
    warFrequency: null,
    isFamilyFriendly: null,
    isLoading: true,
  },
]);

const alliances = ref([
  {
    type: "Sojusz",
    name: "ReAktywni",
    tag: "#V8U8PJ28",
    badgeUrl: null,
    clanLevel: null,
    members: null,
    warLeague: "Unranked",
    capitalLeague: "Unranked",
    clanTrophies: null,
    builderBaseTrophies: null,
    capitalTrophies: null,
    labels: [],
    warWins: null,
    warLosses: null,
    warDraws: null,
    warWinStreak: null,
    warFrequency: null,
    isFamilyFriendly: null,
    isLoading: true,
  },
  {
    type: "Sojusz",
    name: "Polska Reborn",
    tag: "#2RP90Y82P",
    badgeUrl: null,
    clanLevel: null,
    members: null,
    warLeague: "Unranked",
    capitalLeague: "Unranked",
    clanTrophies: null,
    builderBaseTrophies: null,
    capitalTrophies: null,
    labels: [],
    warWins: null,
    warLosses: null,
    warDraws: null,
    warWinStreak: null,
    warFrequency: null,
    isFamilyFriendly: null,
    isLoading: true,
  },
  {
    type: "Sojusz",
    name: "Polska Kropla",
    tag: "#2Y2LPLUC9",
    badgeUrl: null,
    clanLevel: null,
    members: null,
    warLeague: "Unranked",
    capitalLeague: "Unranked",
    clanTrophies: null,
    builderBaseTrophies: null,
    capitalTrophies: null,
    labels: [],
    warWins: null,
    warLosses: null,
    warDraws: null,
    warWinStreak: null,
    warFrequency: null,
    isFamilyFriendly: null,
    isLoading: true,
  },
]);

const mainTitle = ref(null);
const divisionGroup = ref(null);
const allianceGroup = ref(null);
let observer = null;

// Tłumaczenie częstotliwości wojen na język polski
const translateFrequency = (freq) => {
  const mapping = {
    always: "Zawsze",
    moreThanOncePerWeek: "Często",
    oncePerWeek: "1x / tydzień",
    lessThanOncePerWeek: "Rzadko",
    never: "Nigdy",
    unknown: "Nieznana",
  };
  return mapping[freq] || freq || "Nieznana";
};

// Funkcja pobierająca ikony z przedrostkiem "War"
const getLeagueIcon = (name) => {
  if (!name || typeof name !== "string" || name.toLowerCase() === "unranked") {
    return null;
  }
  try {
    const cleanName = name.replace(/\s*League\s*/i, "").replace(/\s+/g, "");
    return `/img/leagues/War${cleanName}.webp`;
  } catch (e) {
    return null;
  }
};

const fetchClanData = async (clan) => {
  if (!clan.tag || clan.tag.includes("---")) {
    clan.isLoading = false;
    return;
  }

  try {
    const response = await fetch(`/api?tag=${encodeURIComponent(clan.tag)}`);
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const data = await response.json();

    clan.name = data.name;
    clan.clanLevel = data.clanLevel;
    clan.members = data.members;
    clan.badgeUrl = data.badgeUrls?.medium;
    clan.isFamilyFriendly = data.isFamilyFriendly;

    clan.warLeague = data.warLeague?.name || "Unranked";
    clan.capitalLeague = data.capitalLeague?.name || "Unranked";

    clan.clanTrophies = data.clanPoints;
    clan.builderBaseTrophies = data.clanBuilderBasePoints;
    clan.capitalTrophies = data.clanCapitalPoints;

    clan.labels = data.labels || [];

    // Mapowanie danych wojennych z API
    clan.warWins = data.warWins;
    clan.warLosses = data.warLosses;
    clan.warDraws = data.warTies;
    clan.warWinStreak = data.warWinStreak;
    clan.warFrequency = data.warFrequency || "unknown";
  } catch (error) {
    console.error(`Nie udało się pobrać danych dla ${clan.name}:`, error);
    clan.warLeague = "Unranked";
    clan.capitalLeague = "Unranked";
  } finally {
    setTimeout(() => {
      clan.isLoading = false;
    }, 200);
  }
};

onMounted(async () => {
  const observerOptions = { root: null, threshold: 0.1 };

  // POPRAWKA: Dodanie obsługi usuwania klasy isVisible (obsługa przewijania góra/dół)
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("isVisible");
      } else {
        entry.target.classList.remove("isVisible");
      }
    });
  }, observerOptions);

  if (mainTitle.value) observer.observe(mainTitle.value);
  if (divisionGroup.value) observer.observe(divisionGroup.value);
  if (allianceGroup.value) observer.observe(allianceGroup.value);

  const allClans = [...divisions.value, ...alliances.value];
  await Promise.all(allClans.map((clan) => fetchClanData(clan)));
});

// POPRAWKA: Czyszczenie obserwatora przy niszczeniu komponentu
onUnmounted(() => {
  if (observer) {
    if (mainTitle.value) observer.unobserve(mainTitle.value);
    if (divisionGroup.value) observer.unobserve(divisionGroup.value);
    if (allianceGroup.value) observer.unobserve(allianceGroup.value);
  }
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

            <Transition name="fade" mode="out-in">
              <div v-if="clan.isLoading" class="clan-card__loader" key="loader">
                <span class="spinner"></span>
                <span>Ładowanie danych...</span>
              </div>

              <div v-else class="clan-card__main" key="content">
                <div class="clan-card__left-col">
                  <div class="clan-card__icon-wrapper">
                    <img
                      v-if="clan.badgeUrl"
                      :src="clan.badgeUrl"
                      :alt="clan.name"
                      class="clan-card__crest-img"
                    />
                    <span v-else class="clan-card__fallback-emoji">🛡️</span>
                  </div>

                  <div v-if="clan.warFrequency" class="clan-card__war-stats">
                    <div class="war-item">
                      <span class="war-item__label">Częstość</span>
                      <span class="war-item__value frequency">{{
                        translateFrequency(clan.warFrequency)
                      }}</span>
                    </div>

                    <div v-if="clan.warWinStreak !== null" class="war-item">
                      <span class="war-item__label">Seria</span>
                      <span class="war-item__value streak"
                        >🔥 {{ clan.warWinStreak }}</span
                      >
                    </div>

                    <div class="war-item">
                      <span class="war-item__label">Bilans</span>
                      <div class="war-item__value record">
                        <span class="w" title="Wygrane">{{
                          clan.warWins || 0
                        }}</span>
                        <span class="sep">/</span>
                        <span class="d" title="Remisy">{{
                          clan.warDraws || 0
                        }}</span>
                        <span class="sep">/</span>
                        <span class="l" title="Przegrane">{{
                          clan.warLosses || 0
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="clan-card__info">
                  <h4 class="clan-card__name">
                    {{ clan.name }}
                    <img
                      v-if="clan.isFamilyFriendly"
                      src="/img/icons/family.png"
                      alt="Family Friendly"
                      class="family-icon"
                      title="Klan Przyjazny Rodzinie"
                    />
                  </h4>
                  <span class="clan-card__tag">Tag: {{ clan.tag }}</span>

                  <div
                    v-if="clan.labels && clan.labels.length"
                    class="clan-card__labels"
                  >
                    <img
                      v-for="label in clan.labels"
                      :key="label.id"
                      :src="label.iconUrls?.small"
                      :alt="label.name"
                      :title="label.name"
                      class="label-icon"
                    />
                  </div>

                  <div class="clan-card__leagues">
                    <div class="league-item">
                      <span class="league-item__label">CWL</span>
                      <div class="league-item__value">
                        <img
                          v-if="getLeagueIcon(clan.warLeague)"
                          :src="getLeagueIcon(clan.warLeague)"
                          :alt="clan.warLeague"
                          class="league-icon-img"
                        />
                        <span v-else class="league-icon-emoji">⚔️</span>
                        <span class="league-name">{{ clan.warLeague }}</span>
                      </div>
                    </div>

                    <div class="league-item">
                      <span class="league-item__label">CCL</span>
                      <div class="league-item__value">
                        <img
                          v-if="getLeagueIcon(clan.capitalLeague)"
                          :src="getLeagueIcon(clan.capitalLeague)"
                          :alt="clan.capitalLeague"
                          class="league-icon-img"
                        />
                        <span v-else class="league-icon-emoji">⚔️</span>
                        <span class="league-name">{{
                          clan.capitalLeague
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="clan-card__stats">
                    <span
                      v-if="clan.clanTrophies"
                      class="stat-item"
                      title="Trofea wioski głównej"
                    >
                      <img
                        src="/img/icons/Trophy.webp"
                        alt="Trophy"
                        class="stat-icon"
                      />
                      {{ clan.clanTrophies }}
                    </span>
                    <span
                      v-if="clan.builderBaseTrophies"
                      class="stat-item"
                      title="Trofea bazy budowniczego"
                    >
                      <img
                        src="/img/icons/TrophyB.webp"
                        alt="BB Trophy"
                        class="stat-icon"
                      />
                      {{ clan.builderBaseTrophies }}
                    </span>
                    <span
                      v-if="clan.capitalTrophies"
                      class="stat-item"
                      title="Punkty stolicy klanu"
                    >
                      <img
                        src="/img/icons/TrophyC.webp"
                        alt="Capital Points"
                        class="stat-icon"
                      />
                      {{ clan.capitalTrophies }}
                    </span>
                    <span
                      v-if="clan.clanLevel"
                      class="stat-item"
                      title="Poziom klanu"
                    >
                      ⭐ {{ clan.clanLevel }}
                    </span>
                    <span
                      v-if="clan.members"
                      class="stat-item"
                      title="Członkowie"
                    >
                      👥 {{ clan.members }}/50
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
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

            <Transition name="fade" mode="out-in">
              <div v-if="clan.isLoading" class="clan-card__loader" key="loader">
                <span class="spinner"></span>
                <span>Ładowanie danych...</span>
              </div>

              <div v-else class="clan-card__main" key="content">
                <div class="clan-card__left-col">
                  <div class="clan-card__icon-wrapper">
                    <img
                      v-if="clan.badgeUrl"
                      :src="clan.badgeUrl"
                      :alt="clan.name"
                      class="clan-card__crest-img"
                    />
                    <span v-else class="clan-card__fallback-emoji">🛡️</span>
                  </div>

                  <div v-if="clan.warFrequency" class="clan-card__war-stats">
                    <div class="war-item">
                      <span class="war-item__label">Częstość</span>
                      <span class="war-item__value frequency">{{
                        translateFrequency(clan.warFrequency)
                      }}</span>
                    </div>

                    <div v-if="clan.warWinStreak !== null" class="war-item">
                      <span class="war-item__label">Seria CW</span>
                      <span class="war-item__value streak"
                        >🔥 {{ clan.warWinStreak }}</span
                      >
                    </div>

                    <div class="war-item">
                      <span class="war-item__label">Bilans W/D/L</span>
                      <div class="war-item__value record">
                        <span class="w" title="Wygrane">{{
                          clan.warWins || 0
                        }}</span>
                        <span class="sep">/</span>
                        <span class="d" title="Remisy">{{
                          clan.warDraws || 0
                        }}</span>
                        <span class="sep">/</span>
                        <span class="l" title="Przegrane">{{
                          clan.warLosses || 0
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="clan-card__info">
                  <h4 class="clan-card__name">
                    {{ clan.name }}
                    <img
                      v-if="clan.isFamilyFriendly"
                      src="/img/icons/family.png"
                      alt="Family Friendly"
                      class="family-icon"
                      title="Klan Przyjazny Rodzinie"
                    />
                  </h4>
                  <span class="clan-card__tag">Tag: {{ clan.tag }}</span>

                  <div
                    v-if="clan.labels && clan.labels.length"
                    class="clan-card__labels"
                  >
                    <img
                      v-for="label in clan.labels"
                      :key="label.id"
                      :src="label.iconUrls?.small"
                      :alt="label.name"
                      :title="label.name"
                      class="label-icon"
                    />
                  </div>

                  <div class="clan-card__leagues">
                    <div class="league-item">
                      <span class="league-item__label">CWL</span>
                      <div class="league-item__value">
                        <img
                          v-if="getLeagueIcon(clan.warLeague)"
                          :src="getLeagueIcon(clan.warLeague)"
                          :alt="clan.warLeague"
                          class="league-icon-img"
                        />
                        <span v-else class="league-icon-emoji">⚔️</span>
                        <span class="league-name">{{ clan.warLeague }}</span>
                      </div>
                    </div>

                    <div class="league-item">
                      <span class="league-item__label">CCL</span>
                      <div class="league-item__value">
                        <img
                          v-if="getLeagueIcon(clan.capitalLeague)"
                          :src="getLeagueIcon(clan.capitalLeague)"
                          :alt="clan.capitalLeague"
                          class="league-icon-img"
                        />
                        <span v-else class="league-icon-emoji">⚔️</span>
                        <span class="league-name">{{
                          clan.capitalLeague
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="clan-card__stats">
                    <span
                      v-if="clan.clanTrophies"
                      class="stat-item"
                      title="Trofea Wioski Głównej"
                    >
                      <img
                        src="/img/icons/Trophy.webp"
                        alt="Trophy"
                        class="stat-icon"
                      />
                      {{ clan.clanTrophies }}
                    </span>
                    <span
                      v-if="clan.builderBaseTrophies"
                      class="stat-item"
                      title="Trofea Bazy Budowniczego"
                    >
                      <img
                        src="/img/icons/TrophyB.webp"
                        alt="BB Trophy"
                        class="stat-icon"
                      />
                      {{ clan.builderBaseTrophies }}
                    </span>
                    <span
                      v-if="clan.capitalTrophies"
                      class="stat-item"
                      title="Trofea Stolicy Klanu"
                    >
                      <img
                        src="/img/icons/TrophyC.webp"
                        alt="Capital Points"
                        class="stat-icon"
                      />
                      {{ clan.capitalTrophies }}
                    </span>
                    <span
                      v-if="clan.clanLevel"
                      class="stat-item"
                      title="Poziom Klanu"
                    >
                      ⭐ {{ clan.clanLevel }}
                    </span>
                    <span
                      v-if="clan.members"
                      class="stat-item"
                      title="Członkowie"
                    >
                      👥 {{ clan.members }}/50
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
    width: fit-content;
    margin-left: auto;
    margin-right: 0;
    text-align: right;
    opacity: 0;
    transform: translateX(80px);
    will-change: transform, opacity;
    transition:
      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.9s ease;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      right: 0;
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
        width: 100%;
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
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
      transform: translateX(-60px);
      transition:
        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.9s ease;
      transition-delay: calc(var(--cardIdx) * 0.15s);
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
      transform: translateX(60px);
      transition:
        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.9s ease;
      transition-delay: calc(var(--cardIdx) * 0.15s);
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
  min-height: 240px;
  display: flex;
  flex-direction: column;

  &--alliance {
    border-color: $redColor;
    .clan-card__badge {
      background-color: $redColor;
    }
    .clan-card__tag {
      color: $redColor;
    }
  }

  &__loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-grow: 1;
    height: 150px;
    color: #b0a8a0;
    font-family: $headerFont;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: $primaryColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
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
    z-index: 2;
  }

  &__main {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 10px;
    width: 100%;
  }

  &__left-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    width: 105px;
  }

  &__icon-wrapper {
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__crest-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
  }

  &__fallback-emoji {
    font-size: 2.8rem;
  }

  &__war-stats {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    background: rgba(0, 0, 0, 0.25);
    padding: 8px 6px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-sizing: border-box;

    .war-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 5px;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      &__label {
        font-size: 0.55rem;
        color: #8a8279;
        text-transform: uppercase;
        font-family: $headerFont;
        letter-spacing: 0.5px;
        font-weight: bold;
        text-align: center;
      }

      &__value {
        font-size: 0.75rem;
        color: #dfd8d0;
        font-weight: bold;
        text-align: center;

        &.frequency {
          font-size: 0.7rem;
          color: #e6e2de;
        }

        &.streak {
          color: #ff9f43;
          font-size: 0.75rem;
        }

        &.record {
          font-family: monospace;
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.7rem;
          letter-spacing: -0.3px;

          .w {
            color: #2ecc71;
          }
          .d {
            color: #f1c40f;
          }
          .l {
            color: #e74c3c;
          }
          .sep {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__name {
    margin: 0;
    font-family: $headerFont;
    font-size: 1.4rem;
    color: $fontColor;
    line-height: 1.2;
    display: flex;
    align-items: center;
    gap: 8px;

    .family-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }

  &__tag {
    font-size: 0.85rem;
    color: $primaryColor;
    font-family: monospace;
    letter-spacing: 0.5px;
  }

  &__labels {
    display: flex;
    gap: 4px;
    margin-top: 2px;

    .label-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      padding: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
  }

  &__leagues {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 6px;
    background: rgba(0, 0, 0, 0.15);
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.03);

    .league-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      &__label {
        font-size: 0.65rem;
        color: #8a8279;
        text-transform: uppercase;
        font-family: $headerFont;
        letter-spacing: 1px;
        font-weight: bold;
      }

      &__value {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: #dfd8d0;
        font-weight: 500;

        .league-icon-img {
          width: 16px;
          height: 16px;
          object-fit: contain;
          image-rendering: -webkit-optimize-contrast;
        }

        .league-icon-emoji {
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .league-name {
          font-style: italic;
        }
      }
    }
  }

  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
    font-size: 0.8rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 6px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #b0a8a0;
      font-weight: 500;
      background: rgba(0, 0, 0, 0.2);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      white-space: nowrap;

      .stat-icon {
        width: 14px;
        height: 14px;
        object-fit: contain;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 992px) {
  .family-section {
    padding: 80px 0;
    &::before {
      clip-path: polygon(0 0, 100% 20px, 100% 100%, 0 #{"calc(100% - 20px)"});
    }
    &__main-title {
      font-size: 2.2rem;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      transform: translateY(30px);
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
