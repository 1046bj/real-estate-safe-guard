import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { HelpCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export default function PreventionTab() {
  const [housePrice, setHousePrice] = useState('')
  const [seniorDebt, setSeniorDebt] = useState('')
  const [deposit, setDeposit] = useState('')

  // 숫자에 콤마 추가
  const formatNumberWithCommas = (value: string): string => {
    // 숫자만 추출 (콤마 제거)
    const numbers = value.replace(/[^\d]/g, '')
    // 천단위 콤마 추가
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 콤마 제거 후 숫자 반환
  const removeCommas = (value: string): string => {
    return value.replace(/,/g, '')
  }

  // 숫자 입력 핸들러
  const handleNumberChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const numbersOnly = removeCommas(value)
    setter(formatNumberWithCommas(numbersOnly))
  }

  const housePriceNum = parseFloat(removeCommas(housePrice)) || 0
  const seniorDebtNum = parseFloat(removeCommas(seniorDebt)) || 0
  const depositNum = parseFloat(removeCommas(deposit)) || 0

  // 깡통전세율 계산
  const emptyDepositRate = housePriceNum > 0 
    ? ((seniorDebtNum + depositNum) / housePriceNum) * 100 
    : 0

  // 안전한 보증금 역산 (60% 기준)
  const safeDeposit = housePriceNum > 0 && seniorDebtNum >= 0
    ? Math.max(0, (housePriceNum * 0.6) - seniorDebtNum)
    : 0

  // 신호등 상태 결정
  let status: 'safe' | 'warning' | 'danger' = 'safe'
  let statusText = ''
  let statusColor = ''

  if (emptyDepositRate <= 60) {
    status = 'safe'
    statusText = '안전'
    statusColor = 'bg-green-500'
  } else if (emptyDepositRate <= 80) {
    status = 'warning'
    statusText = '주의'
    statusColor = 'bg-yellow-500'
  } else {
    status = 'danger'
    statusText = '위험'
    statusColor = 'bg-red-500'
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>전세 안전진단</CardTitle>
          <CardDescription>
            계약 전 전세 보증금의 안전성을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 주택 시세 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              주택 시세 (매매가)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>해당 주택의 시장 매매 가격입니다</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="relative">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="예: 500,000,000"
                value={housePrice}
                onChange={(e) => handleNumberChange(e.target.value, setHousePrice)}
                className="text-lg pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                원
              </span>
            </div>
          </div>

          {/* 선순위 채권 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              선순위 채권 (등기부등본의 근저당권 설정액)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>등기부등본에서 확인한 근저당권, 가압류 등의 선순위 채권액입니다</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="relative">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="예: 300,000,000"
                value={seniorDebt}
                onChange={(e) => handleNumberChange(e.target.value, setSeniorDebt)}
                className="text-lg pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                원
              </span>
            </div>
          </div>

          {/* 전세 보증금 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              나의 전세 보증금
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>계약하려는 전세 보증금입니다</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="relative">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="예: 200,000,000"
                value={deposit}
                onChange={(e) => handleNumberChange(e.target.value, setDeposit)}
                className="text-lg pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                원
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 결과 화면 */}
      {housePriceNum > 0 && depositNum > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>진단 결과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 신호등 UI */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-full ${status === 'safe' ? statusColor : 'bg-gray-300'} transition-colors`} />
                <div className={`w-20 h-20 rounded-full ${status === 'warning' ? statusColor : 'bg-gray-300'} transition-colors`} />
                <div className={`w-20 h-20 rounded-full ${status === 'danger' ? statusColor : 'bg-gray-300'} transition-colors`} />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">
                  깡통전세율: {emptyDepositRate.toFixed(2)}%
                </p>
                <p className={`text-xl font-semibold ${
                  status === 'safe' ? 'text-green-600' :
                  status === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {statusText}
                </p>
              </div>
            </div>

            {/* 안전 가이드 */}
            {status !== 'safe' && safeDeposit >= 0 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg font-medium text-blue-900">
                  💡 권장 사항
                </p>
                <p className="text-base text-blue-800 mt-2">
                  보증금을 <span className="font-bold">{formatNumber(safeDeposit / 10000)}만원</span>으로 낮춰야 안전해요
                  {safeDeposit <= 0 && ' (선순위 채권이 너무 높아 안전한 전세 계약이 어렵습니다)'}
                </p>
              </div>
            )}

            {status === 'safe' && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-lg font-medium text-green-900">
                  ✅ 안전한 전세 계약입니다
                </p>
                <p className="text-base text-green-800 mt-2">
                  현재 조건으로 계약해도 안전합니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
