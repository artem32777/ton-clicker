<script setup>
import { computed, ref } from 'vue'
import ScoreProgress from '@/components/ScoreProgress.vue'
import { useScoreStore } from '@/stores/score.js'

const img = ref()

const store = useScoreStore()


const imgSrc = computed(()=> store.getLevel.level < 1 ? './frog.png' : '/lizzard.png')

function increment(event) {
  store.addScore(1)
  const rect = event.target.getBoundingClientRect()

  const offsetX = event.clientX - rect.left - rect.width / 2
  const offsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offsetY / rect.height) * DEG
  const tiltY = (offsetX / rect.width) * -DEG

  img.value.style.setProperty('--tiltX', `${tiltX}deg`)
  img.value.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    img.value.style.setProperty('--tiltX', `0deg`)
    img.value.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  img.value.parentElement.appendChild(plusOne)

  setTimeout(() => plusOne.remove(), 2000)
}
</script>

<template>
  <div class="game-container">
    <ScoreProgress />
    <div class="header">
      dsds
      <img
        src="/coin.png"
        alt="coin" />
      <h2
        class="score"
        id="score">
        {{ store.getScore }}
      </h2>
    </div>
    <div class="circle">
      <img
        @click="increment"
        ref="img"
        id="circle"
        :src="imgSrc" />
    </div>
  </div>
</template>
