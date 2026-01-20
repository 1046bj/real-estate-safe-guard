# 부동산 세이프 가드 (Real Estate Safe Guard)

전세 안전진단과 경매 권리분석을 위한 웹 애플리케이션입니다.

## 기능

### 1. 전세 안전진단
- 주택 시세, 선순위 채권, 전세 보증금을 입력하여 깡통전세율 계산
- 신호등 UI로 안전성 표시 (안전/주의/위험)
- 안전한 보증금 역산 가이드 제공

### 2. 경매 권리분석
- 말소기준권리일과 임차인 전입신고일 비교
- 대항력 유무 분석
- 타임라인 시각화

## 기술 스택

- Vite + React + TypeScript
- Tailwind CSS
- shadcn/ui
- date-fns

## 설치 및 실행

```bash
npm install
npm run dev
```

## 배포

Vercel을 통해 배포할 수 있습니다.
