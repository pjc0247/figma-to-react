const ComponentName = {
  'Text': 'Text',       // 실제 프로젝트에서 사용할 컴포넌트 이름으로 대체합니다.
  'Image': 'Image',     // 예) MuiTypography, MuiImage 등
};
const AssetBasePath = '@/assets/';

// 피그마 값이 컴포넌트 prop으로 매칭되는 방법을 정의합니다.
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
  } else {
    const size = figma.absoluteRenderBounds;

    return {
      width: Math.floor(size.width),
      height: Math.floor(size.height),
    };
  }
};


// 여기부터는 특별한 일이 없으면 수정하지 않아도 됩니다.
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

const download = async (name, buffer) => {
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: name + '.svg',
  });
  const writable = await fileHandle.createWritable();
  await writable.write(buffer);
  await writable.close();

  return fileHandle.name;
};

const copySelection = async () => {
  const selection = figma.currentPage.selection[0];
  if (!selection) return;

  if (selection.type === 'TEXT') {
    const text = selection.characters.replace('\n', `{'\\n'}`);

    const output = `<${ComponentName.Text} ${propsToString(figmaToProps(selection))}>${text}</${ComponentName.Text}>`;
    navigator.clipboard.writeText(output);
  } else {
    const buffer = await selection.exportAsync({ format: 'SVG' });
    const name = await download(selection.name, buffer);
    
    const output = `<${ComponentName.Image} source={require('${AssetBasePath}${name}')} ${propsToString(figmaToProps(selection))} />`;
    navigator.clipboard.writeText(output);
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'c' && e.ctrlKey) {
    copySelection();
  }
});

console.log('[Figma2React]');
