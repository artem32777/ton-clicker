import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

const BASE_LVL_SCORE = 25

const levels = new Array(15).fill(0).map((_, i) => BASE_LVL_SCORE * Math.pow(2, i))

const levelScores = levels.map((_, level) =>
  levels.slice(0, level + 1).reduce((acc, curr) => acc + curr),
)

const computeLevelFromScore = (score) => {
  const index = levelScores.findIndex((levelScore) => score <= levelScore)
  return {
    level: index,
    score: levels[index],
  }
}

export const useScoreStore = defineStore('score', () => {
  const score = ref(0)

  const getScore = computed(() => score.value)

  const getLevel = computed(() => computeLevelFromScore(getScore.value))

  const getCurrentLevelScore = computed(() => {
    const { level } = getLevel.value
    return level === 0 ? getScore.value : getScore.value - levelScores[level - 1]
  })

  function addScore(val) {
    score.value += val
  }

  function setScore(value) {
    score.value = value
  }

  return { getScore, getLevel, getCurrentLevelScore, addScore, setScore }
})
