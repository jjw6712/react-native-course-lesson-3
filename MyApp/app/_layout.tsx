// ─────────────────────────────────────────────
// [1] react-navigation ThemeProvider 관련 import 제거
// ─────────────────────────────────────────────
// [변경 전] import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
//   - 역할: react-navigation의 테마 시스템 사용
//   - 동작: ThemeProvider로 네비게이션 전체에 테마 일괄 적용
//   - 문제점: react-navigation 의존성 필요, 커스텀 색상 적용 어려움
// [변경 후] import 제거
//   - 역할: ThemeProvider 없이 직접 테마 관리
//   - 변경 이유: 불필요한 의존성 제거, 커스텀 색상 직접 활용
//import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// ─────────────────────────────────────────────
// [2] Appearance API import 추가
// ─────────────────────────────────────────────
// [변경 전] import 없음 (또는 useColorScheme hook 사용)
//   - 역할: 커스텀 hook으로 테마 감지
//   - 문제점: 불필요한 커스텀 hook 의존성
// [변경 후] import { Appearance } from 'react-native';
//   - 역할: React Native의 Appearance API로 시스템 테마 직접 감지
//   - 동작: getColorScheme()으로 'dark' 또는 'light' 반환
//   - 변경 이유: 더 직접적이고 간단한 방식, 의존성 최소화
import { Appearance } from 'react-native';

import { Colors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // ─────────────────────────────────────────────
  // [3] 테마 감지 방식 변경
  // ─────────────────────────────────────────────
  // [변경 전] const colorScheme = useColorScheme();
  //   - 역할: 커스텀 hook으로 시스템 테마 감지
  //   - 동작: @/hooks/useColorScheme 사용
  //   - 문제점: 불필요한 커스텀 hook 의존성
  // [변경 후] const colorScheme = Appearance.getColorScheme();
  //   - 역할: Appearance API로 직접 시스템 테마 감지
  //   - 동작: 'dark' 또는 'light' 문자열 반환
  //   - 변경 이유: 커스텀 hook 의존성 제거, 코드 간소화
  const colorScheme = Appearance.getColorScheme();
  
  // ─────────────────────────────────────────────
  // [4] 테마 객체 선택 로직 추가
  // ─────────────────────────────────────────────
  // [변경 전] 이 라인 없음 (조건문으로 직접 색상 지정)
  // [변경 후] const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  //   - 역할: 현재 테마에 맞는 Colors 객체 선택
  //   - 동작: colorScheme에 따라 Colors.dark 또는 Colors.light 할당
  //   - 변경 이유: Colors.ts의 headerBackground 활용, 코드 재사용성 향상
  //   - @Colors.ts 영향: 
  //     - Colors.ts의 headerBackground 속성 사용 가능
  //     - light: headerBackground='rgb(242,242,242)'
  //     - dark: headerBackground='rgb(1,1,1)'
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // ─────────────────────────────────────────────
  // [5] ThemeProvider 제거 및 직접 screenOptions 적용
  // ─────────────────────────────────────────────
  // [변경 전] <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //             <Stack>...</Stack>
  //           </ThemeProvider>
  //   - 역할: react-navigation ThemeProvider로 테마 적용
  //   - 동작: 네비게이션 전체에 DarkTheme/DefaultTheme 일괄 적용
  //   - 문제점: react-navigation 의존성, 커스텀 색상 어려움
  // [변경 후] <Stack screenOptions={{ headerStyle: { backgroundColor: theme.headerBackground }, ... }}>
  //   - 역할: Stack에 직접 테마 스타일 적용
  //   - 동작: theme 객체에서 headerBackground, text 직접 추출하여 적용
  //   - 변경 이유:
  //     1) react-navigation ThemeProvider 의존성 제거
  //     2) Colors.ts의 커스텀 headerBackground 직접 활용
  //     3) 화면별 스타일 커스터마이징 용이
  //   - @Colors.ts 영향:
  //     - theme.headerBackground로 헤더 배경색 적용
  //     - light: rgb(242,242,242), dark: rgb(1,1,1)
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBackground }, // [5-1] 헤더 배경색: Colors.ts의 headerBackground 사용
        headerTintColor: theme.text, // [5-2] 헤더 텍스트 색상: Colors.ts의 text 사용
        headerShadowVisible: false // [5-3] 헤더 그림자 제거
      }}
    >
      {/* ─────────────────────────────────────────────
          [6] index 화면 설정
          ───────────────────────────────────────────── */}
      {/* [변경 전] <Stack.Screen name="index" />
            - 역할: 기본 index 화면 설정
            - 동작: 기본 헤더 표시 설정 미지정
            - 문제점: 헤더 표시 여부 명시적이지 않음 */}
      {/* [변경 후] options={{ headerShown: false, title: 'Home' }}
            - 역할: index 화면은 홈 화면으로 헤더 숨김
            - 동작: headerShown: false로 헤더 완전히 제거
            - 변경 이유: 홈 화면은 커스텀 헤더 또는 별도 UI 사용 */}
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
      
      {/* ─────────────────────────────────────────────
          [7] menu 화면 설정
          ───────────────────────────────────────────── */}
      {/* [변경 전] <Stack.Screen name="menu" />
            - 역할: 기본 menu 화면 설정
            - 동작: 기본 헤더만 표시, 제목 미지정
            - 문제점: 헤더 제목이 'menu'로 표시되어 사용자 친화적이지 않음 */}
      {/* [변경 후] options={{ headerShown: true, title: 'Menu', headerTitle: 'Coffee Shop Menu' }}
            - 역할: menu 화면에 명시적 헤더 설정
            - 동작: headerShown: true로 헤더 표시, headerTitle로 화면 제목 지정
            - 변경 이유: 'Coffee Shop Menu'로 명확한 제목 표시, 사용자 경험 향상
            - @Colors.ts 영향: screenOptions의 headerStyle이 이 화면에 자동 적용 (theme.headerBackground 반영) */}
      <Stack.Screen name="menu" options={{ headerShown: true, title: 'Menu', headerTitle: 'Coffee Shop Menu' }} />
      
      {/* ─────────────────────────────────────────────
          [8] contact 화면 설정
          ───────────────────────────────────────────── */}
      {/* [변경 전] <Stack.Screen name="contact" />
            - 역할: 기본 contact 화면 설정
            - 동작: 기본 헤더만 표시, 제목 미지정
            - 문제점: 헤더 제목이 'contact'로 표시되어 사용자 친화적이지 않음 */}
      {/* [변경 후] options={{ headerShown: true, title: 'Contact', headerTitle: 'Contact Us' }}
            - 역할: contact 화면에 명시적 헤더 설정
            - 동작: headerShown: true로 헤더 표시, headerTitle로 화면 제목 지정
            - 변경 이유: 'Contact Us'로 명확한 제목 표시, 사용자 경험 향상
            - @Colors.ts 영향: screenOptions의 headerStyle이 이 화면에 자동 적용 (theme.headerBackground 반영) */}
      <Stack.Screen name="contact" options={{ headerShown: true, title: 'Contact', headerTitle: 'Contact Us' }} />
      
      {/* ─────────────────────────────────────────────
          [9] +not-found (404) 화면 설정
          ───────────────────────────────────────────── */}
      {/* [변경 전] <Stack.Screen name="+not-found" />
            - 역할: 기본 404 화면 설정
            - 동작: 기본 헤더 표시 설정 미지정
            - 문제점: 헤더 표시 여부 명시적이지 않음 */}
      {/* [변경 후] options={{ headerShown: false }}
            - 역할: 404 에러 화면은 헤더 숨김
            - 동작: headerShown: false로 헤더 완전히 제거
            - 변경 이유: 에러 화면은 전체 화면 커스텀 UI 사용, 기본 헤더 불필요 */}
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

/* 
════════════════════════════════════════════════════════════════════════════════
【_layout.tsx 변경 요약】
════════════════════════════════════════════════════════════════════════════════

┌─ 변경 순서 ────────────────────────────────────────────────────────────────┐
│ [1] react-navigation ThemeProvider 관련 import 제거                         │
│ [2] Appearance API import 추가                                              │
│ [3] 테마 감지 방식 변경: useColorScheme() → Appearance.getColorScheme()    │
│ [4] 테마 객체 선택 로직 추가: const theme = ...                             │
│ [5] ThemeProvider 제거 및 Stack에 직접 screenOptions 적용                  │
│ [6] index 화면 설정: headerShown: false, title: 'Home' 추가                │
│ [7] menu 화면 설정: headerTitle: 'Coffee Shop Menu' 추가                   │
│ [8] contact 화면 설정: headerTitle: 'Contact Us' 추가                       │
│ [9] +not-found 화면 설정: headerShown: false 명시                          │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ @Colors.ts와의 연관성 ────────────────────────────────────────────────────┐
│ • Colors.ts의 headerBackground 속성 활용                                    │
│ • theme.headerBackground로 헤더 배경색 직접 지정                            │
│ • menu, contact 화면에 headerStyle 자동 적용 (light/dark 테마별 색상)       │
│ • light/dark 모드별 자동 색상 전환                                           │
│ • 조건문 없이 theme 객체로 일관된 스타일 관리                                 │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ 주요 개선 사항 ───────────────────────────────────────────────────────────┐
│ • react-navigation ThemeProvider 의존성 제거 → 더 가벼운 구조               │
│ • Colors.ts 커스텀 색상 직접 활용 → 디자인 유연성 증가                       │
│ • 테마별 헤더 배경색 명확히 구분 → UI 가독성 향상                            │
│ • 화면별 헤더 설정 명시적 관리 → 유지보수성 향상                             │
│ • 사용자 친화적 헤더 제목 ('Coffee Shop Menu', 'Contact Us')               │
│ • 코드 재사용성 및 유지보수성 향상                                           │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ 각 화면별 헤더 설정 요약 ─────────────────────────────────────────────────┐
│ • index (홈): 헤더 숨김 - 커스텀 UI 사용                                     │
│ • menu: 헤더 표시 - 'Coffee Shop Menu' 제목, theme 색상 적용                │
│ • contact: 헤더 표시 - 'Contact Us' 제목, theme 색상 적용                   │
│ • +not-found: 헤더 숨김 - 에러 화면 전체 커스텀 UI                           │
└──────────────────────────────────────────────────────────────────────────────┘
*/
