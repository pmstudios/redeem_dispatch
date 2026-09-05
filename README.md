# redeem_dispatch

**Dispatch SteelBook Edition** 보너스 디지털 사운드트랙 리딤 코드 페이지.
초회판 패키지에 동봉된 바우처 코드를 입력하면 사운드트랙 다운로드 링크가 노출됩니다.

- **라이브: https://pmstudios.github.io/redeem_dispatch/**
- 저장소: `pmstudios/redeem_dispatch` (Public)
- 스택: Create React App (react-scripts 3.4.3) 단일 페이지 정적 사이트
- 자매 프로젝트: `redeem_gg` (Girl Genius), `redeem_wsr` (WitchSpring R) — 동일 구조

---

## ⚠️ 남은 작업 (이거 없으면 페이지가 실제로 작동하지 않음)

### 1. 리딤 코드 목록이 비어 있음

`src/RedeemCode_Dispatch.json` 이 `{"data":[]}` 입니다.
지금은 **어떤 코드를 넣어도 "Invalid Redeem Code"** 가 뜹니다.

실데이터를 받으면 아래 형식으로 채우세요. 가짜 코드가 실서비스에 섞이는 걸 막으려고
의도적으로 비워둔 것이며, 임의 생성하지 마세요.

```json
{"data":["ABCD1234","EFGH5678", ...]}
```

참고 규모 — `redeem_wsr`: 8자리 7,500개 / `redeem_gg`: 8자리 1,750개.
입력창 `maxLength` 는 10 으로 잡혀 있습니다 (`src/App.js` 의 input).

### 2. 다운로드 링크가 플레이스홀더

`src/App.js` 의 `renderDownloadLink()` 안:

```jsx
<a href='TODO_DROPBOX_LINK' ...>Download</a>
```

`TODO_DROPBOX_LINK` 를 실제 Dropbox 공유 링크로 교체해야 합니다.
자매 프로젝트들은 `https://www.dropbox.com/scl/fo/.../...?rlkey=...&dl=0` 형태를 씁니다.

### 3. (미결정) 브라우저 탭 제목

현재 `Dispatch - Redeem Code` 입니다. `Dispatch SteelBook Edition - Redeem Code` 로
맞출지 미정. 바꾸려면 `public/index.html` 의 `<title>` 과 `public/manifest.json` 의
`name` 두 곳.

---

## 구조

```
src/App.js                     UI + 코드 검증 로직 전부 (클래스 컴포넌트 하나)
src/App.css                    스타일 대부분
src/index.css                  전역 리셋/유틸
src/RedeemCode_Dispatch.json   유효 리딤 코드 배열  ← 비어 있음
public/images/Logo.png         상단 로고 (512x240, RGBA 투명배경)
public/images/Background.png   전체 배경 (Night City 키아트 1920x1080)
```

동작: 입력한 코드를 `RedeemCode_Dispatch.json` 의 `data` 배열에서 **완전 일치**로 찾고,
있으면 Dropbox 다운로드 링크, 없으면 "Invalid Redeem Code" 를 표시합니다.

---

## 다른 PC에서 이어받기

### 1) 클론 & 설치

```bash
git clone https://github.com/pmstudios/redeem_dispatch.git
cd redeem_dispatch
yarn install
yarn start        # http://localhost:3000
```

Node 18+ 에서도 그냥 됩니다. `build`/`start` 스크립트에 `--openssl-legacy-provider`
플래그가 들어 있어서, webpack 4 가 최신 Node 의 OpenSSL 3 와 충돌하는 문제
(`error:0308010C:digital envelope routines::unsupported`)를 피해갑니다.

### 2) 배포 권한 설정 ← **새 PC 마다 반드시 필요**

`pmstudios` 는 **조직이 아니라 개인 GitHub 계정**입니다. 다른 계정(예: `limdp99`)으로
인증돼 있으면 push 가 403 으로 막힙니다.

```bash
gh auth login -h github.com -p https -w      # 반드시 pmstudios 계정으로 로그인
```

`gh auth login` 은 대화형 프롬프트가 필요하므로 일반 터미널 창에서 직접 실행하세요.

그리고 **이 저장소 URL 한정**으로 git 이 gh 토큰을 쓰도록 걸어줍니다.
Git Credential Manager 에 다른 GitHub 계정이 캐시돼 있으면 `gh-pages` 툴이
별도 캐시 클론에서 push 하다가 그 계정으로 붙어 403 이 나기 때문입니다.

```bash
for U in "https://github.com/pmstudios/redeem_dispatch" \
         "https://github.com/pmstudios/redeem_dispatch.git"; do
  git config --global "credential.$U.helper" ""
  git config --global --add "credential.$U.helper" '!gh auth git-credential'
done
```

URL 이 정확히 일치할 때만 적용되므로 다른 저장소 인증에는 영향이 없습니다.
되돌리려면 같은 키에 `--unset-all`.

### 3) 배포

```bash
yarn deploy       # predeploy(build) -> gh-pages -d build
```

`build/` 산출물이 `gh-pages` 브랜치로 강제 푸시되고 GitHub Pages 가 서빙합니다.
Pages 소스는 `gh-pages` 브랜치 / 루트(`/`) 로 이미 설정돼 있습니다.

**GitHub Pages CDN 캐시 때문에 반영까지 30초~1분 정도 걸립니다.** 브라우저에서
바로 확인하면 옛날 화면이 보일 수 있으니, 하드 리로드(Ctrl+Shift+R)하거나
아래처럼 실제 배포된 번들 해시를 확인하세요.

```bash
curl -sL https://pmstudios.github.io/redeem_dispatch/ | grep -o 'main\.[a-z0-9]*\.chunk\.js'
# 로컬 build/static/js/ 의 파일명과 같아지면 반영 완료
```

배포가 `fatal: a branch named 'gh-pages' already exists` 로 실패하면
이전 실패가 남긴 캐시입니다. `rm -rf node_modules/.cache/gh-pages` 후 재시도.

---

## 이 프로젝트에서 손본 것 (자매 프로젝트와 다른 점)

자매 프로젝트(`redeem_gg`, `redeem_wsr`)를 그대로 복제한 뒤 아래를 고쳤습니다.
같은 문제가 자매 프로젝트에도 남아 있으니 그쪽 수정 시 참고하세요.

- **`box-sizing: border-box`** — `.text01`, `.text02` 가 `width:100%` 에 좌우 패딩
  32px 씩을 더 갖고 있어 실제 폭이 844px(프레임은 780px)이었습니다. 자매 프로젝트는
  고정 `<br/>` 로 줄을 짧게 끊어놔서 겉으로 안 드러날 뿐, 같은 버그가 있습니다.
- **고정 `<br/>` 제거** — `.text01`, `.text02` 는 자연 줄바꿈에 맡겼습니다. 문구 길이가
  바뀌어도 안 깨집니다. 단, `.text03`(분홍 박스)의 `<br/>` 은 **의도된 목록 줄바꿈**이라
  그대로 뒀습니다. 여기까지 자연 줄바꿈으로 바꾸면 항목이 뭉개집니다.
- **`**` → 실제 볼드** — 경고 문단의 `**` 가 마크다운 의도였는데 리액트에선 문자 그대로
  출력되고 있었습니다. `**` 를 지우고 `.text02` 에 `font-weight:700` 을 넣었습니다.
- **`h1` 흰색 + `text-shadow`** — 자매 프로젝트에서 딸려온 보라색(`#5644B4`)이 어두운
  Night City 배경에서 안 읽혀서 교체했습니다.

## 주의

코드 검증이 전부 클라이언트에서 이뤄지므로, **전체 코드 목록과 다운로드 링크가
번들 JS 에 평문으로 포함**됩니다. 코드 없이 링크만 추출해도 다운로드가 가능하고,
1회 사용 제한이나 사용 이력 추적도 없습니다. 자매 프로젝트들과 동일한 방식입니다.
