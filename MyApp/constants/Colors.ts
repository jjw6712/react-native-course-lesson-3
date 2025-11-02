/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = 'orange';
const tintColorDark = '#fff';

export const Colors = {
  // ─────────────────────────────────────────────
  // [1] light 테마에 headerBackground 속성 추가
  // ─────────────────────────────────────────────
  // [변경 전] light: { text, background, tint, icon, tabIconDefault, tabIconSelected }
  //   - 역할: light 모드 색상 정의
  //   - 동작: headerBackground 속성 없음
  //   - 문제점: 헤더 배경색을 본문 배경색과 구분할 수 없음
  // [변경 후] headerBackground: 'rgb(242, 242, 242)' 추가
  //   - 역할: 헤더 전용 배경색 정의
  //   - 동작: 본문 배경(#fff)보다 살짝 어두운 회색으로 시각적 구분
  //   - 변경 이유: 헤더와 본문을 시각적으로 구분하여 UI 계층 명확화
  //   - @_layout.tsx 영향: theme.headerBackground로 헤더 배경색 직접 적용 가능
  light: {
    text: '#11181C',
    background: '#fff',
    headerBackground: 'rgb(242, 242, 242)', // [1] 헤더 전용 배경색: 본문(#fff)과 구분되는 밝은 회색
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#c68e17',
    tabIconSelected: tintColorLight,
  },
  
  // ─────────────────────────────────────────────
  // [2] dark 테마에 headerBackground 속성 추가
  // ─────────────────────────────────────────────
  // [변경 전] dark: { text, background, tint, icon, tabIconDefault, tabIconSelected }
  //   - 역할: dark 모드 색상 정의
  //   - 동작: headerBackground 속성 없음
  //   - 문제점: 헤더 배경색을 본문 배경색과 구분할 수 없음
  // [변경 후] headerBackground: 'rgb(1, 1, 1)' 추가
  //   - 역할: 헤더 전용 배경색 정의
  //   - 동작: 본문 배경(#151718)보다 더 어두운 회색으로 시각적 구분
  //   - 변경 이유: 다크모드에서도 헤더와 본문을 미묘하게 구분하여 UI 계층 명확화
  //   - @_layout.tsx 영향: theme.headerBackground로 헤더 배경색 직접 적용 가능
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    headerBackground: 'rgb(1, 1, 1)', // [2] 헤더 전용 배경색: 본문(#151718)보다 더 어두운 회색
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/* 
════════════════════════════════════════════════════════════════════════════════
【Colors.ts 변경 요약】
════════════════════════════════════════════════════════════════════════════════

┌─ 변경 내용 ────────────────────────────────────────────────────────────────┐
│ [1] light 테마: headerBackground 속성 추가 ('rgb(242, 242, 242)')          │
│ [2] dark 테마: headerBackground 속성 추가 ('rgb(1, 1, 1)')                 │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ _layout.tsx에 미치는 영향 ────────────────────────────────────────────────┐
│ • theme.headerBackground 속성 사용 가능                                      │
│ • Stack의 headerStyle에서 직접 참조하여 테마별 헤더 배경색 자동 적용          │
│ • light/dark 모드 전환 시 헤더 배경색 자동 변경                              │
└──────────────────────────────────────────────────────────────────────────────┘
*/
