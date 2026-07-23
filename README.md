# Dungeon World Korean Translation

[FoundryVTT](https://foundryvtt.com/) 던전월드(Dungeon World) 시스템용 한글화 모듈입니다.

## 기능

- **UI 한글화** (`ko.json`): 캐릭터 시트, 액터/아이템 타입, 능력치 등 시스템 인터페이스 전반을 한글로 표시합니다.
- **컴펜디엄 한글화** ([Babele](https://foundryvtt.com/packages/babele) 사용): 던전월드 시스템이 제공하는 컴펜디엄 전체(35개 팩)를 한글로 번역합니다.
  - 기본 액션, 태그, 장비(갑옷/무기/일반 장비/마법 물품/독), 규칙표, GM 스크린
  - 기본 직업(전사, 도적, 마법사, 사제, 바드, 드루이드, 팔라딘, 레인저, 이모레이터) 및 커스텀 직업(야만전사, 소각술사)의 액션
  - 몬스터 9개 팩(동굴 거주자, 늪지, 언데드, 어두운 숲속, 이민족의 무리, 뒤틀린 실험체, 깊고도 깊은 곳, 이계의 존재, 사람들) 전 개체
- **아이템/몬스터 태그 표시 한글화**: 시트에 표시되는 태그 칩(예: Close → 한걸음, Precise → 정밀)을 화면 렌더링 시점에만 한글로 바꿔서 보여줍니다. 실제 데이터(`system.tags`)는 항상 원본 영어를 유지하므로 관통/피해/장갑무시 등 태그를 실제로 파싱해 계산하는 로직에는 영향이 없습니다.
- 액터 이미지가 바뀌면 같은 폴더 내 토큰용 이미지를 자동으로 찾아 적용하는 편의 기능이 포함되어 있습니다.

## 설치

1. Foundry VTT의 모듈 설치 화면에서 매니페스트 URL을 입력합니다:
   `https://github.com/Nomal-1/t2/releases/latest/download/module.json`
2. 던전월드 시스템 월드에서 이 모듈과 함께 다음 모듈을 활성화하세요:
   - [Babele](https://foundryvtt.com/packages/babele)
   - [libWrapper](https://foundryvtt.com/packages/lib-wrapper)

## 참고 자료

번역은 던전월드 한국어 공식판(v1.0.0)과 유저 번역 자료(야만전사, 소각술사 플레이북 번역)를 참고했습니다.

## 라이선스

[LICENSE](LICENSE) 참고.
