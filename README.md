# Coffee Shop - React Native 프로젝트

React Native와 Expo를 활용한 모바일 커피샵 애플리케이션입니다.

## 프로젝트 소개

이 프로젝트는 탭 네비게이션에서 스택 네비게이션으로 전환하고, 커피 메뉴 시스템을 FlatList로 구현한 실습 과제입니다. 라이트/다크 모드를 지원하며, 웹과 모바일 환경 모두에서 동작합니다.

## 주요 기능

- **스택 네비게이션**: 홈, 메뉴, 연락처 화면 구성
- **다크모드 지원**: 시스템 테마에 따라 자동 전환
- **메뉴 시스템**: 10가지 커피 메뉴를 카드 형태로 표시
- **반응형 디자인**: 화면 크기에 맞춰 레이아웃 조정
- **크로스 플랫폼**: iOS, Android, Web 지원

## 시작하기

```bash
cd MyApp
npm install
npx expo start
```

웹에서 보려면 `w`, Android는 `a`, iOS는 `i`를 누르세요.

## 구조

```
MyApp/
├── app/
│   ├── _layout.tsx       # 네비게이션 설정
│   ├── index.jsx         # 홈 화면
│   ├── menu.jsx          # 메뉴 리스트
│   └── contact.jsx       # 연락처
├── constants/
│   ├── Colors.ts         # 테마 색상
│   ├── MenuItems.js      # 메뉴 데이터
│   └── MenuImages.js     # 이미지 매핑
└── assets/images/menu/   # 메뉴 이미지들
```

## 주요 변경사항

### 1. 네비게이션 구조 변경
기존의 탭 네비게이션을 제거하고 스택 네비게이션으로 단순화했습니다. 홈 화면에서 메뉴와 연락처로 이동하는 구조로 변경했습니다.

### 2. 테마 시스템
`@react-navigation/native`의 ThemeProvider 대신 React Native의 `Appearance` API를 직접 사용합니다. `Colors.ts`에 헤더 배경색을 추가하여 라이트/다크 모드에서 헤더와 본문을 시각적으로 구분할 수 있도록 했습니다.

### 3. 메뉴 화면 구현
FlatList를 사용하여 커피 메뉴를 효율적으로 렌더링합니다. 각 메뉴 항목은 카드 형태로 표시되며, 이미지와 설명을 포함합니다.

**주요 구현 사항:**
- 데이터와 UI 분리 (MenuItems.js, MenuImages.js)
- 플랫폼별 컨테이너 (웹: ScrollView, 모바일: SafeAreaView)
- 반응형 카드 디자인 (최대 너비 600px)
- 구분선, 푸터 컴포넌트 추가

### 4. 연락처 화면
샘플 화면을 실제 사용 가능한 연락처 화면으로 교체했습니다. 전화 및 문자 링크를 추가하여 바로 연락할 수 있도록 구현했습니다.

## 기술 스택

- React Native 0.76.1
- Expo ~52.0.11
- Expo Router ~4.0.9
- TypeScript

## 문제 해결

**Android에서 "Text strings must be rendered within a <Text> component" 에러**
JSX 태그와 같은 줄에 주석을 쓰면 Android에서 에러가 발생합니다. 주석은 별도 줄로 분리해야 합니다.


## 성능 최적화

- FlatList의 `keyExtractor`로 효율적인 재렌더링
- `showsVerticalScrollIndicator={false}`로 불필요한 UI 요소 제거
- 이미지는 사전에 import하여 빠른 로딩
- StyleSheet.create()로 스타일 최적화

## 참고

- [Expo 문서](https://docs.expo.dev/)
- [React Native 문서](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
