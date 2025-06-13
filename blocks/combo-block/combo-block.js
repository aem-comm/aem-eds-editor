import { loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  block.innerHTML = `
    <div class="combo-block">

      <div class="hero-block"></div>

      <div class="text-block">
        <p>This is a combined block that showcases multiple core blocks inside one.</p>
      </div>

      <div class="button-block">
        <p><a class="button primary" href="/next">Continue</a></p>
      </div>

    </div>
  `;

  await loadBlock(block.querySelector('.hero-block'), 'hero');
  await loadBlock(block.querySelector('.text-block'), 'text');
  await loadBlock(block.querySelector('.button-block'), 'button');
}