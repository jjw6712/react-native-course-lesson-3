import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image} from "react-native"; //[11] React Native 컴포넌트 및 API import

import { Colors } from '@/constants/Colors'; //[12] 테마 색상 상수 import
import { MENU_ITEMS } from '@/constants/MenuItems'; //[21] 메뉴 데이터 배열 import
import MENU_IMAGES from '@/constants/MenuImages'; //[22] 메뉴 이미지 배열 import

export default function MenuScreen(){//[13] 메뉴 화면 컴포넌트 정의
    const colorScheme = Appearance.getColorScheme();//[14] 시스템 테마 감지 (light/dark)

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;//[15] 테마 객체 선택

    const styles = createStyles(theme, colorScheme);//[16] 테마별 동적 스타일 생성

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;//[18] 플랫폼별 컨테이너 선택 (웹: ScrollView, 모바일: SafeAreaView)

    const separatorComp = <View style={styles.separator} /> //[35] 항목 구분자 컴포넌트 정의

    //const headerComp = <Text>Top of List</Text> //[45] 리스트 헤더 컴포넌트 정의 -> [50] 리스트 헤더 컴포넌트 적용 주석 처리

    const footerComp = <Text style={{ color: theme.text }}>End of Menu</Text> //[46] 리스트 푸터 컴포넌트 정의 -> [51] 리스트푸터 컴포넌트 "End of Menu" 로 바꿈
    //[84] 리스트 푸터 컴포넌트 스타일 적용 -> [85] 리스트푸터 컴포넌트 색상 테마 적용

    return(
        <Container>
            {/* [23] 메뉴 데이터 배열 연결 */}
            {/* [53] 메뉴 데이터 배열 비움 (테스트용) */}
            {/* [24] 각 항목의 고유 키 생성 (성능 최적화) */}
            {/* [28] 세로 스크롤 indicator 숨김 */}
            {/* [29] 컨텐츠 컨테이너 스타일 적용 */}
            {/* [34] 항목 구분자 컴포넌트 적용 */}
            {/* [42] 리스트 헤더 컴포넌트 적용 -> [49] 리스트 헤더 컴포넌트 적용 주석 처리 */}
            {/* [43] 리스트 푸터 컴포넌트 적용 */}
            {/* [44] 리스트 푸터 컴포넌트 스타일 적용 */}
            {/* [52] 리스트 비어있을 때 컴포넌트 정의 */}
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={separatorComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}
                ListEmptyComponent={<Text>No items</Text>}
                renderItem={({item}) => (
                    <>
                    {/* [54] 메뉴 항목 row 컨테이너 스타일 적용 */}
                    <View style={styles.row}>
                        {/* [55] 메뉴 텍스트 영역 스타일 적용 */}
                        <View style={styles.menuTextRow}>
                            {/* [57] 메뉴 이름(제목) 스타일 적용 */}
                            <Text style={[styles.menuItemTitle, styles.menuItemText]}>
                                {item.title}
                            </Text>
                            {/* [56] 메뉴 설명 텍스트 스타일 적용 */}
                            <Text style={styles.menuItemText}>
                                {item.description}
                            </Text>
                        </View>
                        {/* [25] 이미지 매핑 (ID 1~10 → 인덱스 0~9) */}
                        {/* [58] 메뉴 이미지 스타일 적용 */}
                        <Image
                            source={MENU_IMAGES[item.id - 1]}
                            style={styles.menuImage}
                        />
                    </View>
                    </>
                )}
                />
        </Container>
    )
}

function createStyles(theme, colorScheme){ //[17] 테마별 동적 스타일 생성 함수
    return StyleSheet.create({
        contentContainer: { //[29] 컨텐츠 컨테이너 스타일 정의
            paddingTop: 10, //[30] 상단 패딩
            paddingBottom: 20, //[31] 하단 패딩
            paddingHorizontal: 12, //[32] 좌우 패딩
            backgroundColor: theme.background, //[33] 배경색
        },
        separator: { //[36] 항목 구분자 스타일 정의
            height: 1, //[37] 높이
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : "#000", //[36] 배경색
            width: '50%', //[38] 너비
            maxWidth: 300, //[39] 최대 너비
            marginHorizontal: 'auto', //[40] 가로 마진
            marginBottom: 10, //[41] 하단 마진
        },
        footerComp: { //[47] 리스트 푸터 컴포넌트 스타일 정의
            marginHorizontal: 'auto', //[48] 가로 마진
        },
        row: { //[59] 메뉴 항목 스타일 정의
            flexDirection: 'row', //[60] 행 방향 설정
            width: '100%', //[61] 너비
            maxWidth: 600, //[62] 최대 너비
            height: 100, //[63] 높이
            marginBottom: 10, //[64] 하단 마진
            borderStyle: 'solid', //[65] 테두리 스타일
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000', //[65] 테두리 색상
            borderWidth: 1, //[66] 테두리 두께
            borderRadius: 20, //[67] 테두리 라운드
            overflow: 'hidden', //[68] 오버플로우 숨김
            marginHorizontal: 'auto', //[69] 가로 마진
        },
        menuTextRow: { //[70] 메뉴 텍스트 스타일 정의
            width: '65%', //[71] 너비
            paddingTop: 10, //[72] 상단 패딩
            paddingLeft: 10, //[73] 좌측 패딩
            paddingRight: 5, //[74] 우측 패딩
            flexGrow: 1, //[75] 플렉스 그로우
        },
        menuItemTitle: { //[76] 메뉴 이름 스타일 정의
            fontSize: 18, //[77] 폰트 크기
            textDecorationLine: 'underline', //[78] 밑줄 스타일
        },
        menuItemText: { //[79] 메뉴 텍스트 스타일 정의
            color: theme.text, //[80] 텍스트 색상
        },
        menuImage: { //[81] 메뉴 이미지 스타일 정의
            width: 100, //[82] 너비
            height: 100, //[83] 높이
        },
    });
}