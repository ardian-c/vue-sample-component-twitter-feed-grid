<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.cp__wrapper {
  width: 250px;
  margin: 0;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 4px 8px rgba(0, 0, 0, .3);
          box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 4px 8px rgba(0, 0, 0, .3);
  font-family: Menlo, 'Microsoft Yahei', sans-serif;
  -webkit-user-select: none;
    -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.cp__v-ctrl {
  position: relative;
}

.cp__thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  border-radius: 50%;
  margin-top: -1px;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  background-color: #f8f8f8;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .368627);
          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .368627);
  cursor: default;
}

.cp__saturation {
  position: relative;
  width: 100%;
  padding-bottom: 55%;
  border-radius: 2px 2px 0 0;
  overflow: hidden
}

.cp__saturation > div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}

.cp__saturation > .msk-white {
  background: -webkit-gradient(linear, left top, right top, from(#fff), to(hsla(0, 0%, 100%, 0)));
  background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}

.cp__saturation > .msk-black {
  background: -webkit-gradient(linear, left bottom, left top, from(#000), to(transparent));
  background: linear-gradient(0deg, #000, transparent);
}

.cp__saturation > .cp__thumb {
  background-color: transparent;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4);
          box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4);
}

.cp__ctrl-pane {
  position: relative;
  width: 100%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 16px 16px 12px
}

.cp__ctrl-pane > div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.cp__tracks {
  -webkit-box-flex: 1;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
}

.cp__ctrl-bar {
  height: 10px;
}

.cp__ctrl-hue {
  background: -webkit-gradient(linear, right top, left top, from(red), color-stop(17%, #ff0), color-stop(33%, #0f0), color-stop(50%, #0ff), color-stop(67%, #00f), color-stop(83%, #f0f), to(red));
  background: linear-gradient(-90deg, red, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
}

.cp__ctrl-alpha {
  margin-top: 8px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) left center;
}

.cp__preview {
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 5px;
  overflow: hidden;
  border-radius: 50%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center
}

.cp__preview > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid transparent;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

.cp__fm-fields {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1
}

.cp__fm-fields > div {
  padding-left: 6px;
  -webkit-box-flex: 1;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
}

.cp__fm-fields input {
  width: 100%;
  height: 22px;
  font-size: 11px;
  text-align: center;
  color: rgb(51, 51, 51);
  border-radius: 2px;
  border: none;
  -webkit-box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset;
          box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset;
  -webkit-transition: -webkit-box-shadow 0.2s ease;
  transition: -webkit-box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease, -webkit-box-shadow 0.2s ease;
  -moz-appearance: textfield;
}

.cp__fm-fields input:focus {
  outline: 0;
  -webkit-box-shadow: rgb(0, 125, 255) 0px 0px 0px 1px inset;
          box-shadow: rgb(0, 125, 255) 0px 0px 0px 1px inset;
}

.cp__fm-fields input::-webkit-inner-spin-button,
    .cp__fm-fields input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

.cp__fm-fields span {
  display: block;
  margin-top: 12px;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: rgb(150, 150, 150);
  text-align: center;
}

/* color format switcher */
.cp__fm-switcher {
  position: relative;
  width: 32px;
  text-align: right
}
.cp__fm-switcher > div {
  position: relative;
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
}
.cp__fm-switcher > div > svg {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid transparent;
}
.cp__fm-switcher > div > svg:hover {
  border-color: rgb(238, 238, 238);
  background: rgb(238, 238, 238);
}

</style>
