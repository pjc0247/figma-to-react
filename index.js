const ComponentName = {
  'Text': 'Text',       // 실제 프로젝트에서 사용할 컴포넌트 이름으로 대체합니다.
  'Image': 'Image',     // 예) MuiTypography, MuiImage 등
};
const AssetBasePath = '@/assets/';

const figmaToProps = (figma) => {
  if (figma.type === 'TEXT') {
    const size = figma.fontSize;
    const weight = {
      'Bold': 'b',
      'Regular': 'r',
    }[figma.fontName.style] || 'r';
    const align = figma.textAlignHorizontal.toLowerCase();

    return {
      size,
      weight,
      center: align === 'center',
    };
  } else if (figma.type === 'RECTANGLE' || figma.type === 'GROUP') {
    const size = figma.absoluteRenderBounds;

    return {
      width: size.width,
      height: size.height,
    };
  }
};
const propsToString = (props) => {
  return Object
    .entries(props)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => {
      if (typeof value === 'number')
        return `${key}={${value}}`;
      if (typeof value === 'boolean' && value === true)
        return `${key}`;
      return `${key}="${value}"`;
    })
    .join(' ');
};

const download = (name, buffer) => {
  const url = window.URL.createObjectURL(new Blob([buffer]));
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = name + '.svg';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

const copySelection = async () => {
  const selection = figma.currentPage.selection[0];
  if (!selection) return;

  if (selection.type === 'TEXT') {
    const text = selection.characters.replace('\n', `{'\\n'}`);

    const output = `<${ComponentName.Text} ${propsToString(figmaToProps(selection))}>${text}</${ComponentName.Text}>`;
    navigator.clipboard.writeText(output);
  } else if (selection.type === 'RECTANGLE' || selection.type === 'GROUP') {
    const buffer = await selection.exportAsync({ format: 'SVG' });
    download(selection.name, buffer);
    
    const output = `<${ComponentName.Image} source={require('${AssetBasePath}${selection.name}.svg')} ${propsToString(figmaToProps(selection))} />`;
    navigator.clipboard.writeText(output);
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'c' && e.ctrlKey) {
    copySelection();
  }
});
