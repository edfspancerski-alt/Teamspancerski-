'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

export default function BodyAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = async () => {
    setAnalyzing(true);
    // Mocking API call for demo
    setTimeout(() => {
      setResult({
        bodyFat: 15.5,
        symmetryScore: 88,
        weakMuscles: ['Glúteos', 'Deltoide Posterior'],
        recommendations: [
          'Adicionar 2 séries de Elevação Pélvica (Hip Thrust)',
          'Adicionar Face Pull para deltoides',
          'Aumentar ingestão proteica em 10g/dia'
        ]
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Análise Corporal de Elite (IA)</h1>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle>Enviar Fotos para Análise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground">Frente</div>
              <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground">Lado</div>
              <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground">Costas</div>
            </div>
            <p className="text-xs text-muted-foreground">Nossa IA analisará gordura corporal, simetria e grupos musculares fracos.</p>
            <Button className="w-full" onClick={startAnalysis} disabled={analyzing}>
              {analyzing ? 'Analisando Proporções...' : 'Iniciar Análise de IA'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-primary/5">
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Gordura Corporal Estimada</p>
                <h3 className="text-4xl font-bold text-primary">{result.bodyFat}%</h3>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Score de Simetria</p>
                <h3 className="text-4xl font-bold text-primary">{result.symmetryScore}/100</h3>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pontos de Atenção</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {result.weakMuscles.map((m: string) => (
                  <span key={m} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">{m}</span>
                ))}
              </div>
              <h4 className="font-semibold mb-3">Recomendações do Coach de IA:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((r: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm italic">
                    <span className="text-primary font-bold">→</span> {r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
