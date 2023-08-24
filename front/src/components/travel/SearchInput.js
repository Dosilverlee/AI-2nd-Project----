import React, { useState } from 'react';
import { Form, ListGroup } from "react-bootstrap";
import * as Api from "../../Api";

const SearchInput = ({ onBeachIdSelected, displayToast }) => {
  const beaches = ["추암", "조금나루", "위도", "신두리", "공현1리", "관매도", "배낭기미", "사곡", "연포", "송이도", "외옹치", "손죽", "격포", "몽산포", "옹암", "학동", "도구", "사천진", "신도", "보길중리은모래", "나곡", "홍도", "도직", "연소", "대항", "죽도", "만성리검은모래", "대천", "백사장", "연대", "대진", "백길", "월포", "사근진", "연곡", "맹방", "율포솔밭", "방포", "속초", "방주골", "이호테우", "수기", "임원", "가계", "신지동고", "후정", "봉길대왕암", "대전", "청산신흥", "흥남", "만리포", "우도서빈백사", "모래울", "짱뚱어", "무술목", "염전", "사도", "나정고운모래", "구리동", "등명", "난지섬", "어은돌", "장사", "하트", "화순금모래", "북분리", "안양수문", "덕원", "원평", "하맹방(연봉)", "외달도", "장등", "곽지과물", "고사포", "안면", "송지호", "옥계", "발포", "신덕", "송정솔바람", "하나개", "땅끝송호", "곰섬", "봉암", "구름포", "오류고아라", "통영공설", "아야진", "다대포", "동호", "대풍", "신양섭지코지", "송지호오토캠핑장", "반암리", "작은풀안", "상록", "을왕리", "용화", "무창포", "초도리", "거진1리", "떼뿌루", "웅천", "왜목마을", "한재밑", "등대", "홀통", "동산포", "백도", "대광", "이일레", "주문진", "여차", "광안리", "김녕성세기", "청포대", "순긋", "대진1리", "기성망양", "굴업도", "청산지리청송", "삼양검은모래", "남일대", "물치", "월정", "염포", "금일명사십리", "샛별", "갯마을", "우전", "삼척", "보길예송", "바람아래", "두곡월포", "남열해돋이", "문암2리", "천리포", "금당온금포", "와현", "가진리", "십리포", "임랑", "원포", "사탄동", "보길통리", "소안미라", "궁촌", "정강", "추포", "삼봉", "황성금리", "나로우주", "지두리", "춘장대", "대진5리", "한들", "금갑", "상주은모래비치", "덕동", "송정", "진촌", "작은후진", "감추", "구영", "화진포콘도", "자작도", "통개", "망상", "해운대", "증산", "함목", "가마미", "함덕서우봉", "명사", "사구미", "구조라", "중문색달", "망치", "일광", "문암", "오분", "서포리", "거문도", "설리", "명파", "부남", "꾸지나무꼴", "안도", "밧지름", "생일금곡", "하평", "사촌", "천진", "장골", "봉평", "경정", "시목", "돌머리", "학암포", "오산", "캔싱턴리조트", "사곶", "강문", "조개골", "용동", "고래불", "청간", "후포", "안인", "황포", "표선해비치", "서도", "칠포", "분계", "꽃지", "송도", "금진", "죽림", "설악", "광암", "하조대", "38", "벌안", "낭도", "모사금", "하효쇠소깍", "구례포", "정동진", "덕산", "남항진", "일산", "익금", "신전", "낙산", "금장", "송평", "금능으뜸원", "화진포", "변산", "지경", "덕흥", "달산포", "망양정", "한섬", "금계", "거진11리", "마검포", "망상리조트", "대빈창", "화진", "설레미", "인구", "잔교", "삼포", "선유도", "공현2리", "풍류", "장경리", "협재", "구룡포", "기지포", "교암리", "밧개", "농소", "신지명사십리", "안악", "민머루", "오보", "정암", "두여", "봉포", "상맹방(승공)", "중광정", "봉수대", "동산", "안목", "왕산", "장호", "세화", "남호", "진하", "실미", "갈음이", "자작도캠핑장", "톱머리", "광진", "방죽포", "구산", "선구", "관성솔밭", "영일대", "어달", "남애1리", "동막", "의항", "덕포", "영진", "약산가사동백숲", "사천", "물안", "장삼포", "돈목", "파도리", "마차진", "남애3리", "비진", "하저", "경포", "선녀바위", "삼포2리", "전촌솔밭", "노봉", "구시포", "모항"];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    if (inputValue) {
      const result = beaches.filter(item => item.includes(inputValue));
      setFilteredItems(result);
    } else {
      setFilteredItems([]);
    }
  };

  const handleListItemClick = async (name) => {
    try {
      const beach = await Api.get(`beaches/beachbyname/${name}`);

      onBeachIdSelected(beach.data._id);
      console.log(`onBeachIdSelected: ${beach.data._id}`);

      setSearchTerm(beach.data.name);
      console.log(`onBeachIdSelected: ${beach.data.name}`);

      setFilteredItems([]);
      console.log(`setFilteredItems: ${filteredItems}`);
    } catch (error) {
      displayToast("해변 정보를 가져오는 중 오류 발생");
    }
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {filteredItems.length > 0 && (
        <ListGroup style={{ position: 'absolute', zIndex: 1 }}>
          {filteredItems.map((item) => (
            <ListGroup.Item key={item} onClick={() => {
              console.log(`filter map : ${item}`)
              handleListItemClick(item)}}>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
export default SearchInput;
