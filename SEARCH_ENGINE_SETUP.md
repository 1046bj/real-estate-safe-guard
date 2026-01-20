# 검색 엔진 등록 가이드

## 1. Google Search Console 등록

1. **Google Search Console 접속**
   - https://search.google.com/search-console 접속
   - Google 계정으로 로그인

2. **속성 추가**
   - "속성 추가" 클릭
   - "URL 접두어" 선택
   - `https://real-estate-safe-guard.vercel.app` 입력

3. **소유권 확인**
   - HTML 태그 방식 선택
   - 제공된 메타 태그 코드를 복사
   - `index.html`의 `<meta name="google-site-verification" content="" />` 부분에 붙여넣기

4. **사이트맵 제출**
   - 왼쪽 메뉴에서 "Sitemaps" 클릭
   - `sitemap.xml` 입력 후 제출

## 2. 네이버 서치어드바이저 등록

1. **네이버 서치어드바이저 접속**
   - https://searchadvisor.naver.com 접속
   - 네이버 계정으로 로그인

2. **사이트 등록**
   - "웹마스터 도구" → "사이트 추가"
   - `https://real-estate-safe-guard.vercel.app` 입력

3. **소유권 확인**
   - HTML 태그 방식 선택
   - 제공된 메타 태그 코드를 복사
   - `index.html`의 `<meta name="naver-site-verification" content="" />` 부분에 붙여넣기

4. **사이트맵 제출**
   - "요청" → "사이트맵 제출"
   - `https://real-estate-safe-guard.vercel.app/sitemap.xml` 입력

## 3. 다음(Daum) 검색 등록

1. **다음 검색 등록**
   - https://register.search.daum.net/index.daum 접속
   - 다음 계정으로 로그인

2. **사이트 등록**
   - "웹사이트 등록" 클릭
   - `https://real-estate-safe-guard.vercel.app` 입력
   - 사이트 정보 입력 후 제출

## 4. Bing Webmaster Tools 등록

1. **Bing Webmaster Tools 접속**
   - https://www.bing.com/webmasters 접속
   - Microsoft 계정으로 로그인

2. **사이트 추가**
   - "Add a site" 클릭
   - `https://real-estate-safe-guard.vercel.app` 입력

3. **소유권 확인**
   - HTML 메타 태그 방식 선택
   - 제공된 메타 태그를 `index.html`에 추가

4. **사이트맵 제출**
   - "Sitemaps" 메뉴 클릭
   - `https://real-estate-safe-guard.vercel.app/sitemap.xml` 입력 후 제출

## 5. 인덱싱 요청

각 검색 엔진에서:
1. "URL 검사" 또는 "인덱싱 요청" 기능 사용
2. 메인 페이지 URL 입력: `https://real-estate-safe-guard.vercel.app/`
3. 인덱싱 요청 제출

## 참고사항

- 검색 엔진 인덱싱은 보통 1-2주 정도 소요됩니다
- 정기적으로 사이트맵을 업데이트하면 더 빠른 인덱싱이 가능합니다
- 콘텐츠를 업데이트하면 각 검색 엔진에 재크롤링을 요청하세요
