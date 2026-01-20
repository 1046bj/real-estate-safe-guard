import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { HelpCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { format, parse, isValid } from 'date-fns'

export default function AuctionAnalysisTab() {
  const [rightsDate, setRightsDate] = useState('')
  const [tenancyDate, setTenancyDate] = useState('')
  const [confirmationDate, setConfirmationDate] = useState('')

  // 날짜 파싱
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date())
    return isValid(parsed) ? parsed : null
  }

  const rightsDateObj = parseDate(rightsDate)
  const tenancyDateObj = parseDate(tenancyDate)
  const confirmationDateObj = parseDate(confirmationDate)

  // 대항력 분석
  let hasAdversarialPower: boolean | null = null
  let analysisResult = ''
  let resultColor = ''
  let warningMessage = ''

  if (rightsDateObj && tenancyDateObj) {
    // 전입신고일이 말소기준권리일보다 빠르면 대항력 있음
    hasAdversarialPower = tenancyDateObj < rightsDateObj
    
    if (hasAdversarialPower) {
      analysisResult = '대항력 있음 (낙찰자 인수)'
      resultColor = 'text-red-600 bg-red-50 border-red-200'
      warningMessage = '낙찰받으면 보증금을 물어줘야 해요!'
    } else {
      analysisResult = '대항력 없음 (소멸)'
      resultColor = 'text-green-600 bg-green-50 border-green-200'
      warningMessage = '권리가 깨끗하게 사라지는 물건입니다.'
    }
  }

  // 타임라인을 위한 날짜 정렬
  const timelineDates = [
    { label: '말소기준권리일', date: rightsDateObj, color: 'bg-blue-500' },
    { label: '임차인 전입신고일', date: tenancyDateObj, color: 'bg-purple-500' },
    ...(confirmationDateObj ? [{ label: '확정일자', date: confirmationDateObj, color: 'bg-gray-500' }] : [])
  ].filter(item => item.date).sort((a, b) => a.date!.getTime() - b.date!.getTime())

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return ''
    return format(date, 'yyyy년 MM월 dd일')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>경매 권리분석</CardTitle>
          <CardDescription>
            경매 물건의 권리 관계를 분석하여 대항력을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 말소기준권리일 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              말소기준권리일
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>근저당, 가압류 등 가장 빠른 권리 날짜입니다. 등기부등본에서 확인할 수 있습니다.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="date"
              value={rightsDate}
              onChange={(e) => setRightsDate(e.target.value)}
              className="text-lg h-12"
            />
            {rightsDateObj && (
              <p className="text-sm text-muted-foreground">
                {formatDateDisplay(rightsDateObj)}
              </p>
            )}
          </div>

          {/* 임차인 전입신고일 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              임차인 전입신고일
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>세입자가 이사 와서 주민등록상 주소를 옮긴 날짜입니다.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="date"
              value={tenancyDate}
              onChange={(e) => setTenancyDate(e.target.value)}
              className="text-lg h-12"
            />
            {tenancyDateObj && (
              <p className="text-sm text-muted-foreground">
                {formatDateDisplay(tenancyDateObj)}
              </p>
            )}
          </div>

          {/* 확정일자 입력 (선택) */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              확정일자 (선택)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>전세 계약서에 기재된 확정일자입니다. 선택 입력 항목입니다.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="date"
              value={confirmationDate}
              onChange={(e) => setConfirmationDate(e.target.value)}
              className="text-lg h-12"
            />
            {confirmationDateObj && (
              <p className="text-sm text-muted-foreground">
                {formatDateDisplay(confirmationDateObj)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 타임라인 시각화 */}
      {timelineDates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>권리 관계 타임라인</CardTitle>
            <CardDescription>
              날짜 순서로 권리 관계를 시각화합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* 타임라인 선 */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" />
              
              {/* 타임라인 항목들 */}
              <div className="space-y-8">
                {timelineDates.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    {/* 원형 마커 */}
                    <div className={`relative z-10 w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                      {index + 1}
                    </div>
                    
                    {/* 날짜 정보 */}
                    <div className="flex-1 pt-2">
                      <p className="font-semibold text-lg">{item.label}</p>
                      <p className="text-muted-foreground">
                        {formatDateDisplay(item.date!)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 분석 결과 */}
      {hasAdversarialPower !== null && (
        <Card>
          <CardHeader>
            <CardTitle>권리분석 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-6 rounded-lg border-2 ${resultColor}`}>
              <div className="flex items-center gap-3 mb-4">
                {hasAdversarialPower ? (
                  <span className="text-4xl">🚨</span>
                ) : (
                  <span className="text-4xl">✅</span>
                )}
                <h3 className="text-2xl font-bold">
                  {analysisResult}
                </h3>
              </div>
              <p className="text-lg font-medium mt-4">
                {warningMessage}
              </p>
              
              {/* 상세 설명 */}
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <p className="text-sm leading-relaxed">
                  {hasAdversarialPower ? (
                    <>
                      임차인의 전입신고일({formatDateDisplay(tenancyDateObj!)})이 말소기준권리일({formatDateDisplay(rightsDateObj!)})보다 
                      <strong className="text-red-700"> 빠르므로</strong> 대항력이 인정됩니다. 
                      경매 낙찰 후에도 임차인의 전세권이 유지되며, 낙찰인이 보증금을 인수해야 합니다.
                    </>
                  ) : (
                    <>
                      임차인의 전입신고일({formatDateDisplay(tenancyDateObj!)})이 말소기준권리일({formatDateDisplay(rightsDateObj!)})보다 
                      <strong className="text-green-700"> 늦으므로</strong> 대항력이 없습니다. 
                      경매 낙찰 시 임차인의 권리가 소멸되며, 낙찰인이 보증금을 인수할 의무가 없습니다.
                    </>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
