# redeem_dispatch

**Dispatch** 보너스 디지털 사운드트랙 리딤 코드 페이지.
초회판 패키지에 동봉된 바우처 코드를 입력하면 사운드트랙 다운로드 링크가 노출됩니다.

- 배포 주소: https://pmstudios.github.io/redeem_dispatch
- 구조: Create React App (react-scripts 3.4.3) 단일 페이지 정적 사이트
- 자매 프로젝트: `redeem_gg` (Girl Genius), `redeem_wsr` (WitchSpring R)

## 구조

```
src/App.js                     UI + 코드 검증 로직 전부
src/App.css, src/index.css     스타일
src/RedeemCode_Dispatch.json   유효 리딤 코드 배열
public/images/Logo.png         상단 로고
public/images/Background.png   전체 배경 (Key Art 1920x1080)
```

동작: 입력한 코드를 `RedeemCode_Dispatch.json` 의 `data` 배열에서 완전 일치로 찾고,
있으면 Dropbox 다운로드 링크, 없으면 "Invalid Redeem Code" 를 표시합니다.

## 개발

```bash
yarn install
yarn start        # http://localhost:3000
```

`build`/`start` 스크립트에 `--openssl-legacy-provider` 가 포함되어 있어
최신 Node(18+) 에서도 webpack 4 빌드가 동작합니다.

## 배포

```bash
yarn deploy       # predeploy(build) -> gh-pages -d build
```

`build/` 산출물이 `gh-pages` 브랜치로 강제 푸시되고 GitHub Pages 가 그대로 서빙합니다.
GitHub 저장소 Settings > Pages 에서 Source 가 `gh-pages` 브랜치 / 루트(`/`) 인지 확인하세요.

리딤 코드만 교체할 때는 `src/RedeemCode_Dispatch.json` 의 `data` 배열을 수정하고
`yarn deploy` 를 다시 실행하면 됩니다.

## 주의

코드 검증이 전부 클라이언트에서 이뤄지므로, 전체 코드 목록과 다운로드 링크가
번들 JS 에 평문으로 포함됩니다. 코드 1회 사용 제한이나 사용 이력 추적은 없습니다.
자매 프로젝트들과 동일한 방식입니다.
