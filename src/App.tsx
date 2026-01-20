import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import PreventionTab from './components/PreventionTab'
import AuctionAnalysisTab from './components/AuctionAnalysisTab'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            전세안전진단 & 경매 권리분석
          </h1>
          <p className="text-lg text-slate-600">
            깡통전세 방지와 안전한 경매 입찰을 위한 무료 도구
          </p>
        </header>

        {/* 탭 네비게이션 */}
        <Tabs defaultValue="prevention" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 mb-6">
            <TabsTrigger 
              value="prevention" 
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-base font-medium py-3"
            >
              전세 안전진단
            </TabsTrigger>
            <TabsTrigger 
              value="auction" 
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-base font-medium py-3"
            >
              경매 권리분석
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prevention" className="mt-0">
            <PreventionTab />
          </TabsContent>

          <TabsContent value="auction" className="mt-0">
            <AuctionAnalysisTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
