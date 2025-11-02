import espresso from "@/assets/images/menu/espresso.png" //[20] 메뉴 이미지 import (ID-인덱스 매핑용 배열 구성)
import americano from "@/assets/images/menu/americano.png" // index 1 → id 2
import latte from "@/assets/images/menu/latte.png" // index 2 → id 3
import cappuccino from "@/assets/images/menu/cappuccino.png" // index 3 → id 4
import macchiato from "@/assets/images/menu/macchiato.png" // index 4 → id 5
import mocha from "@/assets/images/menu/mocha.png" // index 5 → id 6
import flatwhite from "@/assets/images/menu/flatwhite.png" // index 6 → id 7
import cortado from "@/assets/images/menu/cortado.png" // index 7 → id 8
import coldbrew from "@/assets/images/menu/coldbrew.png" // index 8 → id 9
import affogato from "@/assets/images/menu/affogato.png" // index 9 → id 10

export default [ // 배열로 export (접근: MENU_IMAGES[item.id - 1])
    espresso,    // index 0 → id 1
    americano,   // index 1 → id 2
    latte,       // index 2 → id 3
    cappuccino,  // index 3 → id 4
    macchiato,   // index 4 → id 5
    mocha,       // index 5 → id 6
    flatwhite,   // index 6 → id 7
    cortado,     // index 7 → id 8
    coldbrew,    // index 8 → id 9
    affogato     // index 9 → id 10
]