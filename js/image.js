# js文件
<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { createImageElement } from "../../utils";
 
  export let size = 50;
 
  let image;
  let imgSrc;
  let inputDom;
  let container;
 
  onMount(() => {
    container.style.setProperty("--trigger-size", size + "px");
  });
 
  const dispatch = createEventDispatcher();
 
  const pickHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      imgSrc = reader.result;
      const img = createImageElement(reader.result);
      await tick();
      dispatch("picked", {
        preview: image,
        src: reader.result,
        img,
        file,
        event,
      });
    };
    reader.readAsDataURL(file);
  };
 
  const triggerClick = () => {
    inputDom.click();
  };
</script>
 
<div bind:this={container} class="image-picker_container">
  <div on:click|stopPropagation={triggerClick} class="image-picker_trigger">
    {#if imgSrc}
      <img
        bind:this={image}
        src={imgSrc}
        alt="Error"
        class="image-picker_preview"
      />
    {:else}
      <div class="image-picker_cross" />
    {/if}
 
    <input
      bind:this={inputDom}
      type="file"
      on:change={pickHandler}
      class="image-picker_input-hidden"
    />
  </div>
</div>
 
<style>
  .image-picker_container {
    --trigger-padding: 4px;
    --trigger-border: 1px;
    --cross-size: calc(var(--trigger-size) * 0.6);
  }
  .image-picker_preview {
    width: var(--trigger-size);
    height: var(--trigger-size);
    object-fit: contain;
  }
  .image-picker_input-hidden {
    display: none;
  }
  .image-picker_trigger {
    border: var(--trigger-border) dashed;
    padding: var(--trigger-padding);
    height: var(--trigger-size);
    width: var(--trigger-size);
    position: relative;
  }
  .image-picker_cross::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: var(--cross-size);
    border: calc((var(--trigger-size) * 0.2) / 2) solid #ccc;
  }
  .image-picker_cross::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: var(--cross-size);
    border: calc((var(--trigger-size) * 0.2) / 2) solid #ccc;
  }
</style>
 
