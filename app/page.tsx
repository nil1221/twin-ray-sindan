"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Sparkles, ExternalLink, Stars } from "lucide-react"

const questions = [
  "初対面のとき「ぐわっときた感覚」や「パチンとした感覚」がありましたか？",
  "相手、もしくは自分が既婚者ですか？",
  "男性から連絡を避けられていると感じますか？",
  "会えない期間がありましたか？",
  "相手と体の関係がありますか？",
  "相手からボディタッチをされることがありますか？",
  "音信不通になったことがありますか？",
  "会っていなくても、なんとなく気になりますか？",
  "相手に懐かしい感覚を覚えましたか？",
  "離れていても近くに感じることがありますか？",
  "相手と自分の仕草やほくろの位置など、体の特徴が似ていますか？",
  "相手と一緒にいると安心しますか？",
  "相手と一緒にいると心地よいですか？",
  "出会ってから自分の考え方や生き方が変わりましたか？",
  "相手との関わりで、自分の弱さや苦しみが出てきましたか？",
  "相手との間で偶然の一致（シンクロ）が多いですか？",
  "相手と一緒にいると時間があっという間に過ぎますか？",
  "相手の気持ちや体調が自分に伝わることがありますか？",
  "離れても「また会える」と思うことがありますか？",
  "相手と出会ってから「自分の使命」を意識するようになりましたか？",
]

const results = [
  {
    range: [0, 1],
    title: "まだ深いご縁は感じられません",
    description:
      "今回はまだ、ツインレイとしての深いつながりは見えにくいかもしれません。でも、それは決して悲しいことではありません。",
    advice:
      "今回はまだ、ツインレイとしての深いつながりは見えにくいかもしれません。でも、それは決して悲しいことではありません。ツインレイとの出会いは、あなたが心も魂も準備できた時に訪れると言われています。今の時間は、自分自身を大切にするために与えられた大切な期間なのです。好きなことに打ち込んだり、自分を癒すことに意識を向けることで、あなたの波動は自然に整っていきます。その時、本当に必要なご縁が必ず引き寄せられますから、どうか安心してくださいね。",
  },
  {
    range: [2, 4],
    title: "ツインレイに近い特別なご縁である可能性が高い",
    description: "このご縁には、心を揺さぶるような不思議な力を感じます。",
    advice:
      'このご縁には、心を揺さぶるような不思議な力を感じます。まだ"ツインレイかどうか"ははっきりしないかもしれませんが、そう感じる時点で特別な意味を持つ相手であることは間違いありません。大切なのは、答えを急がず、今の感覚を信じてみることです。人との出会いは、すぐに形になるものばかりではありません。あなたの心が自然に惹かれていくなら、その直感は未来へとつながる導きです。ご自身の心を大切にしながら、この関係をじっくり見つめてみてください。',
  },
  {
    range: [5, 6],
    title: "ツインレイの可能性が高い",
    description: "あなたとお相手のご縁は、ツインレイである可能性をしっかりと感じさせてくれます。",
    advice:
      'あなたとお相手のご縁は、ツインレイである可能性をしっかりと感じさせてくれます。ただ、ツインレイの関係は直線的に進むものではありません。近づいたかと思えば距離ができたり、気持ちが揺れ動くこともあります。それは決して"うまくいっていない"のではなく、必要なタイミングで必要な気づきを得ているからなのです。焦らず、目の前にある時間を大切にしてください。お二人が互いを理解しようとする姿勢こそが、絆を深める一番の近道なのです。',
  },
  {
    range: [7, 20],
    title: "本物のツインレイの可能性が高い",
    description: "ここまで多くの共通点や感覚を感じているあなたは、とても特別なご縁に導かれていますね。",
    advice:
      'ここまで多くの共通点や感覚を感じているあなたは、とても特別なご縁に導かれていますね。ツインレイの関係は、ただ"運命の人に出会った"というだけではなく、魂同士がお互いを映し出し、成長を促し合う深い学びの場でもあります。時には心が揺さぶられたり、不安になることもあるかもしれません。でも、それもまた魂が統合へと向かうための大切なプロセスなのです。どうか恐れず、心の声に耳を澄ませてみてください。お相手とあなたの絆は、ゆっくりと確かなものになっていきますよ。',
  },
]

export default function TwinFlameDiagnosis() {
  const [currentStep, setCurrentStep] = useState<"start" | "questions" | "result">("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [result, setResult] = useState<(typeof results)[0] | null>(null)

  const handleStart = () => {
    setCurrentStep("questions")
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const yesCount = newAnswers.filter(Boolean).length
      const resultIndex = results.findIndex((r) => yesCount >= r.range[0] && yesCount <= r.range[1])
      setResult(results[resultIndex])
      setCurrentStep("result")
    }
  }

  const handleRestart = () => {
    setCurrentStep("start")
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  const progress = currentStep === "questions" ? ((currentQuestion + 1) / questions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-pink-300 rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-rose-300 rounded-full animate-float opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-70"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-5 h-5 bg-rose-400 rounded-full animate-float opacity-60"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <Stars className="absolute top-1/4 left-1/3 w-8 h-8 text-pink-300 animate-sparkle opacity-40" />
        <Stars
          className="absolute bottom-1/3 right-1/4 w-6 h-6 text-rose-300 animate-sparkle opacity-50"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {currentStep === "start" && (
          <Card className="text-center shadow-2xl border-0 bg-gradient-to-br from-pink-50/95 to-rose-50/95 backdrop-blur-sm animate-glow">
            <CardHeader className="space-y-6 pb-8">
              <div className="flex justify-center">
                <div className="relative">
                  <Heart className="h-20 w-20 text-pink-500 animate-heartbeat" />
                  <Sparkles className="h-10 w-10 text-rose-400 absolute -top-3 -right-3 animate-sparkle" />
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                </div>
              </div>
              <CardTitle className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
                ツインレイ診断
              </CardTitle>
              <CardDescription className="text-xl text-pink-700 leading-relaxed">
                あなたの運命の人は真のツインレイでしょうか？
                <br />
                <span className="text-rose-600 font-semibold">20の質問</span>で魂のつながりを診断します
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <div
                onClick={handleStart}
                className="w-full max-w-sm mx-auto text-xl py-8 px-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-glow font-semibold rounded-lg cursor-pointer flex items-center justify-center"
                style={{
                  background: "#ffffff !important",
                  color: "#be185d !important",
                  border: "3px solid #be185d",
                  boxShadow: "0 10px 25px rgba(190, 24, 93, 0.3)",
                }}
              >
                <Sparkles className="mr-3 h-6 w-6 animate-spin" style={{ color: "#be185d !important" }} />
                診断を始める
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === "questions" && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50/95 to-rose-50/95 backdrop-blur-sm animate-glow">
            <CardHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-pink-600">
                  <span className="font-semibold">
                    質問 {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-pink-100" />
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <Heart className="h-8 w-8 text-pink-400 animate-pulse" />
                </div>
                <h2 className="text-2xl font-semibold text-pink-800 leading-relaxed mb-10 animate-pulse">
                  {questions[currentQuestion]}
                </h2>
                <div className="flex gap-6 justify-center">
                  <div
                    onClick={() => handleAnswer(true)}
                    className="px-16 py-8 text-xl shadow-xl transform hover:scale-110 transition-all duration-300 animate-glow font-semibold rounded-lg cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #be185d 0%, #9f1239 100%)",
                      color: "#ffffff",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(190, 24, 93, 0.3)",
                    }}
                  >
                    はい
                  </div>
                  <div
                    onClick={() => handleAnswer(false)}
                    className="px-16 py-8 text-xl shadow-xl transform hover:scale-110 transition-all duration-300 font-semibold rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#be185d",
                      border: "3px solid #be185d",
                      boxShadow: "0 10px 25px rgba(190, 24, 93, 0.2)",
                    }}
                  >
                    いいえ
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === "result" && result && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50/95 to-rose-50/95 backdrop-blur-sm animate-glow">
            <CardHeader className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Heart className="h-16 w-16 text-pink-500 animate-heartbeat" />
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-pink-600 animate-pulse">診断結果</CardTitle>
              <CardTitle className="text-3xl font-semibold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                {result.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center space-y-6">
                <p className="text-xl text-pink-800 leading-relaxed">{result.description}</p>
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200 animate-glow">
                  <p className="text-pink-700 leading-relaxed text-lg">
                    <strong className="text-rose-600">アドバイス：</strong> {result.advice}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200 animate-glow">
                <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">今回の診断内容</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {questions.map((question, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                      <span className="text-sm font-semibold text-pink-500 min-w-[2rem]">Q{index + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm text-pink-800 mb-1">{question}</p>
                        <span className={`text-sm font-semibold ${answers[index] ? "text-rose-600" : "text-gray-500"}`}>
                          回答: {answers[index] ? "はい" : "いいえ"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <span className="text-lg font-bold text-rose-600">
                    「はい」の回答数: {answers.filter(Boolean).length} / {questions.length}
                  </span>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-8 rounded-xl border-2 border-pink-300 animate-glow">
                  <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center animate-pulse">
                    さらに詳しく知りたい方へ
                  </h3>
                  <p className="text-pink-700 text-center mb-6 text-lg leading-relaxed">
                    お相手の気持ちや統合時期、お二人のサイレント期間について詳しく知る
                  </p>
                  <div
                    onClick={() => window.open("https://lin.ee/QD2zjWD", "_blank")}
                    className="w-full shadow-xl py-6 text-xl transform hover:scale-105 transition-all duration-300 font-semibold rounded-lg cursor-pointer flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
                      color: "#ffffff",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(21, 128, 61, 0.3)",
                    }}
                  >
                    <ExternalLink className="mr-3 h-6 w-6" />
                    公式LINEで詳細診断を受ける
                  </div>
                </div>

                <div
                  onClick={handleRestart}
                  className="w-full py-6 text-xl transform hover:scale-105 transition-all duration-300 font-semibold rounded-lg cursor-pointer flex items-center justify-center"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#be185d",
                    border: "3px solid #be185d",
                    boxShadow: "0 8px 20px rgba(190, 24, 93, 0.2)",
                  }}
                >
                  <Heart className="mr-3 h-5 w-5" />
                  もう一度診断する
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
