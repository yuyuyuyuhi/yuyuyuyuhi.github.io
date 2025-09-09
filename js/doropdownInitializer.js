const stages = [
    { name: "ユノハナ大渓谷", path: "1_yunohana.jpg" },
    { name: "ゴンズイ地区", path: "2_gonzui.jpg" },
    { name: "キンメダイ美術館", path: "3_kinme.jpg" },
    { name: "マテガイ放水路", path: "4_mategai.jpg" },
    { name: "ナメロウ金属", path: "5_namerou.jpg" },
    { name: "ヤガラ市場", path: "6_yagara.jpg" },
    { name: "マサバ海峡大橋", path: "7_masaba.png" },
    { name: "マヒマヒリゾート&スパ", path: "8_mahimahi.jpg" },
    { name: "海女美術大学", path: "9_amabi.jpg" },
    { name: "チョウザメ造船", path: "10_chouzame.png" },
    { name: "ザトウマーケット", path: "11_zatou.jpg" },
    { name: "スメーシーワールド", path: "12_sumeshi.jpg" },
    { name: "クサヤ温泉", path: "13_kusaya.jpg" },
    { name: "ヒラメが丘団地", path: "14_hirame.jpg" },
    { name: "ナンプラー遺跡", path: "15_nanpura.jpg" },
    { name: "マンタマリア号", path: "16_manta.jpg" },
    { name: "タラポートショッピングパーク", path: "17_tarapo.jpg" },
    { name: "コンブトラック", path: "18_konbu.jpg" },
    { name: "タカアシ経済特区", path: "19_takaashi.png" },
    { name: "オヒョウ海運", path: "20_ohyou.png" },
    { name: "バイガイ亭", path: "21_baigai.png" },
    { name: "ネギトロ炭鉱", path: "22_negitoro.png" },
    { name: "カジキ空港", path: "23_kajiki.png" },
    { name: "リュウグウターミナル", path: "24_ryugu.png" },
    { name: "デカライン高架下", path: "25_dekaline.jpg" },
];

const rules = [
    { name: "ガチエリア", path: "area.png" },
    { name: "ガチヤグラ", path: "yagura.png" },
    { name: "ガチホコ", path: "hoko.png" },
    { name: "ガチアサリ", path: "asari.png" },
    { name: "ナワバリバトル", path: "nawabari.png" },
];

function populateDropdown(id, items) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = "";
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.path;
        option.textContent = item.name;
        dropdown.appendChild(option);
    });
}

window.onload = () => {
    populateDropdown("stage1", stages);
    populateDropdown("stage2", stages);
    populateDropdown("rule", rules);
};
