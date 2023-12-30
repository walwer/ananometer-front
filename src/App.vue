<template>
  <div class="shadow">

  </div>
  <main>
    <div class="element">
      <div class="item">
                <span class="title">
                    Wind speed
                </span>
        <div class="icon">
          <img src="@/assets/wind.png">
        </div>

      </div>

      <div class="item">
        <span class="value" v-if="isConnected">{{ speed }}</span>
        <span class="not-connected" v-else="isConnected">OFFLINE</span>
        <span class="unit">m/s</span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      speed: 0.0,
      animationSpeed: 0,
      isConnected: false,
    }
  },
  methods: {
    setAnimationSpeed(val) {
      window.animationSpeed = val;
      this.animationSpeed = val;
    },
    onOpen(e) {
      console.log('opened')
      this.isConnected = true;
    },
    onClose(e) {
      console.log('closed')
      this.isConnected = false;
    },
    onMessage(e) {
      console.log('message', e);
      this.speed = e.data

      let speed = parseFloat(e.data);

      this.setAnimationSpeed(this.lerp(this.animationSpeed, speed * 7, 0.2))
    },
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end
    }
  },
  created() {
    window.animationSpeed = this.animationSpeed;
    console.log('Trying to open a WebSocket connection…');
    let websocket = new WebSocket(`ws://192.168.100.210/ws`);
    websocket.onopen = this.onOpen;
    websocket.onclose = this.onClose;
    websocket.onmessage = this.onMessage;
  }
}

</script>

<style scoped lang="scss">
.shadow {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 38%, rgba(0, 0, 0, 0) 52%);
  padding: 2px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  margin: 20px;

  .element {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 30px 50px rgba(0, 0, 70, 0.03);
    padding: 25px 30px;
    border-radius: 50px;
    max-width: 600px;
    width: 100%;
    margin-bottom: 220px;
    display: flex;
    opacity: 0.95;
    position: relative;
    backdrop-filter: blur(10px);

    @media (max-width: 500px) {
      max-width: 300px;

      .item {
        .icon {
          padding: 5px;

          img {
            height: 20px;
          }
        }

      }
    }

    .item {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        font-size: 20px;
        text-align: center;
      }

      .value {
        font-size: 40px;
        text-align: center;
      }

      .not-connected {
        color: #666;
        font-size: 17px;
      }

      .unit {
        font-size: 18px;
      }

      .icon {
        padding: 20px;

        img {
          width: auto;
          height: 60px;
        }

      }

    }
  }
}
</style>
