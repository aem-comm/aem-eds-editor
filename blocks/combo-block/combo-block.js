export default async function decorate(block) {
  const {
    headline,
    subtext,
    bodyText,
    buttonLabel,
    buttonLink
  } = block.dataset;

  block.innerHTML = `
    <div class="combo-block">

      <div class="hero-block">
        <h1>${headline || 'Default Hero Heading'}</h1>
        ${subtext ? `<p>${subtext}</p>` : ''}
      </div>

      <div class="text-block">
        <p>${bodyText || 'Default text content goes here.'}</p>
      </div>

      <div class="button-block">
        <p><a class="button primary" href="${buttonLink || '#'}">${buttonLabel || 'Click Here'}</a></p>
      </div>

    </div>
  `;

  await loadBlock(block.querySelector('.hero-block'), 'hero');
  await loadBlock(block.querySelector('.text-block'), 'text');
  await loadBlock(block.querySelector('.button-block'), 'button');
}
