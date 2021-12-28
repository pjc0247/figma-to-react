# figma-to-react

figma에서 ctrl+c를 누르면 react코드가 복사됩니다.

* __텍스트__: 자동으로 텍스트 내용이 포함된 컴포넌트가 복사됩니다.

```tsx
<MyText size={16}>Hello Figma!</MyText>
```

* __이미지__: 이미지를 자동으로 `export` 합니다. 저장할 때 지정한 이름이 포함된 컴포넌트가 복사됩니다.

```tsx
<MyImage source={require("@/assets/icon.svg")} width={32} height={32} />
```

설정 방법
----
이 플러그인은 Text와 Image 두종류의 컴포넌트만을 지원합니다.<br/>
실제 프로젝트에서 사용하는 Image와 Text 컴포넌트, 그리고 해당 컴포넌트의 input에 맞게 코드를 수정 할 필요가 있습니다.

https://github.com/pjc0247/figma-to-react/blob/main/figma_ext.js#L1-L30

다운받으신 후에 위 부분을 수정해서 사용해주세요.


설치 방법
----
1. https://github.com/pjc0247/figma-to-react/archive/refs/heads/main.zip
에서 소스를 다운받아 압축을 풉니다.

2. chrome://extensions/ 에서 개발자 모드를 켜고, 압축 풀린 폴더 로드 버튼을 이용해 플러그인을 추가합니다.

3. figma 사이트에 접속하면 자동으로 활성화 됩니다. 이미 열려있는 피그마 창이 있다면 새로고침해주세요.
