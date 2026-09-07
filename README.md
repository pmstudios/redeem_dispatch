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

### 2. 다운로드 링크가 플레이스홀더

`src/App.js` 의 `renderDownloadLink()` 안:

```jsx
<a href='TODO_DROPBOX_LINK' ...>Download</a>
```

`TODO_DROPBOX_LINK` 를 실제 Dropbox 공유 링크로 교체해야 합니다.
자매 프로젝트들은 `https://www.dropbox.com/scl/fo/.../...?rlkey=...&dl=0` 형태를 씁니다.


## 주의

코드 검증이 전부 클라이언트에서 이뤄지므로, **전체 코드 목록과 다운로드 링크가
번들 JS 에 평문으로 포함**됩니다. 코드 없이 링크만 추출해도 다운로드가 가능하고,
1회 사용 제한이나 사용 이력 추적도 없습니다. 자매 프로젝트들과 동일한 방식입니다.
